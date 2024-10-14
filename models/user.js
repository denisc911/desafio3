'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      // Definir relaciones aquí
      // Si el User tiene relación con transacciones bancarias
      User.belongsTo(models.TransBanc, {
        foreignKey: 'iban',
        as: 'transacciones',
      });
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
      dinero_banco: {
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
      iban: {
        type: DataTypes.STRING(45),
        allowNull: true,
        references: {
          model: 'tb_trans_banc', // Nombre de la tabla de transacciones bancarias
          key: 'iban',
        },
      },
    },
    {
      sequelize,
      modelName: 'User', // Nombre del modelo
      tableName: 'tb_usu', // Nombre de la tabla en la base de datos
      timestamps: false, // Desactivar createdAt y updatedAt
    }
  );

  return User;
};
