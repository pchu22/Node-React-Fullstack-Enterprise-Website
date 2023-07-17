const Evento = require('../models/evento');
const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

controllers.list = async (req, res) => {
    try {
        const data = await Evento.findAll();
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
    const { eventoId } = req.params;
    try {
        const data = await Evento.findOne({ where: { eventoId: eventoId } });

        if (data) {
            res.status(200).json({
                success: true,
                data: data,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'O evento com o ID ' + eventoId + ' não foi encontrado!',
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
        titulo,
        descricao,
        tipo,
        dataInicio,
        dataFim,
        userId
    } = req.body;

    try {
        const newEvento = await Evento.create({
            titulo,
            descricao,
            tipo,
            dataInicio,
            dataFim,
            estadoId: 12,
            userId,
        });

        res.status(200).json({
            success: true,
            message: 'Evento criado com sucesso!',
            data: newEvento
        });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({ success: false, message: "Erro ao criar o evento!" });
    }
};

controllers.update = async (req, res) => {
    const { eventoId } = req.params;
    const {
        titulo,
        descricao,
        tipo,
        dataInicio,
        dataFim,
        estadoId: estado,
        userId: user,
        notas
    } = req.body;
    try {
        const existingEvento = await Evento.findOne({ where: { eventoId } });
        if (!existingEvento) {
            return res.status(404).json({
                success: false,
                message: "Evento não encontrado!"
            });
        }

        const data = await Evento.update({
            titulo: titulo,
            descricao:descricao,
            tipo: tipo,
            dataInicio: dataInicio,
            dataFim: dataFim,
            estadoId: estado,
            userId: user,
            notas: notas
        }, { where: { eventoId } });

        if (data[0] === 0) {
            return res.status(404).json({
                success: false,
                message: "Evento não encontrado!"
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
            message: "Erro ao efetuar a atualização do evento!"
        });
    }
};

controllers.delete = async (req, res) => {
    const { eventoId } = req.body;

    try {
        const del = await Evento.destroy({ where: { eventoId: eventoId } });

        if (del > 0) {
            res.status(200).json({
                success: true,
                deleted: del,
                message: 'Evento removido!'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Nenhum evento encontrado com o ID fornecido!',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Erro ao eliminar o evento!'
        });
    }
};


module.exports = controllers