const Cargo = require('../models/cargo');
const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

controllers.cargosDefault = async () => {
  const t = await sequelize.transaction();
  
  try {
    const cargoCount = await Cargo.count({}, { transaction: t });

    if (cargoCount !== 0) {
      console.log("Cargos \"default\" já foram importados!");
      await t.commit();
      return true;
    } else {
      await Cargo.bulkCreate(
        [
          { cargoNome: 'Administrador' },
          { cargoNome: 'Gestor' },
          { cargoNome: 'Colaborador' },
          { cargoNome: 'Candidato' },
          { cargoNome: 'Visitante' },
        ],
        { transaction: t }
      );
      console.log("Cargos \"default\" criados com sucesso!");
      await t.commit();
      return true;
    }
  } catch (err) {
    console.error("Ocorreu um erro ao importar os cargos \"default\":", err);
    await t.rollback();
    return false;
  }
};

controllers.list = async (req, res) => {
  try {
      const data = await Cargo.findAll();
      console.log('Cargo data:', data);
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