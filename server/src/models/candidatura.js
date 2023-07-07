const DataType = require('sequelize');
const sequelize = require('./database');

const User = require('./user');
const Vaga = require('./vaga');

var Candidatura = sequelize.define('candidaturas', {
    candidaturaId: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dataCriacao:{
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    },
    dataAtualizacao: {
        type: DataType.DATE,
    },
    cv: {
        type: DataType.BLOB('long'),
        allowNull: true,
    },
    isAtiva: {
        type: DataType.BOOLEAN,
        allowNull: false
    },
    userId: {
        type: DataType.INTEGER,
        references: {
          model: User,
          key: "userId",
        },
    }, 
    vagaId: {
        type: DataType.INTEGER,
        references: {
          model: Vaga,
          key: "vagaId",
        },
    }, 
},
{timestamps: false});

Candidatura.sync();

Candidatura.belongsTo(User, {foreignKey:'userId'});
Candidatura.belongsTo(Vaga, {foreignKey:'vagaId'});

module.exports = Candidatura;