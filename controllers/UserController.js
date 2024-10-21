const { User, Token } = require('../models');
const { COOKIE_OPTIONS } = require('../utils/constants.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];

const UserController = {

  //traer todos los usuarios
  getAll(req, res) {
    User.findAll()
      .then((user) => res.send(user))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: 'Ha habido un problema al cargar los Users',
        });
      });
  },

  //USER INFO (TRAER INFO SOLO DEL USUARIO LOGUEADO)
  async getOneUser(req, res) {
    try {
      // Usamos los datos del token decodificado para identificar al usuario
      const userId = req.user.id;
  
      // Aquí puedes obtener datos del usuario desde la base de datos
      const user = await User.findByPk(userId)
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).send(user)
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los datos del usuario' });
    }
  },

  //login de usuario
  async login(req, res) {
    try {
      // Verificar si el DNI y la contraseña están presentes en la solicitud
      const { dni, contraseña } = req.body;
      if (!dni || !contraseña) return res.status(400).send({ message: 'DNI y contraseña son requeridos' });

      // Buscar el usuario en la base de datos por DNI
      const userToken  = await Token.findOne({ 
        where: { dni },
        attributes: { exclude: ['token'] },
        include: [{model: User, attributes: ['nombre', 'apellidos', 'edad', 'sexo', 'grupo', 'sueldo', 'vivienda', 'coche', 'hijos']}]
      });

      // Si no se encuentra el usuario, devolver un mensaje de error
      if (!userToken) return res.status(400).send({ message: 'Este usuario no existe' });

      // Verificar si la contraseña coincide con la almacenada en la base de datos
      const isMatch = bcrypt.compare(contraseña,  userToken.contraseña_encriptada);
      if (!isMatch) return res.status(400).send({ message: 'Usuario o contraseña incorrectos' });

      // Generar un token JWT
      const token = jwt.sign({
          dni: userToken.dni,
          name: userToken.id_usu.nombre
        }, 
         jwt_secret, 
         { expiresIn: '12h' });
      await Token.update({ token: token }, { where: { dni: dni } });

      // Enviar la respuesta al cliente con el token y la información del usuario
      res
        .status(200)
        .cookie('token', token, COOKIE_OPTIONS)
        .send({ message: 'Bienvenid@ ' + userToken.User.nombre });
    } catch (error) {
      // Manejo de errores
      console.error(error);
      res.status(500).send({ message: 'Error en el servidor' });
    }
  },

  //logout de usuario
  async logout(req, res) {
    try {
      await Token.destroy({
        where: {
          [Op.and]: [
            { id_usu: req.user.id_usu },
            { token: req.headers.authorization },
          ],
        },
      });
      res.send({ message: 'Desconectado con éxito' });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: 'hubo un problema al tratar de desconectarte' });
    }
  },
};

module.exports = UserController;
