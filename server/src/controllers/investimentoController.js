const Investimento = require('../models/investimento');
const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

controllers.list = async (req, res) => {
    try {
        const data = await Investimento.findAll();
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
    const { investimentoId } = req.params;
    try {
        const data = await Investimento.findOne({
          where: { investimentoId: investimentoId },
        });
    
        if (data) {
          res.status(200).json({
            success: true,
            data: data,
          });
        } else {
          res.status(404).json({
            success: false,
            message: 'O investimento com o ID ' + investimentoId + ' não foi encontrado!',
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
    const {montante, descricao, userId} = req.body;

    try{
      const newInvestimento = await Investimento.create({
        montante,
        descricao,
        userId,
        dataRegisto: new Date(),
        estadoId: 2
      })

      res.status(200).json({
        success: true,
        message: 'Investimento registado com sucesso!',
        data: newInvestimento
      });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({ success: false, message: "Erro ao efetuar a criação do investimento!"});
  }
};

controllers.update = async (req, res) => {
    const {investimentoId} = req.params;
    const {
      montante,
      descricao,
      estadoId: estado
    } = req.body;    
    try{    
        const data = await Investimento.update(
        {
            montante,
            descricao,
            dataAtualizacao: new Date(),
            estadoId: estado,
        },
        {where: {investimentoId: investimentoId}}
        )

        if (data[0] === 0) {
          return res.status(404).json({
            success: false,
            message: "Investimento não encontrado!"
          });
        }
    
        res.status(200).json({
          success: true,
          data: data,
          message: "Investimento atualizado com sucesso!"
        });
      } catch (err) {
        console.error('Error:', err);
    
        res.status(500).json({
          success: false,
          error: err.message,
          message: "Erro ao efetuar a atualização do investimento!"
        });
      }

};

controllers.delete = async (req, res) => {
    const { investimentoIds } = req.body;
    try {
      const del = await Investimento.destroy({ where: { investimentoId: investimentoIds } });
  
      if (del > 0) {
        res.status(200).json({
          success: true,
          deleted: del,
          message: "Investimento removido!",
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Nenhum investimento encontrado com os IDs fornecidos!',
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao eliminar os investimentos!',
      });
    }
};

module.exports = controllers;