const DataType = require('sequelize');
const sequelize = require('./database');

const User = require('./user');

var Parceria = sequelize.define('parcerias', {
  parceriaId: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomeParceiro: {
    type: DataType.STRING,
    allowNull: false,
  },
  email: {
    type: DataType.STRING,
  },
  telemovel: {
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
  userId: {
    type: DataType.INTEGER,
    references: {
      model: User,
      key: "userId",
    },
  },
},
{timestamps: false});

Parceria.sync()

Parceria.belongsTo(User, { foreignKey: 'userId' });

module.exports = Parceria;