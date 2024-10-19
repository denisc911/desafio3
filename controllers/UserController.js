const { User, Token } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');
const { jwt_secret } = require('../config/config.json')['development'];
const cookie = require('cookies');

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
  async getAll(req, res) {
    try {
      const userId = req.user.id_usu; // Obtener el ID del usuario autenticado

      // Encontrar el usuario
      const user = await User.findByPk(userId)

      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }

      res.status(200).send(user);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      res
        .status(500)
        .send({ message: "Error al obtener los datos del usuario" });
    }
  },

  //login de usuario
  async login(req, res) {
    try {
      // Verificar si el DNI y la contraseña están presentes en la solicitud
      const { dni, contraseña } = req.body;
      if (!dni || !contraseña) {
        return res
          .status(400)
          .send({ message: 'DNI y contraseña son requeridos' });
      }
      // Buscar el usuario en la base de datos por DNI
      const user = await Token.findOne({
        where: {
          dni,
        },
      });

      // Si no se encuentra el usuario, devolver un mensaje de error
      if (!user) {
        return res.status(400).send({ message: 'Este usuario no existe' });
      }

      // Verificar si la contraseña coincide con la almacenada en la base de datos
      const isMatch = bcrypt.compareSync(
        contraseña,
        user.contraseña_encriptada
      );
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: 'Usuario o contraseña incorrectos', user });
      }

      // Generar un token JWT
      const token = jwt.sign({ id: user.id_usu }, jwt_secret, {
        expiresIn: '1h',
      });

      // Actualizar el token en la base de datos para el usuario autenticado
      await Token.update({ token: token }, { where: { dni: req.body.dni } });

      // Enviar la respuesta al cliente con el token y la información del usuario
      res
        .status(200)
        .cookie('data', {...user}, {
          secure: true,
          httpOnly: true,
          path: '/acceso',
        })
        .send({ message: 'Bienvenid@ ' + user.dni, user, token });
    } catch (error) {
      // Manejo de errores
      console.error(error);
      res.status(500).send({ message: 'Error en el servidor' });
    }
  },

  async access (req, res) {
    try {
      const access = req.cookie.user
    } catch (error) {
      res.status(500).send({ message: 'ERROR controler access' })
      console.error(error)
    }
  }
};

module.exports = UserController;
