const DataType = require('sequelize');
const sequelize = require('./database');

var TipoProjeto = sequelize.define('tipos-projeto', {
    tipoProjetoId: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipoProjetoNome: {
        type: DataType.STRING,
        allowNull: false
    },
},
{timestamps: false});

TipoProjeto.sync();

module.exports = TipoProjeto;