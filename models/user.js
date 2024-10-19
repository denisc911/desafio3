'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define relationships here if necessary
      User.hasOne(models.Token, { foreignKey: 'id_usu' });
      User.hasMany(models.TransBanc, { foreignKey: 'id_usu' });
    }
  }

  User.init(
    {
      id_usu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      apellidos: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      edad: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sexo: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      grupo: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      sueldo: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      vivienda: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      coche: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      hijos: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User', // Model name
      tableName: 'tb_usu', // Table name in the database
      timestamps: false, // Disable createdAt and updatedAt
    }
  );

  return User;
};
