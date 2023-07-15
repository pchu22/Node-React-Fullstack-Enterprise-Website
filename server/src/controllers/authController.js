const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/secret');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const User = require('../models/user');
const sequelize = require('../models/database');

const controllers = {}
sequelize.sync()

async function sendVerificationEmail(email, verificationToken) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.EMAIL,
        pass: config.PASSWORD,
      },
    });

    const verificationLink = `https://projeto-softinsa.onrender.com/ativacao/${verificationToken}`;

    const mailOptions = {
      from: 'pmdc2001@gmail.com',
      to: email,
      subject: 'Ativação da sua conta!',
      text: `Clique no seguinte link para verificar a sua conta: ${verificationLink}`,
    };

    await transporter.sendMail(mailOptions);

    console.log('Email de verificação foi enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar o email de verificação: ', error);
    throw new Error('Erro ao enviar o email de verificação');
  }
}

async function sendRecoverEmail(email, recoverToken) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.EMAIL,
        pass: config.PASSWORD,
      },
    });

    const recoverLink = `https://projeto-softinsa.onrender.com/recuperacao/${recoverToken}`;

    const mailOptions = {
      from: 'pmdc2001@gmail.com',
      to: email,
      subject: 'Recuperação da sua conta!',
      text: `Clique no seguinte link para recuperar a sua conta: ${recoverLink}`,
    };

    await transporter.sendMail(mailOptions);

    console.log('Email de recuperação foi enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar o email de recuperação: ', error);
    throw new Error('Erro ao enviar o email de recuperação');
  }
}

function generateToken() {
  const token = crypto.randomBytes(32).toString('hex');
  return token;
}

controllers.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos devem ser preenchidos antes de tentar efetuar login!',
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: 'Email inválido!',
      });
    }

    if (!user.isAtivo) {

      await sendVerificationEmail(email);

      return res.status(403).json({
        success: false,
        message: 'Por favor, confirme o seu email para poder efetuar login!',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(403).json({
        success: false,
        accessToken: null,
        message: 'Password inválida!',
      });
    }
    const token = jwt.sign({ email }, config.jwtSecret, { expiresIn: 86400 });
    res.status(200).json({
      success: true,
      accessToken: token,
      isPrimeiroLogin: user.isPrimeiroLogin,
      userId: user.userId,
      message: 'Login efetuado com sucesso!',
    });
    await user.update({ ultimoLogin: new Date() });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({
      success: false,
      message: 'Ocorreu um erro durante a autenticação... Por favor, tente novamente mais tarde!',
    });
  }
};

controllers.googleLegoin = async (req, res, next) => {
  const { googleId, email, primeiroNome, ultimoNome } = req.body;

  User.findOne({ where: { googleId: googleId } })
    .then(existingUser => {
      if (existingUser) {
        console.log("Google ID: ", googleId);
        console.log("O utilizador já existe");
        const payload = {
          email: existingUser.email,
          id: existingUser.userId
        }
        const token = jwt.sign(payload, config.jwtSecretGoogle, { expiresIn: "1d" });
        res.status(200).json({
          success: true,
          accessToken: token,
          message: 'Login c/ Google efetuado com sucesso!',
        });
      } else {
        User.findOne({ where: { email: email } })
          .then(async userWithEmail => {
            if (userWithEmail && userWithEmail.googleId === null) {
              console.log("Já existe um utilizador com este email...");
              res.status(401).json({
                success: false,
                message: 'Já existe uma conta não Google com este email.'
              });
            } else {
              if (!userWithEmail) {
                const randomPassword = await generateRandomPassword();

                const newUser = User.create({
                  primeiroNome: primeiroNome,
                  ultimoNome: ultimoNome,
                  email: email,
                  password: randomPassword,
                  googleId: googleId,
                  isAtivo: true,
                  isPrimeiroLogin: false,
                  cargoId: 5
                });

                res.status(201).json({
                  success: true,
                  message: 'Utilizador Google registado com sucesso!',
                  data: data
                });
              } else {
                res.status(401).send({
                  success: false,
                  message: "Já existe uma conta não google com esse email... Impossível criar uma nova conta Softinsa."
                });
              }
            }
          }).catch(err => {
            console.log('Error: ', err);
            res.status(500).json({
              success: false,
              message: 'Ocorreu um erro na criação da conta... Por favor, tente novamente mais tarde!',
              error: err instanceof Error ? err.message : String(err)
            });
          })
      }
    }).catch(err => {
      console.log('Error: ', err);
      res.status(500).json({
        success: false,
        message: 'Ocorreu um erro na criação da conta... Por favor, tente novamente mais tarde!',
        error: err instanceof Error ? err.message : String(err)
      });
    })
};

controllers.signup = async (req, res) => {
  try {
    const { primeiroNome, ultimoNome, telemovel, email, password } = req.body;
    const verificationToken = generateToken();

    const data = await User.create({
      primeiroNome: primeiroNome,
      ultimoNome: ultimoNome,
      telemovel: telemovel,
      email: email,
      password: password,
      isAtivo: false,
      isPrimeiroLogin: false,
      cargoId: 5,
      verificationToken: verificationToken
    });
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      success: true,
      message: 'Utilizador registado com sucesso! Por favor, verifique o seu email para ativar a conta.',
      data: data
    });

  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json({
      success: false,
      message: 'Ocorreu um erro na criação da conta... Por favor, tente novamente mais tarde!',
      error: err instanceof Error ? err.message : String(err)
    });
  }
};

controllers.updatePasswordPrimeiroLogin = async (req, res) => {
  const { userId } = req.params
  const { password } = req.body;

  if (!password) {
    res.status(400).json({
      success: false,
      message: 'Introduza uma nova password',
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.findOne({ where: { userId: userId } })
  try {
    user.password = hashedPassword;
    user.isPrimeiroLogin = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'A sua password foi atualizada com sucesso!',
    });
  } catch (err) {
    console.log('Error updating password:', err);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar a password',
      error: err.message,
    });
  }
};


controllers.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const recoverToken = generateToken();

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'O utilizador não existe!',
      });
    }

    user.recoverToken = recoverToken;
    await user.save();

    await sendRecoverEmail(email, recoverToken);
    res.status(200).json({ success: true, message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar o email de recuperação: ', error);
    res.status(500).json({ success: false, error: 'Erro ao enviar o email de recuperação.' });
  }
};

controllers.mudarPassword = async (req, res) => {
  try {
    const { recoverToken } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ where: { recoverToken } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'O utilizador não existe ou o token de recuperação é inválido!',
      });
    }

    const previousPassword = user.password;
    const isPasswordChanged = previousPassword !== password;

    if (!isPasswordChanged) {
      return res.status(400).json({
        success: false,
        message: 'A nova password não pode ser igual à anterior!',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await user.update({ password: hashedPassword, recoverToken: null });

    res.status(200).json({
      success: true,
      message: 'Password reposta com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao repor a password: ', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao repor a password',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};


controllers.verificarEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    console.log('Verification Token:', verificationToken);

    const user = await User.findOne({ where: { verificationToken } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'O utilizador não existe ou o token de verificação é inválido!',
      });
    }

    await user.update({ isAtivo: true, verificationToken: null });

    res.status(200).json({
      success: true,
      message: 'Email verificado com sucesso!',
    });
  } catch (error) {
    console.error('Erro ao verificar o email: ', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao verificar o email',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

module.exports = controllers;