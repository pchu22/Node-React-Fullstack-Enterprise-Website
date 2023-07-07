const Departamento = require('../models/departamento');
const User = require('../models/user')
const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

controllers.list = async (req, res) => {
  try {
    const data = await Departamento.findAll();
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
  const { departamentoId } = req.params;
  try {
      const data = await Departamento.findOne({where: { departamentoId: departamentoId }});
  
      if (data) {
        res.status(200).json({
          success: true,
          data: data,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'O departamento com o ID ' + departamentoId + ' não foi encontrado!',
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
  const {departamentoNome, descricao} = req.body;

  try {
    const newDepartamento = await Departamento.create({departamentoNome, descricao, dataCriacao: new Date()});

    res.status(200).json({
      success: true,
      message: 'Departamento criado com sucesso!',
      data: newDepartamento
    });

  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ success: false, message: "Erro ao efetuar a craição do departamento!"});
  }
};

controllers.update = async (req, res) => {
  const { departamentoId } = req.params;
  const {departamentoNome, descricao} = req.body;

  try {
    const existingDepartamento = await Departamento.findOne({where: {departamentoId}});
    if (!existingDepartamento) {
      return res.status(404).json({
        success: false,
        message: "Departamento não encontrado!"
      });
    }

    const data = await Departamento.update({
      departamentoNome:departamentoNome,
      descricao:descricao,
      dataAtualizacao: new Date()
    }, 
    {where:{departamentoId}});

    if (data[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "Departamento não encontrado!"
      });
    }

    res.status(200).json({
      success: true,
      data: data,
      message: "Departamento atualizado com sucesso!"
    });
  } catch (err) {
    console.error('Error:', err);

    res.status(500).json({
      success: false,
      error: err.message,
      message: "Erro ao efetuar a atualização do departamento!"
    });
  }
};

controllers.delete = async (req, res) => {
  const {departamentoIds} = req.body;

  try {
    await User.update({ departamentoId: null }, { where: { departamentoId: departamentoIds } });
    const del = await Departamento.destroy({where:{departamentoId: departamentoIds}});

    if (del > 0) {
      res.status(200).json({
        success: true,
        deleted: del,
        message: 'Departamentos removidos!',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Nenhum departamento encontrado com os IDs fornecidos!',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erro ao eliminar os departamentos!',
    });
  }
};

module.exports = controllers