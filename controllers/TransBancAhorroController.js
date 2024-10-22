const { User, TransBanc, TransBancAhorro } = require('../models/index');

const TransBancAhorroController = {
  //traer todos los usuarios
  getAll(req, res) {
    TransBancAhorro.findAll()
      .then((user) => res.send(user))
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: 'Ha habido un problema al cargar los Users',
        });
      });
  },

  //ahorros mensuales del usuario
  getById(req, res) {
    User.findByPk(req.params.id_usu, {
      include: [
        {
          model: TransBancAhorro,
        },
      ],
    })
      .then((trans) => {
        if (!trans) {
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

module.exports = TransBancAhorroController;
