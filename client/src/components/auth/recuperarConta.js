import '../../custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";

import logo from '../../assets/logo.png';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com/auth';

const RecuperarConta = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      const response = await axios.post(`${baseURL}/forgot-password`, { email });
      setMessage(response.data.message);
  
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'O email de recuperação foi enviado para o email associado à sua conta Softinsa!',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => {
        navigate('/login');
      });
    } catch (error) {
      setMessage('Erro ao enviar o email de recuperação.');
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Erro ao enviar o email de recuperação.',
      });
      console.error(error);
    }
  
    setIsLoading(false);
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div className="wrapper">
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <div className="card">
          <div className="header-image">
            <img src={logo} alt="Logo-Softinsa" />
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="textarea-container">
                <label htmlFor="email">E-Mail</label>
                <input
                  id="email"
                  type="email"
                  className={`form-control ${isEmailValid(email) ? '' : 'is-invalid'}`}
                  name="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <div className="invalid-feedback">Email inválido</div>
              </div>
              <div className="btn-wrapper">
                <div className="btn-group">
                  <button type="submit" className="btn btn-outline-success">
                    <span className="bi bi-check-lg"> Enviar</span>
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

export default RecuperarConta;
