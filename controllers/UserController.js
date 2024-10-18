const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { tb_auth } = require('../models/index');  // Asegúrate de que tb_auth sea el modelo correcto
const { jwt_secret } = require('../config/config.json')['development'];
const cookies = require('cookies');

const UserController = {
  // Obtener todos los usuarios
  getAll(req, res) {
    tb_auth.findAll()
      .then((users) => res.send(users))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: 'Ha habido un problema al cargar los usuarios',
        });
      });
  },

  // Registro de usuario
  async register(req, res) {
    try {
      const { dni, password } = req.body;

      // Verificar si el DNI ya existe en la base de datos
      const existingUser = await tb_auth.findOne({ where: { dni } });
      if (existingUser) {
        return res.status(400).send({ message: 'El DNI ya está registrado' });
      }

      // Generar un salt y encriptar la contraseña
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Crear el usuario en la base de datos con la contraseña encriptada
      const newUser = await tb_auth.create({
        dni,
        contrasenia_encriptada: hashedPassword,
        // Otros campos que necesites agregar, como rol o token
      });

      res.status(201).send({
        message: 'Usuario registrado con éxito',
        user: newUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: 'Error al registrar el usuario',
      });
    }
  },

  // Login de usuario mediante DNI
  async login(req, res) {
    try {
      const { dni, password } = req.body;

      // Buscar el usuario por su DNI
      const user = await tb_auth.findOne({ where: { dni } });
      if (!user) {
        return res.status(400).send({ message: 'DNI o contraseña incorrectos' });
      }

      // Comparar la contraseña ingresada con la almacenada
      const isMatch = bcrypt.compareSync(password, user.contrasenia_encriptada);
      if (!isMatch) {
        return res.status(400).send({ message: 'DNI o contraseña incorrectos' });
      }

      // Generar un token JWT
      const token = jwt.sign({ id: user.id_usu }, jwt_secret);

      res
        .status(200)
        .cookies('data', user, {
          secure: true,
          httpOnly: true,
          path: '/acceso',
        })
        .send({ message: 'Bienvenid@', user, token });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: 'Error al iniciar sesión',
      });
    }
  },
};

module.exports = UserController;
