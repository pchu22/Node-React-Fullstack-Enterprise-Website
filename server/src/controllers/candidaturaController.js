const Candidatura = require('../models/candidatura');
const User = require('../models/user');
const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

controllers.list = async (req, res) => {
  try {
    const data = await Candidatura.findAll();
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
  const { candidaturaId } = req.params;
  try {
    const candidatura = await Candidatura.findOne({ where: { candidaturaId: candidaturaId } });

    if (candidatura) {
      res.status(200).json({
        success: true,
        data: candidatura,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `A candidatura com o ID ${candidaturaId} não foi encontrada`,
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


controllers.candidatar = async (req, res) => {
  const { cv, userId, vagaId } = req.body;

  try {
    const existingCandidatura = await Candidatura.findOne({
      where: {
        userId,
        vagaId,
      },
    });

    if (existingCandidatura) {
      return res.status(400).json({
        success: false,
        message: 'Já se candidatou para essa vaga!',
      });
    }

    const newCandidatura = await Candidatura.create({
      cv,
      isAtiva: true,
      userId,
      vagaId,
      dataCriacao: new Date(),
    });

    const user = await User.findByPk(userId);
    User.update({ isCandidato: true }, { where: { userId } });
    if (user.cargoId === 5) {
      await User.update({ cargoId: 4 }, { where: { userId } });
    }

    res.status(200).json({
      success: true,
      message: 'Candidatura registada com sucesso!',
      data: newCandidatura,
    });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Erro ao efetuar a criação da candidatura!',
    });
  }
};




controllers.update = async (req, res) => {
  const { candidaturaId } = req.params;
  const { cv, isInterna, departamentoId: departamento, filialId: filial } = req.body;

  try {
    const existingCandidatura = await Candidatura.findOne({ where: { candidaturaId } });
    if (!existingCandidatura) {
      return res.status(404).json({
        success: false,
        message: "Candidatura não encontrada!"
      });
    }

    const data = await Candidatura.update(
      {
        cv,
        isInterna,
        departamentoId: departamento,
        filialId: filial,
        dataAtualizacao: new Date()
      }, { where: { candidaturaId } });

    if (data[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "Candidatura não encontrada!"
      });
    }

    res.status(200).json({
      success: true,
      data: data,
      message: "Candidatura atualizada com sucesso!"
    });
  } catch (err) {
    console.error('Error:', err);

    res.status(500).json({
      success: false,
      error: err.message,
      message: "Erro ao efetuar a atualização da candidatura!"
    });
  }
};

controllers.delete = async (req, res) => {
  const { candidaturaIds } = req.body;

  try {
    const del = await Candidatura.destroy({ where: { candidaturaId: candidaturaIds } });

    if (del > 0) {
      res.status(200).json({
        success: true,
        deleted: del,
        message: 'Candidaturas removidas!',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Nenhuma candidatura encontrada com os IDs fornecidos!',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Erro ao eliminar as candidaturas!',
    });
  }
};

module.exports = controllers;