const Vaga = require('../models/vaga')
const Candidatura = require('../models/candidatura');
const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

controllers.list = async (req, res) => {
    try {
        const data = await Vaga.findAll();
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
  const { vagaId } = req.params;
  try {
    const vaga = await Vaga.findOne({where: { vagaId: vagaId }});

    if (vaga) {
      res.status(200).json({
        success: true,
        data: vaga,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `A vaga com o ID ${vagaId} não foi encontrada`,
      });
    }
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json({
      success: false,
      error: 'Erro: ' + err.message,
    });
  }
};


controllers.create = async (req, res) => {
    const {titulo, descricao, habilitacoesMin, experienciaMin, remuneracao, isInterna, userId, departamentoId, filialId} = req.body;
    try {
        const newVaga = await Vaga.create({
            titulo, 
            descricao, 
            habilitacoesMin, 
            experienciaMin,
            remuneracao, 
            isInterna, 
            userId, 
            departamentoId, 
            filialId, 
            dataRegisto: new Date(), 
        });
  
        res.status(200).json({
            success: true,
            message: 'Vaga registada com sucesso!',
            data: newVaga
        });
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({ 
            success: false, 
            message: "Erro ao efetuar a criação da vaga!"
        });
    }
};
  
controllers.update = async (req, res) => {
    const { vagaId } = req.params;
    const {titulo, 
           descricao, 
           habilitacoesMin, 
           experienciaMin, 
           isInterna,
           remuneracao, 
           departamentoId: departamento, 
           filialId: filial
          } = req.body;
  
    try {
        const existingVaga = await Vaga.findOne({ where: { vagaId } });
        if (!existingVaga) {
            return res.status(404).json({
            success: false,
            message: "Vaga não encontrada!"
            });
        }
        
        const data = await Vaga.update(
            {
                titulo, 
                descricao, 
                habilitacoesMin, 
                experienciaMin,
                remuneracao, 
                isInterna,
                departamentoId: departamento, 
                filialId: filial,
                dataAtualizacao: new Date()
            },{where:{vagaId}});
  
        if (data[0] === 0) {
            return res.status(404).json({
            success: false,
            message: "Vaga não encontrada!"
            });
        }
  
        res.status(200).json({
            success: true,
            data: data,
            message: "Vaga atualizada com sucesso!"
        });
    } catch (err) {
        console.error('Error:', err);
    
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Erro ao efetuar a atualização da vaga!"
        });
    }
};
  
controllers.delete = async (req, res) => {
    const { vagaIds } = req.body;
  
    try {
        await Candidatura.destroy({where:{vagaId: vagaIds}});
        const del = await Vaga.destroy({where:{vagaId:vagaIds}});
  
        if (del > 0) {
            res.status(200).json({
                success: true,
                deleted: del,
                message: 'Vagas removidas!',
            });
        } else {
        res.status(404).json({
            success: false,
            message: 'Nenhuma vaga encontrada com os IDs fornecidos!',
            });
        }
        } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Erro ao eliminar as vagas!',
        });
    }
};

module.exports = controllers;