const DataType = require('sequelize');
const sequelize = require('./database');

const Estado = require('./estado')
const User = require('./user')

var Investimento = sequelize.define('investimentos', {
  investimentoId: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  montante: {
    type: DataType.DECIMAL,
    allowNull: false,
  },
  descricao: {
    type: DataType.STRING,
  },
  dataRegisto: {
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW
  },
  dataAtualizacao: {
    type: DataType.DATE,
  },
  dataInvestimento: {
    type: DataType.DATE,
  },
  estadoId:{
    type: DataType.INTEGER,
    references: {
        model: Estado,
        key: 'estadoId'
    }
  },
  userId:{
    type: DataType.INTEGER,
    references: {
        model: User,
        key: 'userId'
    }
  }
},
{timestamps: false});

Investimento.sync()

Investimento.belongsTo(Estado, {foreignKey:'estadoId'});
Investimento.belongsTo(User, {foreignKey:'userId'});

module.exports = Investimento;