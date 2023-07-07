const DataType = require('sequelize');
const sequelize = require('./database');
const bcrypt = require('bcrypt');

const Cargo = require('./cargo');
const Departamento = require('./departamento');
const Filial = require('./filial');

var User = sequelize.define('users', {
    userId: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    primeiroNome: {
        type: DataType.STRING,
    },
    ultimoNome: {
        type: DataType.STRING,
    },
    numeroFuncionario: {
        type: DataType.INTEGER,
        unique: true
    },
    email: {
        type: DataType.STRING,
        unique: true
    },
    password: {
        type: DataType.STRING,
    },
    telemovel: {
        type: DataType.STRING,
    },
    morada: {
        type: DataType.STRING,
    },
    salario: {
        type: DataType.INTEGER
    },
    dataRegisto:{
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    },
    ultimoLogin:{
        type: DataType.DATE,
    },
    dataContratacao: {
        type: DataType.DATE
    },
    isPrimeiroLogin: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isAtivo: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isColaborador: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isCandidato: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    verificationToken: {
        type: DataType.STRING,
        allowNull: true,
    },
    recoverToken: {
        type: DataType.STRING,
        allowNull: true,
    },
    cargoId: {
        type: DataType.INTEGER,
        references: {
          model: Cargo,
          key: "cargoId",
        },
      },
      departamentoId: {
        type: DataType.INTEGER,
        references: {
          model: Departamento,
          key: "departamentoId",
        },
      },
      filialId: {
        type: DataType.INTEGER,
        references: {
          model: Filial,
          key: "filialId",
        },
      }, 
}, 
{timestamps: false});

User.beforeCreate((user, options) => {
    if (user.password) {
      return bcrypt
        .hash(user.password, 10)
        .then((hash) => {
          user.password = hash;
        })
        .catch((err) => {
          throw new Error('Error hashing password');
        });
    }
  });



User.belongsTo(Cargo, {foreignKey:'cargoId'});
User.belongsTo(Departamento, {foreignKey:'departamentoId'});
User.belongsTo(Filial, {foreignKey:'filialId'});

module.exports = User;