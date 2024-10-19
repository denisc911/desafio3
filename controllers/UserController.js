const { User } = require('../models/index');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { where } = require('sequelize');
// const { jwt_secret } = require('../config/config.json')['development'];
const cookies = require('cookies');

const UserController = {

  //GetById

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

  //login de usuario
  login(req, res) {
    User.findOne({
      where: { email: req.body.email },
    }).then((user) => {
      if (!user) {
        return res
          .status(400)
          .send({ message: 'Usuario o contraseña incorrectos' });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: 'Usuario o contraseña incorrectos' });
      }
      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ token, UserId: user.id });
      res
        .status(200)
        .cookies('data', User, {
          secure: true,
          httpOnly: true,
          path: '/acceso',
        })
        .send({ message: 'Bienvenid@ ' + user.name, user, token });
    });
  },
};

module.exports = UserController;
