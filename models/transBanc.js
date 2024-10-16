'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TransBanc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      // Definir la relación con el modelo Usuario
      TransBanc.hasMany(models.User, {
        foreignKey: 'iban',
        as: 'usuarios',
      });
    }
  }

  TransBanc.init(
    {
      iban: {
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      tipo: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      detalle: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      importe: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fecha: {
        type: DataTypes.DATEONLY, // DATE en MySQL
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'TransBanc', // Nombre del modelo en Sequelize
      tableName: 'tb_trans_banc', // Nombre de la tabla en la base de datos
      timestamps: false, // Desactivar createdAt y updatedAt
    }
  );

  return TransBanc;
};
