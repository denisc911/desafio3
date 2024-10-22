'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CuentaHucha extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      // Relating CuentaHucha to User
      CuentaHucha.belongsTo(models.User, { foreignKey: 'id_usu' });
      // Relating CuentaHucha to Cuenta
      CuentaHucha.belongsTo(models.Cuenta, { foreignKey: 'iban', targetKey: 'iban' });
    }
  }

  CuentaHucha.init(
    {
      recurrencia: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      id_usu: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha_fin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      saldo_cta_hucha: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      iban: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      cuota_hucha: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      fecha_ini: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      razon_hucha: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'CuentaHucha',
      tableName: 'tb_cta_hucha', // Table name in the database
      timestamps: false, // Disable createdAt and updatedAt
    }
  );

  return CuentaHucha;
};