const Estado = require('../models/estado');
const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

controllers.estadosDefault = async () => {
  const t = await sequelize.transaction();
  
  try {
    const estadoCount = await Estado.count({}, { transaction: t });

    if (estadoCount !== 0) {
      console.log("Estados \"default\" já foram importados!");
      await t.commit();
      return true;
    } else {
      await Estado.bulkCreate(
        [
          { estadoNome: 'Aprovado/a' },
          { estadoNome: 'Em revisão' },
          { estadoNome: 'Pendente' },
          { estadoNome: 'Recusado/a' },
          { estadoNome: 'Em andamento' },
          { estadoNome: 'Concluído/a' },
          { estadoNome: 'Suspenso/a' },
          { estadoNome: 'Cancelado/a' },
          { estadoNome: 'Atrasado/a' },
          { estadoNome: 'Em fase de testes' },
          { estadoNome: 'Em fase de planeamento' },
          { estadoNome: 'Em espera' },
        ],
        { transaction: t }
      );
      console.log("Estados \"default\" criados com sucesso!");
      await t.commit();
      return true;
    }
  } catch (err) {
    console.error("Ocorreu um erro ao importar os ewstados \"default\":", err);
    await t.rollback();
    return false;
  }
};

controllers.list = async (req, res) => {
  try {
      const data = await Estado.findAll();
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

module.exports = controllers;