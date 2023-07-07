const Negocio = require('../models/negocio');
const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

controllers.list = async (req, res) => {
    try {
        const data = await Negocio.findAll();
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
    const { negocioId } = req.params;
    try {
        const data = await Negocio.findOne({
          where: { negocioId: negocioId },
        });
    
        if (data) {
          res.status(200).json({
            success: true,
            data: data,
          });
        } else {
          res.status(404).json({
            success: false,
            message: 'O negócio com o ID ' + negocioId + ' não foi encontrado!',
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
      email, 
      telemovel, 
      orcamento, 
      descricao,
      userId,
      areaNegocioId
    } = req.body;

    try{
      const newNegocio = await Negocio.create({
        email,
        telemovel,
        orcamento,
        descricao,
        dataRegisto: new Date(),
        areaNegocioId,
        estadoId: 2,
        userId
      })

      res.status(200).json({
        success: true,
        message: 'Negócio registado com sucesso!',
        data: newNegocio
      });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ success: false, message: "Erro ao efetuar a criação do negócio!"});
  }
};

controllers.update = async (req, res) => {
    const {negocioId} = req.params;
    const {
      email,
      telemovel,
      orcamento,
      descricao,
      departamentoId: departamento,
      estadoId: estado,
      userId: user
    } = req.body;    
    try{    
        const data = await Negocio.update(
        {
          email,
          telemovel,
          orcamento,
          descricao,
          dataAtualizacao: new Date(),
          departamentoId: departamento,
          estadoId: estado,
          userId: user
        },
        {where: {negocioId: negocioId}}
        )

        if (data[0] === 0) {
          return res.status(404).json({
            success: false,
            message: "Negócio não encontrado!"
          });
        }
    
        res.status(200).json({
          success: true,
          data: data,
          message: "Negócio atualizado com sucesso!"
        });
      } catch (err) {
        console.error('Error:', err);
    
        res.status(500).json({
          success: false,
          error: err.message,
          message: "Erro ao efetuar a atualização do negócio!"
        });
      }

};

controllers.delete = async (req, res) => {
    const { negocioIds } = req.body;
    try {
      const del = await Negocio.destroy({ where: { negocioId: negocioIds } });
  
      if (del > 0) {
        res.status(200).json({
          success: true,
          deleted: del,
          message: "Negócio removido!",
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Nenhum negócio encontrado com os IDs fornecidos!',
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao eliminar os negócios!',
      });
    }
};

module.exports = controllers;