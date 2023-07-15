const User = require('../models/user');
const Cargo = require('../models/cargo');
const bcrypt = require('bcrypt');

const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

controllers.list = async (req, res) => {
    try {
        const data = await User.findAll();
        res.json({
          success: true,
          data: data,
        });
    } catch (err) {
        res.status(500).json({
          success: false,
          error: 'Erro: ' + err.message,
        });
    }
};

controllers.get = async (req, res) => {
    const { userId } = req.params;
    try {
        const data = await User.findOne({
          where: { userId: userId },
          include: [Cargo],
        });
    
        if (data) {
          res.status(200).json({
            success: true,
            data: data,
          });
        } else {
          res.status(404).json({
            success: false,
            message: 'O utilizador com o ID ' + userId + ' não foi encontrado!',
          });
        }
      } catch (err) {
        console.log("Error: " + err);
        res.status(500).json({
          success: false,
          error: 'Erro: ' + err.message,
        });
    };
};

controllers.create = async (req, res) => {
  const {
    primeiroNome,
    ultimoNome,
    numeroFuncionario,
    cargoId,
    departamentoId,
    filialId,
    email,
    password,
    salario,
    dataContratacao
  } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Já existe uma conta com esse email!' });
    }

    const newUser = await User.create({
      primeiroNome,
      ultimoNome,
      numeroFuncionario,
      cargoId,
      departamentoId,
      filialId,
      email,
      password,
      salario,
      dataRegisto: new Date(),
      dataContratacao,
      isAtivo: true,
      isColaborador: true,
      isPrimeiroLogin: true
    });

    res.status(200).json({
      success: true,
      message: 'Funcionário registado com sucesso!',
      data: newUser
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ success: false, message: "Erro ao efetuar a criação do utilizador!"});
  }
};

controllers.update = async (req, res) => {
  const { userId } = req.params;
  const {
    primeiroNome,
    ultimoNome,
    numeroFuncionario,
    email,
    password,
    telemovel,
    morada,
    salario,
    cargoId: cargo,
    departamentoId: departamento,
    filialId: filial,
    isColaborador,
    isCandidato,
    verificationToken
  } = req.body;

  try {
    const existingUser = await User.findOne({ where: { userId } });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Utilizador não encontrado!"
      });
    }

    let hashedPassword = existingUser.password;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const data = await User.update(
      {
        primeiroNome,
        ultimoNome,
        numeroFuncionario,
        email,
        password: hashedPassword,
        telemovel,
        morada,
        salario,
        isColaborador,
        isCandidato,
        verificationToken,
        cargoId: cargo,
        departamentoId: departamento,
        filialId: filial
      },
      { where: { userId } }
    );

    if (data[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "Utilizador não encontrado!"
      });
    }

    res.status(200).json({
      success: true,
      data: data,
      message: "Utilizador atualizado com sucesso!"
    });
  } catch (err) {
    console.error('Error:', err);

    res.status(500).json({
      success: false,
      error: err.message,
      message: "Erro ao efetuar a atualização do utilizador!"
    });
  }
};

controllers.delete = async (req, res) => {
  const { userIds } = req.body;

  try {
    const del = await User.destroy({ where: { userId: userIds } });

    if (del > 0) {
      res.status(200).json({
        success: true,
        deleted: del,
        message: 'Utilizadores removidos!',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Nenhum utilizador encontrado com os IDs fornecidos!',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erro ao eliminar os utilizadores!',
    });
  }
};

controllers.deactivate = async (req, res) => {
    const {userId} = req.params;
    const data = await User.update(
        {isAtivo: false},
        {where:{userId:userId}}
    )
    .then((data) => {
        if (data) {
            res.json({
              success: true,
              message: 'O utilizador com o ID ' + userId + ' foi inativado com sucesso!',
              data: data,
            });
          } else {
            res.json({
                message: 'Não foi possível inativar o ultilizador com o ID ' + userId + ' !',
            });
          }
    }) .catch((err) =>{
        res.status(500).send({
            message: 'Erro ao inativar o utilizador com o ID ' + userId + ' !',
        });
    })
};

controllers.activate = async (req, res) => {
    const {userId} = req.params;
    const data = await User.update(
        {isAtivo: true},
        {where:{userId:userId}}
    )
    .then((data) => {
        if (data) {
            res.json({
              success: true,
              message: 'O utilizador com o ID ' + userId + ' foi ativado com sucesso!',
              data: data,
            });
          } else {
            res.json({
                message: 'Não foi possível ativar o ultilizador com o ID ' + userId + ' !',
            });
          }
    }) .catch((err) =>{
        res.status(500).send({
            message: 'Erro ao ativar o utilizador com o ID ' + userId + ' !',
        });
    })
};

module.exports = controllers;