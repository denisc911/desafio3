'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TransBancAhorro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      // Relating TransBancAhorro to User
      TransBancAhorro.belongsTo(models.User, { foreignKey: 'id_usu' });
      // Relating TransBancAhorro to Cuenta
      TransBancAhorro.belongsTo(models.Cuenta, { foreignKey: 'iban', targetKey: 'iban' });
      // Relating TransBancAhorro to CuentaHucha
      TransBancAhorro.belongsTo(models.CuentaHucha, { foreignKey: 'iban', targetKey: 'iban' });
    }
  }

  TransBancAhorro.init(
    {
      id_tran_banc_ahor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      id_usu: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      iban: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'TransBancAhorro',
      tableName: 'tb_trans_banc_ahor', // Table name in the database
      timestamps: false, // Disable createdAt and updatedAt
    }
  );

  return TransBancAhorro;
};
