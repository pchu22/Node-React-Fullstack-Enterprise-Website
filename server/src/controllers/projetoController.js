const Projeto = require('../models/projeto');
const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

controllers.list = async (req, res) => {
  try {
    const data = await Projeto.findAll();
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
  const { projetoId } = req.params;
  try {
      const data = await Projeto.findOne({where: { projetoId: projetoId }});
  
      if (data) {
        res.status(200).json({
          success: true,
          data: data,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'O projeto com o ID ' + projetoId + ' não foi encontrado!',
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
  const {projetoNome, descricao, orcamento, prioridade, userId, tipoProjetoId} = req.body;

  try {
    const newProjeto = await Projeto.create({
        projetoNome, 
        descricao, 
        orcamento,
        prioridade,
        userId, 
        tipoProjetoId,
        dataCriacao: new Date()});

    res.status(200).json({
      success: true,
      message: 'Projeto criado com sucesso!',
      data: newProjeto
    });

  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ success: false, message: "Erro ao efetuar a craição do projeto!"});
  }
};

controllers.update = async (req, res) => {
  const { projetoId } = req.params;
  const {        
    projetoNome, 
    descricao, 
    orcamento,
    prioridade,
    dataInicio,
    dataFim,
    userId: user,
    tipoProjetoId: TipoProjeto   
} = req.body;

  try {
    const existingDepartamento = await Projeto.findOne({where: {projetoId}});
    if (!existingDepartamento) {
      return res.status(404).json({
        success: false,
        message: "Departamento não encontrado!"
      });
    }

    const data = await Projeto.update({
        projetoNome, 
        descricao,
        orcamento,
        prioridade,
        dataInicio, 
        dataFim,
        userId: user,
        tipoProjetoId: TipoProjeto, 
        dataAtualizacao: new Date()
    }, 
    {where:{projetoId}});

    if (data[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "Projeto não encontrado!"
      });
    }

    res.status(200).json({
      success: true,
      data: data,
      message: "Projeto atualizado com sucesso!"
    });
  } catch (err) {
    console.error('Error:', err);

    res.status(500).json({
      success: false,
      error: err.message,
      message: "Erro ao efetuar a atualização do projeto!"
    });
  }
};

controllers.delete = async (req, res) => {
  const {projetoIds} = req.body;

  try {
    const del = await Projeto.destroy({where:{projetoId: projetoIds}});

    if (del > 0) {
      res.status(200).json({
        success: true,
        deleted: del,
        message: 'Projetos removidos!',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Nenhum projeto encontrado com os IDs fornecidos!',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erro ao eliminar os projetos!',
    });
  }
};

module.exports = controllers