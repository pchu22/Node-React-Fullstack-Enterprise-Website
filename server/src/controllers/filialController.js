const Filial = require('../models/filial');
const User = require('../models/user')
const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

controllers.list = async (req, res) => {
  try {
    const data = await Filial.findAll();
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
}

controllers.get = async (req, res) => {
  const { filialId } = req.params;
  try {
      const data = await Filial.findOne({where: { filialId: filialId }});
  
      if (data) {
        res.status(200).json({
          success: true,
          data: data,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'A filial com o ID ' + filialId + ' não foi encontrada!',
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
  const {filialNome, morada, telemovel, email, } = req.body;

  try {
    const newFilial = await Filial.create({
      filialNome,
      morada,
      telemovel,
      email,
      dataRegisto: new Date()
    });

    res.status(200).json({
      success: true,
      message: 'Filial criada com sucesso!',
      data: newFilial
    });
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ success: false, message: "Erro ao efetuar a craição da filial!"});
  }
};

controllers.update = async (req, res) => {
  const {filialId} = req.params;
  const {filialNome, morada, telemovel, email} = req.body;

  try {
    const existingFilial = await Filial.findOne({where: {filialId}});
    if (!existingFilial) {
      return res.status(404).json({
        success: false,
        message: "Filial não encontrada!"
      });
    }

    const data = await Filial.update({
      filialNome:filialNome,
      morada: morada,
      telemovel: telemovel,
      email: email, 
      dataAtualizacao: new Date()
    }, {where: {filialId}});

    if (data[0] === 0) {
      return res.status(404).json({
        success: false,
        message: "Filial não encontrada!"
      });
    }

    res.status(200).json({
      success: true,
      data: data,
      message: "Filial atualizada com sucesso!"
    });
  } catch (err) {
    console.error('Error:', err);

    res.status(500).json({
      success: false,
      error: err.message,
      message: "Erro ao efetuar a atualização da filial!"
    });
  }
};

controllers.delete = async (req, res) => {
  const { filialIds } = req.body;

  try {
    await User.update({ filialId: null }, { where: { filialId: filialIds } });
    const del = await Filial.destroy({ where: { filialId: filialIds } });

    if (del > 0) {
      res.status(200).json({
        success: true,
        deleted: del,
        message: 'Filiais removidas!'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Nenhuma filial encontrada com os IDs fornecidos!',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Erro ao eliminar as filiais!'
    });
  }
};


module.exports = controllers