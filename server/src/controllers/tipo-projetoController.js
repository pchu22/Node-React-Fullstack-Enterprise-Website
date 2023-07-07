const TipoProjeto = require('../models/tipo-projeto');
const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

controllers.list = async (req, res) => {
  try {
    const data = await TipoProjeto.findAll();
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
  const {tipoProjetoId} = req.params;
  try {
    const data = await TipoProjeto.findOne({where: { tipoProjetoId: tipoProjetoId }});

    if (data) {
      res.status(200).json({
        success: true,
        data: data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `O tipo de projeto com o ID ${tipoProjetoId} não foi encontrada!`,
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
  const {tipoProjetoNome} = req.body;
  try {
    const newTipo = await TipoProjeto.create({tipoProjetoNome})
    res.status(200).json({
      success: true,
      message: "Tipo de projeto adicionado com sucesso!",
      data: newTipo
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({
      success: false,
      message: "Erro ao efetuar a criação do tipo de projeto!"
    });
  }
};

controllers.update = async (req, res) => {
  const { tipoProjetoId } = req.params;
  const {tipoProjetoNome} = req.body;
  try {
    const data = await TipoProjeto.update(
      {tipoProjetoNome},
      {where:{tipoProjetoId:tipoProjetoId}}
    )
    res.status(200).json({
      success: true,
      data: data,
      message: "Tipo de projeto atualizado com sucesso!"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
      message: "Erro ao efetuar a atualização do tipo de projeto!"
    });
  }

};

controllers.delete = async (req, res) => {
  const { tipoProjetoIds } = req.body;

  try {
      const del = await TipoProjeto.destroy({where:{tipoProjetoId:tipoProjetoIds}});

      if (del > 0) {
          res.status(200).json({
              success: true,
              deleted: del,
              message: 'Tipo de projeto removidos!',
          });
      } else {
      res.status(404).json({
          success: false,
          message: 'Nenhuma tipo de projeto encontrada com os IDs fornecidos!',
          });
      }
      } catch (err) {
      res.status(500).json({
          success: false,
          message: 'Erro ao eliminar os tipos de projeto!',
      });
  }
};

module.exports = controllers;