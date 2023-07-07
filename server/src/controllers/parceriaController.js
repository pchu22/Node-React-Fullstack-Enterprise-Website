const Parceria = require('../models/parceria');
const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

controllers.list = async (req, res) => {
    try {
        const data = await Parceria.findAll();
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
    const { parceriaId } = req.params;
    try {
        const data = await Parceria.findOne({
          where: { parceriaId: parceriaId },
        });
    
        if (data) {
          res.status(200).json({
            success: true,
            data: data,
          });
        } else {
          res.status(404).json({
            success: false,
            message: 'A parceria com o ID ' + parceriaId + ' não foi encontrada!',
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
        nomeParceiro,
        email, 
        telemovel,
        userId
    } = req.body;

    try{
      const newParceria = await Parceria.create({
        nomeParceiro,
        email, 
        telemovel,
        userId,
        dataRegisto: new Date()
      })

      res.status(200).json({
        success: true,
        message: 'Parceria registada com sucesso!',
        data: newParceria
      });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ success: false, message: "Erro ao efetuar a criação da parceria!"});
  }
};

controllers.update = async (req, res) => {
    const {parceriaId} = req.params;
    const {
        nomeParceiro,
        email, 
        telemovel
    } = req.body;    
    try{    
        const data = await Parceria.update(
        {
            nomeParceiro,
            email, 
            telemovel,
            dataAtualizacao: new Date()
        },
        {where: {parceriaId: parceriaId}}
        )

        if (data[0] === 0) {
          return res.status(404).json({
            success: false,
            message: "Parceria não encontrada!"
          });
        }
    
        res.status(200).json({
          success: true,
          data: data,
          message: "Parceria atualizada com sucesso!"
        });
      } catch (err) {
        console.error('Error:', err);
    
        res.status(500).json({
          success: false,
          error: err.message,
          message: "Erro ao efetuar a atualização da parceria!"
        });
      }

};

controllers.delete = async (req, res) => {
    const { parceriaIds } = req.body;
    try {
      const del = await Parceria.destroy({ where: { parceriaId: parceriaIds } });
  
      if (del > 0) {
        res.status(200).json({
          success: true,
          deleted: del,
          message: "Parceria removida!",
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Nenhuma parceria encontrada com os IDs fornecidos!',
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao eliminar as parcerias!',
      });
    }
};

module.exports = controllers;