import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../../assets/logo.png';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './auth.css'

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com/auth';

const PasswordResetForm = () => {
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [passwordSelected, setPasswordSelected] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordClick = () => {
    setPasswordEye((prevValue) => !prevValue);
  };

  const handleConfirmPasswordClick = () => {
    setConfirmPasswordEye((prevValue) => !prevValue);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#?%-_])[A-Za-z\d!@#?%-_]{8,24}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
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
      const recoverToken = window.location.pathname.split('/').pop();
      const url = `${baseURL}/reset-password/${recoverToken}`;

      try {
        const response = await axios.post(url, { password: formData.password });
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Password alterada com sucesso!',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          navigate('/login');
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Erro ao alterar o email da sua Conta Softinsa.',
        });
        console.error(error);
      }
    }
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
              <div className="btn-wrapper">
                <div className="btn-group">
                  <button type="submit" className="btn btn-outline-success">
                    <span className="bi bi-check-lg"> Alterar Password</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;