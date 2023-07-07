const DataType = require('sequelize');
const sequelize = require('./database');

var Beneficio = sequelize.define('beneficios', {
  beneficioId: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataType.STRING,
    allowNull: false
  },
  descricao: {
    type: DataType.STRING,
    allowNull: false
  },
  dataRegisto: {
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW
  },
  dataAtualizacao: {
    type: DataType.DATE
  },
  tipo: {
    type: DataType.STRING,
    allowNull: false
  }
},
  { timestamps: false });

module.exports = Beneficio;