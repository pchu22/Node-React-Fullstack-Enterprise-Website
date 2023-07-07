import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../../assets/logo.png';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import axios from 'axios';

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com/auth';

const PasswordResetForm = () => {
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        title: 'Error',
        text: 'As passwords não correspondem!',
        icon: 'error',
      });
      return;
    }

    const recoverToken = window.location.pathname.split('/').pop();
    const url = `${baseURL}/reset-password/${recoverToken}`;

    try {
      const response = await axios.post(url, { password: formData.password });
      Swal.fire({
        title: 'Success',
        text: 'Password alterada com sucesso!',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Ocorreu um erro ao alterar a sua password!',
        icon: 'error',
      });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#D9D9D9' }}>
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-md-8 col-sm-9">
              <div className="card shadow-lg">
                <div className="text-center mb-4">
                  <img src={logo} alt="Logo Softinsa" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
                <form className="needs-validation" noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <div className="mb-2 w-100">
                      <label className="text-muted" htmlFor="password">
                        Password
                      </label>
                    </div>
                    <input
                      id="password"
                      type={passwordEye ? 'text' : 'password'}
                      className="form-control shadow-none"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <div className="invalid-feedback">Password is required</div>
                    <span className="password-toggle-icon" onClick={handlePasswordClick}>
                      {passwordEye ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="mb-2 w-100">
                      <label className="text-muted" htmlFor="confirmPassword">
                        Confirmar Password
                      </label>
                    </div>
                    <input
                      id="confirmPassword"
                      type={confirmPasswordEye ? 'text' : 'password'}
                      className="form-control shadow-none"
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <div className="invalid-feedback">Password is required</div>
                    <span className="password-toggle-icon" onClick={handleConfirmPasswordClick}>
                      {confirmPasswordEye ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PasswordResetForm;