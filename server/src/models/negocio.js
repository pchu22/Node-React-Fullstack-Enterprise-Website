const DataType = require('sequelize');
const sequelize = require('./database');

const User = require('./user');
const AreaNegocio = require('./area-negocio');
const Estado = require('./estado');

var Negocio = sequelize.define('negocios', {
  negocioId: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataType.STRING,
    allowNull: false,
  },
  telemovel: {
    type: DataType.STRING,
  },
  orcamento: {
    type: DataType.DECIMAL,
    allowNull: false
  },
  descricao: {
    type: DataType.STRING,
    allowNull: false
  },
  dataRegisto: {
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW
  },
  dataAtualizacao: {
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
  areaNegocioId: {
    type: DataType.INTEGER,
    references: {
      model: AreaNegocio,
      key: "areaNegocioId",
    },
  },
},
  { timestamps: false });

Negocio.belongsTo(User, { foreignKey: 'userId' });
Negocio.belongsTo(AreaNegocio, { foreignKey: 'areaNegocioId' });
Negocio.belongsTo(Estado, { foreignKey: 'estadoId' });

module.exports = Negocio;