const Ideia = require('../models/ideia');
const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

controllers.list = async (req, res) => {
  try {
    const data = await Ideia.findAll();
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
  const { ideiaId } = req.params;
  try {
    const data = await Ideia.findOne({where: { ideiaId: ideiaId }});

    if (data) {
      res.status(200).json({
        success: true,
        data: data,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `A ideia com o ID ${ideiaId} não foi encontrado!`,
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
  const { titulo, descricao, tipo, userId } = req.body;
  try {
    const newIdeia = await Ideia.create({
      titulo,
      descricao,
      tipo,
      userId
    })
    res.status(200).json({
      success: true,
      message: "Ideia adicionada com sucesso!",
      data: newIdeia
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({
      success: false,
      message: "Erro ao efetuar a criação da ideia!"
    });
  }
};

controllers.update = async (req, res) => {
  const { ideiaId } = req.params;
  const { titulo, descricao, tipo } = req.body;
  try {
    const data = await Ideia.update(
      {
        titulo: titulo,
        descricao: descricao,
        tipo: tipo,
        dataAtualizacao: new Date()
      },
      { where: { ideiaId: ideiaId } }
    )
    res.status(200).json({
      success: true,
      data: data,
      message: "Ideia atualizada com sucesso!"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
      message: "Erro ao efetuar a atualização da ideia!"
    });
  }

};

controllers.delete = async (req, res) => {
  const { ideiaIds } = req.body;

  try {
      const del = await Ideia.destroy({where:{ideiaId:ideiaIds}});

      if (del > 0) {
          res.status(200).json({
              success: true,
              deleted: del,
              message: 'Ideias removidos!',
          });
      } else {
      res.status(404).json({
          success: false,
          message: 'Nenhuma ideia encontrada com os IDs fornecidos!',
          });
      }
      } catch (err) {
      res.status(500).json({
          success: false,
          message: 'Erro ao eliminar as ideias!',
      });
  }
};

module.exports = controllers;