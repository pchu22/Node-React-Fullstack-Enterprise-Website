const DataType = require('sequelize');
const sequelize = require('./database');

var Cargo = sequelize.define('cargos', {
    cargoId: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cargoNome: {
        type: DataType.STRING,
        allowNull: false
    },
},
{timestamps: false});

Cargo.sync();

module.exports = Cargo;