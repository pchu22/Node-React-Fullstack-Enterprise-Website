const DataType = require('sequelize');
const sequelize = require('./database');

var Evento = sequelize.define('eventos', {
    eventoId: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataType.STRING,
        allowNull: false
    },
    dataInicio: {
        type: DataType.DATE,
        allowNull: false
    },
    dataFim: {
        type: DataType.DATE,
        allowNull: false
    },
},
{timestamps: false});

Evento.sync();

module.exports = Evento;