const DataType = require('sequelize');
const sequelize = require('./database');

var Estado = sequelize.define('estados', {
    estadoId: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estadoNome: {
        type: DataType.STRING,
        allowNull: false
    },
},
{timestamps: false});

Estado.sync();

module.exports = Estado;