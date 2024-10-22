'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cuenta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      // Relating Cuenta to User
      Cuenta.belongsTo(models.User, { foreignKey: 'id_usu' });
    }
  }

  Cuenta.init(
    {
      tipo_cta: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      id_usu: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      saldo_cta: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      iban: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      estatus_cta: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Cuenta',
      tableName: 'tb_cta', // Table name in the database
      timestamps: false, // Disable createdAt and updatedAt
    }
  );

  return Cuenta;
};