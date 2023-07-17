const DataType = require('sequelize');
const sequelize = require('./database');

var AreaNegocio = sequelize.define('areas-negocio', {
    areaNegocioId: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    areaNegocioNome: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
},
{timestamps: false});

AreaNegocio.sync();

module.exports = AreaNegocio;