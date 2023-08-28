const DataType = require('sequelize');
const sequelize = require('./database');

var EventoUser = sequelize.define('eventoUser', {

    eventoId: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
    },

},
    { timestamps: false });

module.exports = EventoUser;