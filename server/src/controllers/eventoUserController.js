const EventoUser = require('../models/eventoUser');
const sequelize = require('../models/database');
const config = require('../config/secret');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

const controllers = {}
sequelize.sync()

controllers.list = async (req, res) => {
    try {
        const data = await EventoUser.findAll();
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
        const data = await EventoUser.findOne({ where: { eventoId: eventoId } });

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
        eventoId,
        userId,
        titulo,
        descricao,
        tipo,
        dataInicio,
        dataFim,
        email,
        nome,
    } = req.body;

    try {
        const newEventoUser = await EventoUser.create({
            eventoId,
            userId,
        });
        await sendEventoEmail(email, titulo, descricao, tipo, dataInicio, dataFim, nome)
        const eventStartTime = new Date(dataInicio); // Assuming dataInicio is a string datetime
        const emailSendTime = new Date(eventStartTime.getTime() - 3600 * 1000); // 1 hour before
        scheduleEmailBeforeEvent(emailSendTime, email, titulo, descricao, tipo, dataInicio, dataFim, nome);    

        res.status(200).json({
            success: true,
            message: 'Evento criado com sucesso!',
            data: newEventoUser
        });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({ success: false, message: "Erro ao criar o evento!" });
    }
};

controllers.delete = async (req, res) => {
    const { eventoId } = req.body;

    try {
        const del = await EventoUser.destroy({ where: { eventoId: eventoId } });

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

//Basicamente para remover um só user de um só evento!
controllers.deleteUserEvento = async (req, res) => {
    const { eventoId, userId } = req.body;

    try {
        const del = await EventoUser.destroy({ where: { eventoId: eventoId, userId: userId } });

        if (del > 0) {
            res.status(200).json({
                success: true,
                deleted: del,
                message: 'User removido do Evento!'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Nenhum evento/user encontrado com o ID fornecido!',
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Erro ao eliminar o user do evento!'
        });
    }
};

async function sendEventoEmail(email, titulo, descricao, tipo, dataInicio, dataFim, nome) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.EMAIL,
        pass: config.PASSWORD,
      },
    });


    const mailOptions = {
      from: 'pmdc2001@gmail.com',
      to: email,
      subject: `Marcação de ${tipo} - ${titulo}`,
      text: `Uma ${tipo} foi marcada por ${nome} para a data de ${dataInicio} - ${dataFim} \n` +
      `Com a seguinte descrição : \n` +
      `${descricao}`,
    };

    await transporter.sendMail(mailOptions);

    console.log('Email de evento foi enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar o email do evento: ', error);
    throw new Error('Erro ao enviar o email do evento');
  }
}

async function sendEventoEmailAviso(email, titulo, tipo, dataInicio, dataFim, nome) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.EMAIL,
          pass: config.PASSWORD,
        },
      });
  
  
      const mailOptions = {
        from: 'pmdc2001@gmail.com',
        to: email,
        subject: `Aviso - O evento ${tipo} - ${titulo} começa dentro de 1 hora`,
        text: `Este email é apenas um alerta que o seu evento com ${nome} para a data de ${dataInicio} - ${dataFim} irá decorrer dentro de 1 hora`
      };
  
      await transporter.sendMail(mailOptions);
  
      console.log('Email de evento foi enviado com sucesso');
    } catch (error) {
      console.error('Erro ao enviar o email do evento: ', error);
      throw new Error('Erro ao enviar o email do evento');
    }
  }

function scheduleEmailBeforeEvent(sendTime, email, titulo, descricao, tipo, dataInicio, dataFim, nome) {
    schedule.scheduleJob(sendTime, async () => {
        try {
            await sendEventoEmailAviso(email, titulo, descricao, tipo, dataInicio, dataFim, nome);
        } catch (error) {
            console.error('Erro ao enviar o email do evento: ', error);
        }
    });
}



module.exports = controllers