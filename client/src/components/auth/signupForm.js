import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../../assets/logo.png';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import AuthService from "../../services/authService";
import './auth.css';

const SignupForm = () => {
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [passwordSelected, setPasswordSelected] = useState(false);

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };

  const handleConfirmPasswordClick = () => {
    setConfirmPasswordEye(!confirmPasswordEye);
  };

  const [formData, setFormData] = useState({
    primeiroNome: '',
    ultimoNome: '',
    email: '',
    telemovel: '',
    password: '',
    confirmPassword: '',
    agreePolicy: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const {
      primeiroNome,
      ultimoNome,
      email,
      telemovel,
      password,
      confirmPassword,
      agreePolicy,
    } = formData;

    if (!primeiroNome || !ultimoNome || !email || !telemovel || !password || !agreePolicy) {
      Swal.fire({
        icon: 'error',
        text: "Existem campos de preenchimento obrigatório que se encontram por preencher!",
      });
    } else if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        text: 'As passwords não coincidem.',
      });
    } else if (!isPasswordValid(password)) {
      Swal.fire({
        icon: 'error',
        text: 'A password deve ter entre 8 e 24 caracteres, conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caracter especial (!, @, #, ?, %, - ou _).',
      });
    } else {
      AuthService.signup(primeiroNome, ultimoNome, telemovel, email, password)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Registo efetuado com sucesso!',
          text: 'A sua conta foi criada com sucesso! Verifique o seu email e ative a conta antes de efetuar o login!',
          confirmButtonText: 'OK',
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro durante o registo!',
          text: 'Ocorreu um erro durante a criação da sua conta',
          confirmButtonText: 'OK',
        });
        console.log(err);
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#?%-_])[A-Za-z\d!@#?%-_]{8,24}$/;
    return passwordRegex.test(password);
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isPasswordInvalid = passwordSelected && !formData.password;

  return (
    <div className="wrapper">
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <div className="card">
          <div className="header-image">
            <img src={logo} alt="Logo-Softinsa" />
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="textarea-container-nome">
                <div className="name-input">
                  <label htmlFor="primeiroNome" className="larger-label">Primeiro Nome</label>
                  <input
                    id="primeiroNome"
                    type="text"
                    className="form-control"
                    name="primeiroNome"
                    required
                    value={formData.primeiroNome}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="name-input">
                  <label htmlFor="ultimoNome" className="larger-label">Último Nome</label>
                  <input
                    id="ultimoNome"
                    type="text"
                    className="form-control"
                    name="ultimoNome"
                    required
                    value={formData.ultimoNome}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="textarea-container">
              <label htmlFor="email">E-Mail</label>
                  <input
                    id="email"
                    type="email"
                    className={`form-control ${isEmailValid(formData.email) ? '' : 'is-invalid'}`}
                    name="email"
                    required
                    autoFocus
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">Email inválido</div>
              </div>
              <div className="textarea-container">
                <label htmlFor="telemovel">Telemóvel</label>
                <input
                  id="telemovel"
                  type="telemovel"
                  className="form-control"
                  name="telemovel"
                  value={formData.telemovel}
                  onChange={handleInputChange}
                />
              </div>
              <div className={`textarea-container ${isPasswordInvalid ? 'has-error' : ''}`}>
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    id="password"
                    type={passwordEye ? 'text' : 'password'}
                    className={`form-control shadow-none ${isPasswordInvalid ? 'is-invalid' : ''}`}
                    name="password"
                    autoComplete="off"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">Password inválida</div>
                </div>
                <span className={`password-toggle-icon ${isPasswordInvalid ? 'hidden' : ''}`} onClick={handlePasswordClick}>
                  {passwordEye === false ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              <div className={`textarea-container ${isPasswordInvalid ? 'has-error' : ''}`}>
                <label htmlFor="confirmPassword">Confirmar Password</label>
                <div className="password-input">
                  <input
                    id="password"
                    type={confirmPasswordEye ? 'text' : 'password'}
                    className={`form-control shadow-none ${isPasswordInvalid ? 'is-invalid' : ''}`}
                    name="confirmPassword"
                    autoComplete="off"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <div className="invalid-feedback">Password inválida</div>
                </div>
                <span className={`password-toggle-icon ${isPasswordInvalid ? 'hidden' : ''}`} onClick={handleConfirmPasswordClick}>
                  {confirmPasswordEye === false ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  name="agreePolicy"
                  id="agreePolicy"
                  className="form-check-input"
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="agreePolicy" className="form-check-label">
                  Concordo com as políticas de privacidade da Softinsa
                </label>
              </div>
              <div className="btn-wrapper">
                <div className="btn-group">
                  <button type="submit" className="btn btn-outline-success" disabled={!formData.agreePolicy}>
                    <span className="bi bi-check-lg"> Signup</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="card-container">
            <div className="card-footer border-0">
              <div className="text-center">
                Já tenho conta! <a href="/login" className="text-primary small">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
