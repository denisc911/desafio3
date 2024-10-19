'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      Token.belongsTo (models.User, { foreignKey: 'id_usu' });
    }
  }
  Token.init(
    {
      dni: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      id_usu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      contraseña_encriptada: DataTypes.STRING,
      token: DataTypes.STRING,
      rol: { type: DataTypes.ENUM('cliente', 'admin'), allowNull: false },
    },
    {
      sequelize,
      modelName: 'Token',
      tableName: 'tb_auth', // Table name in the database
      timestamps: false, // Desactiva la creación automática de createdAt y updatedAt
    }
  );
  return Token;
};
