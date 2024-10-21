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
      // Definir relaciones aquí si es necesario
      TransBancAhorro.belongsTo(models.User, { foreignKey: 'id_usu' });
    }
  }

  TransBancAhorro.init(
    {
      id_tran_banc: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      importe: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'TransBancAhorro', // Nombre del modelo
      tableName: 'tb_trans_banc_ahor', // Nombre de la tabla en la base de datos
      timestamps: false, // Deshabilitar createdAt y updatedAt
    }
  );

  return TransBancAhorro;
};
