const DataType = require('sequelize');
const sequelize = require('./database');

const User = require('./user');

var Ideia = sequelize.define('ideias', {
    ideiaId: {
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
    dataCriacao: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    },
    dataAtualizacao: {
        type: DataType.DATE,
    },
    userId: {
        type: DataType.INTEGER,
        references: {
            model: User,
            key: "userId",
        },
    },
},
    { timestamps: false });

Ideia.belongsTo(User, { foreignKey: 'userId' });

module.exports = Ideia;