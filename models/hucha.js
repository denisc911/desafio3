// hucha.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Ajusta la ruta según tu configuración
const TransaccionBancaria = require('./transaccionBancaria'); // Asegúrate de tener este modelo definido

class Hucha extends Model {
  // Método para calcular el saldo de la hucha
  async calcularSaldo() {
    const transacciones = await TransaccionBancaria.findAll({
      where: {
        id_usu: this.id_usu,
        iban: this.iban,
        tipo: 'Hucha' // Asumiendo que este es el tipo que identifica transacciones de hucha
      }
    });

    // Calcula el saldo sumando los importes de las transacciones
    const saldo = transacciones.reduce((total, transaccion) => {
      return total + parseFloat(transaccion.importe);
    }, 0);

    return saldo;
  }
}

Hucha.init({
  id_usu: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  iban: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'tb_cuentas', // Reemplaza con el nombre de la tabla de cuentas si es diferente
      key: 'iban'
    }
  },
  fecha_ini: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  razon_hucha: {
    type: DataTypes.STRING,
    allowNull: true
  },
  recurrencia: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cuota_hucha: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  // Eliminamos saldo_cta_hucha del modelo, ya que se calculará dinámicamente
}, {
  sequelize,
  modelName: 'Hucha',
  tableName: 'tb_cta_hucha',
  timestamps: false
});

// Definimos la asociación con TransaccionBancaria
Hucha.hasMany(TransaccionBancaria, {
  foreignKey: 'iban',
  sourceKey: 'iban',
  as: 'transacciones',
  constraints: false,
  scope: {
    id_usu: sequelize.col('Hucha.id_usu')
  }
});

module.exports = Hucha;
