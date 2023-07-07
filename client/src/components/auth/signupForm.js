import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../../assets/logo.png';
import AuthService from '../../services/authService';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

function goBack() {
    window.history.back();
}

const SignupForm = () => {
    const [passwordEye, setPasswordEye] = useState(false);
    const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);

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

    if (!primeiroNome || !ultimoNome || !email || !password || !agreePolicy) {
      Swal.fire({
        icon: 'error',
        text: 'Preencha todos os campos obrigatórios.',
      });
    } else if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        text: 'As senhas não coincidem.',
      });
    } else if (!isPasswordValid(password)) {
      Swal.fire({
        icon: 'error',
        text: 'A senha deve ter entre 8 e 24 caracteres, conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (!@#?%-_).',
      });
    } else {
      AuthService.signup(primeiroNome, ultimoNome, telemovel, email, password)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Registo efetuado com sucesso!',
            text: 'A sua conta foi criada com sucesso!',
            confirmButtonText: 'OK',
          });
        })
        .catch((error) => {
          let errorMessage = 'Ocorreu um erro durante a criação da sua conta';
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          Swal.fire({
            icon: 'error',
            title: 'Erro durante o registo!',
            text: errorMessage,
            confirmButtonText: 'OK',
          });
          console.log(error);
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

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#D9D9D9' }}>
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-md-8 col-sm-9">
              <div className="card shadow-lg">
                <div className="card-body py-4 px-5">
                  <div className="text-center mb-4">
                    <img src={logo} alt="Logo Softinsa" style={{ maxWidth: '100%', height: 'auto' }} />
                  </div>
                  <form className="needs-validation" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label className="text-muted" htmlFor="primeiroNome">Primeiro Nome</label>
                      </div>
                      <input
                        id="primeiroNome"
                        type="text"
                        className="form-control shadow-none"
                        name="primeiroNome"
                        required
                        value={formData.primeiroNome}
                        onChange={handleInputChange}
                      />
                      <div className="invalid-feedback">
                        Primeiro Nome é necessário
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label className="text-muted" htmlFor="ultimoNome">Último Nome</label>
                      </div>
                      <input
                        id="ultimoNome"
                        type="text"
                        className="form-control shadow-none"
                        name="ultimoNome"
                        required
                        value={formData.ultimoNome}
                        onChange={handleInputChange}
                      />
                      <div className="invalid-feedback">
                        Último Nome é necessário
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="email">E-Mail</label>
                      <input
                        id="email"
                        type="email"
                        className={`form-control shadow-none ${isEmailValid(formData.email) ? '' : 'is-invalid'}`}
                        name="email"
                        required
                        autoFocus
                        value={formData.email}
                        onChange={handleInputChange}
                     />
                      <div className="invalid-feedback">
                        Email inválido
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="telemovel">Telemóvel</label>
                      <input
                        id="telemovel"
                        type="telemovel"
                        className="form-control shadow-none"
                        name="telemovel"
                        value={formData.telemovel}
                        onChange={handleInputChange}
                      />
                      <div className="invalid-feedback">
                        Telemóvel inválido
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label className="text-muted" htmlFor="password">Password</label>
                      </div>
                      <input
                        id="password"
                        type={passwordEye ? "text" : "password"}
                        className="form-control shadow-none"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <div className="invalid-feedback">
                        Password é necessário
                      </div>
                      <span className='password-toggle-icon'>
                        {passwordEye === false ? (<AiFillEyeInvisible onClick={handlePasswordClick} />) : (<AiFillEye onClick={handlePasswordClick} />)}
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label className="text-muted" htmlFor="confirmPassword">Confirmar Password</label>
                      </div>
                      <input
                        id="confirmPassword"
                        type={confirmPasswordEye ? "text" : "password"}
                        className="form-control shadow-none"
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      <div className="invalid-feedback">
                        Password é necessário
                      </div>
                      <span className='password-toggle-icon'>
                        {confirmPasswordEye === false ? (<AiFillEyeInvisible onClick={handleConfirmPasswordClick} />) : (<AiFillEye onClick={handleConfirmPasswordClick} />)}
                      </span>
                    </div>

                    <div className="form-check mb-2">
                      <input
                        type="checkbox"
                        name="agreePolicy"
                        id="agreePolicy"
                        className="form-check-input shadow-none"
                        required
                        checked={formData.agreePolicy}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="agreePolicy" className="form-check-label">
                        Concordo com as políticas de privacidade da Softinsa
                      </label>
                    </div>

                    <div className="align-items-center">
                      <button type="submit" className="btn btn-primary w-100" disabled={!formData.agreePolicy}>
                        Signup
                      </button>
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-0" >
                    <div className="text-center">
                        Já tenho conta! <a href="/login" className="text-primary small"> Login</a>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*<div className="position-absolute end-0 top-0 rounded-circle m-5">
        <button type="button" className="btn btn-primary btn-lg" aria-expanded="false" onClick={goBack}>
          <i className="bi bi-arrow-left"></i>
        </button>
      </div>*/}
    </div>
  );
};

export default SignupForm;
