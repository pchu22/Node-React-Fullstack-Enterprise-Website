const AreaNegocio = require('../models/area-negocio');
const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

controllers.list = async (req, res) => {
  try {
    const data = await AreaNegocio.findAll();
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
  const {areaNegocioId} = req.params;
  try {
    const data = await AreaNegocio.findOne({where: { areaNegocioId: areaNegocioId }});

    if (data) {
      res.status(200).json({
        success: true,
        data: data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `A area de negócio com o ID ${areaNegocioId} não foi encontrada!`,
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
  const {areaNegocioNome} = req.body;
  try {
    const newArea = await AreaNegocio.create({areaNegocioNome})
    res.status(200).json({
      success: true,
      message: "Área de negócio adicionada com sucesso!",
      data: newArea
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({
      success: false,
      message: "Erro ao efetuar a criação da área de negócio!"
    });
  }
};

controllers.update = async (req, res) => {
  const { areaNegocioId } = req.params;
  const {areaNegocioNome} = req.body;
  try {
    const data = await AreaNegocio.update(
      {areaNegocioNome},
      {where:{areaNegocioId:areaNegocioId}}
    )
    res.status(200).json({
      success: true,
      data: data,
      message: "Área de negócio atualizada com sucesso!"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
      message: "Erro ao efetuar a atualização da área de negócio!"
    });
  }

};

controllers.delete = async (req, res) => {
  const { areaNegocioIds } = req.body;

  try {
      const del = await AreaNegocio.destroy({where:{areaNegocioId:areaNegocioIds}});

      if (del > 0) {
          res.status(200).json({
              success: true,
              deleted: del,
              message: 'Áreas de negócio removidos!',
          });
      } else {
      res.status(404).json({
          success: false,
          message: 'Nenhuma área de negócio encontrada com os IDs fornecidos!',
          });
      }
      } catch (err) {
      res.status(500).json({
          success: false,
          message: 'Erro ao eliminar as áreas de negócio!',
      });
  }
};

module.exports = controllers;