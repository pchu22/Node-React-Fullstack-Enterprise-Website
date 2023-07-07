const DataType = require('sequelize');
const sequelize = require('./database');

const User = require('./user');
const TipoProjeto = require('./tipo-projeto');
const Estado = require('./estado');

var Projeto = sequelize.define('projetos', {
  projetoId: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  projetoNome: {
    type: DataType.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataType.STRING,
    allowNull: false,
  },
  orcamento: {
    type: DataType.DECIMAL,
    allowNull: false
  },
  prioridade: {
    type: DataType.STRING,
    allowNull: false,
  },
  dataRegisto: {
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW
  },
  dataAtualizacao: {
    type: DataType.DATE,
  },
  dataInicio: {
    type: DataType.DATE,
  },
  dataFim: {
    type: DataType.DATE,
  },
  estadoId: {
    type: DataType.INTEGER,
    references: {
      model: Estado,
      key: "estadoId",
    },
  },
  userId: {
    type: DataType.INTEGER,
    references: {
      model: User,
      key: "userId",
    },
  },
  tipoProjetoId: {
    type: DataType.INTEGER,
    references: {
      model: TipoProjeto,
      key: "tipoProjetoId",
    },
  },
},
  { timestamps: false });

  Projeto.belongsTo(User, { foreignKey: 'userId' });
  Projeto.belongsTo(TipoProjeto, { foreignKey: 'tipoProjetoId' });
  Projeto.belongsTo(Estado, { foreignKey: 'estadoId' });

module.exports = Projeto;