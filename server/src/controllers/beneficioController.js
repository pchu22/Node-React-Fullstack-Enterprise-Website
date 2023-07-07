const Beneficio = require('../models/beneficio');
const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

controllers.list = async (req, res) => {
  try {
    const data = await Beneficio.findAll();
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
  const { beneficioId } = req.params;
  try {
    const data = await Beneficio.findOne({
      where: { beneficioId: beneficioId },
    });

    if (data) {
      res.status(200).json({
        success: true,
        data: data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `O benefício com o ID ${beneficioId} não foi encontrado!`,
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
  const { titulo, descricao, tipo } = req.body;
  try {
    const newBeneficio = await Beneficio.create({
      titulo: titulo,
      descricao: descricao,
      tipo: tipo,
      dataRegisto: new Date()
    })
    res.status(200).json({
      success: true,
      message: "Benefício adicionado com sucesso!",
      data: newBeneficio
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({
      success: false,
      message: "Erro ao efetuar a criação do benefício!"
    });
  }
};

controllers.update = async (req, res) => {
  const { beneficioId } = req.params;
  const { titulo, descricao, tipo } = req.body;
  try {
    const data = await Beneficio.update(
      {
        titulo: titulo,
        descricao: descricao,
        tipo: tipo,
        dataAtualizacao: new Date()
      },
      { where: { beneficioId: beneficioId } }
    )
    res.status(200).json({
      success: true,
      data: data,
      message: "Benefício atualizado com sucesso!"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
      message: "Erro ao efetuar a atualização do benefício!"
    });
  }

};

controllers.delete = async (req, res) => {
  const { beneficioIds } = req.body;

  try {
      const del = await Beneficio.destroy({where:{beneficioId:beneficioIds}});

      if (del > 0) {
          res.status(200).json({
              success: true,
              deleted: del,
              message: 'Benefícios removidos!',
          });
      } else {
      res.status(404).json({
          success: false,
          message: 'Nenhum benefício encontrado com os IDs fornecidos!',
          });
      }
      } catch (err) {
      res.status(500).json({
          success: false,
          message: 'Erro ao eliminar os benefícios!',
      });
  }
};

module.exports = controllers;