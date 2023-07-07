const DataType = require('sequelize');
const sequelize = require('./database');

const User = require('./user');
const Departamento = require('./departamento');
const Filial = require('./filial');

var Vaga = sequelize.define('vagas', {
    vagaId: {
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
    habilitacoesMin: {
        type: DataType.STRING,
    },
    experienciaMin: {
        type: DataType.STRING,
    },
    remuneracao: {
      type: DataType.INTEGER,
    },
    dataRegisto:{
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    },
    dataAtualizacao: {
        type: DataType.DATE,
    },
    isInterna: {
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
    filialId: {
        type: DataType.INTEGER,
        references: {
          model: Filial,
          key: "filialId",
        },
      }, 
    departamentoId: {
        type: DataType.INTEGER,
        references: {
          model: Departamento,
          key: "departamentoId",
        },
      },
},
{timestamps: false});

Vaga.sync();

Vaga.belongsTo(User, {foreignKey:'userId'});
Vaga.belongsTo(Filial, {foreignKey:'filialId'});
Vaga.belongsTo(Departamento, {foreignKey:'departamentoId'});

module.exports = Vaga;