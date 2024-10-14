const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');  // Asegúrate de que esta ruta apunta correctamente a tu configuración de base de datos

const Usuario = sequelize.define('Usuario', {
  id_usu: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  apellidos: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  sexo: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  grupo: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  sueldo: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  dinero_banco: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  vivienda: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  coche: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  hijos: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  iban: {
    type: DataTypes.STRING(45),
    allowNull: true,
    references: {
      model: 'tb_trans_banc',  // Nombre de la tabla de la cual es clave foránea
      key: 'iban'
    }
  }
}, {
  tableName: 'tb_usu',  // Nombre de la tabla
  timestamps: false     // Desactivar marcas de tiempo automáticas (createdAt, updatedAt)
});

module.exports = Usuario;
