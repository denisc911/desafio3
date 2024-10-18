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
      // Define relationships here
      // Relating TransBanc to User
      TransBanc.belongsTo(models.User, { foreignKey: 'id_usu' });
    }
  }

  TransBanc.init(
    {
      id_tran_banc: {
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
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'TransBanc', // Model name
      tableName: 'tb_trans_banc_cte', // Table name in the database
      timestamps: false, // Disable createdAt and updatedAt
    }
  );

  return TransBanc;
};
