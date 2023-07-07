const DataType = require('sequelize');
const sequelize = require('./database');


var Filial = sequelize.define('filiais', {
    filialId: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    filialNome: {
        type: DataType.STRING,
        allowNull: false
    },
    morada: {
        type: DataType.STRING,
        allowNull: false
    },
    telemovel: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
    dataRegisto: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    },
    dataAtualizacao: {
        type: DataType.DATE
    },
},
    { timestamps: false });

module.exports = Filial;