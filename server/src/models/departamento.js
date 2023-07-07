const DataType = require('sequelize');
const sequelize = require('./database');

var Departamento = sequelize.define('departamentos', {
    departamentoId: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    departamentoNome: {
        type: DataType.STRING,
        allowNull: false
    },
    dataCriacao: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    },
    dataAtualizacao: {
        type: DataType.DATE
    },
    descricao: {
        type: DataType.STRING,
    }
},
    { timestamps: false });

module.exports = Departamento;