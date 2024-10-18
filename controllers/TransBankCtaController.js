const { User, TransBanc } = require('../models/index');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { where } = require('sequelize');
// const { jwt_secret } = require('../config/config.json')['development'];

const TransBankCtaController = {
  //buscar movimientos trans por usuario
  getById(req, res) {
    User.findByPk(req.params.id_usu, {
      include: [
        {
          model: TransBanc,
        },
      ],
    })
      .then((trans) => {
        if (!trans) {
          console.log('ID del usuario:', id_usu);

          return res.status(404).send({
            message:
              'No se encontraron transacciones para el usuario especificado.',
          });
        }
        res.status(200).send({
          message: 'se han traido bien las transacciones del user',
          trans,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: 'Ha habido un problema al cargar las transacciones',
        });
      });
  },
};

module.exports = TransBankCtaController;
