const DataType = require('sequelize');
const sequelize = require('./database');

const User = require('./user');
const Estado = require('./estado');

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
    descricao: {
        type: DataType.STRING,
        allowNull: false
    },
    tipo: {
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
    estadoId: {
        type: DataType.INTEGER,
        references: {
            model: Estado,
            key: "estadoId"
        },
    },
    userId: {
        type: DataType.INTEGER,
        references: {
            model: User,
            key: "userId"
        },
    },
    participantes: {
        type: DataType.ARRAY(DataType.INTEGER),
        allowNull: false
    },
    notas: {
        type: DataType.STRING
    }
}, { timestamps: false });

Evento.sync();

Evento.belongsTo(User, { foreignKey: 'userId' });
Evento.belongsTo(Estado, { foreignKey: 'estadoId' });

module.exports = Evento;