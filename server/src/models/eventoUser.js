const DataType = require('sequelize');
const sequelize = require('./database');
const Evento = require('./evento'); 
const User = require('./user'); 

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

EventoUser.belongsTo(Evento, { foreignKey: 'eventoId', onDelete: 'CASCADE' });
EventoUser.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = EventoUser;