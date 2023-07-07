import React, { useState } from 'react';
import '../../custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from "sweetalert2"
import logo from '../../assets/logo.png';
import axios from 'axios';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/auth";

const PrimeiroLoginForm = () => {

    const [passwordEye, setPasswordEye] = useState(false);
    const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
    
    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#?%-_])[A-Za-z\d!@#?%-_]{8,24}$/;
        return passwordRegex.test(password);
    };

    const handlePasswordClick = () => {
        setPasswordEye(!passwordEye);
    };

    const handleConfirmPasswordClick = () => {
        setConfirmPasswordEye(!confirmPasswordEye);
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const {password, confirmPassword} = formData;
      
        if (!password) {
            Swal.fire({
            icon: 'error',
            text: 'Introduza uma password',
            });
        } else if (password !== confirmPassword) {
            Swal.fire({
            icon: 'error',
            text: 'As passwords não coincidem.',
            });
        } else if (!isPasswordValid(password)) {
            Swal.fire({
            icon: 'error',
            text: 'A password deve ter entre 8 e 24 caracteres, conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (!@#?%-_).',
            });
        } else {
            try {
                const userId = localStorage.getItem('userId');
                const url = baseURL + '/primeiroLogin/' + userId;
                console.log(userId)
                const response = await axios.post(url, { password });  

                if (response.status === 200) {
                  Swal.fire({
                    icon: 'success',
                    text: response.data.message,
                  });
                } else {
                  Swal.fire({
                    icon: 'error',
                    text: response.data.message,
                  });
                }
              } catch (error) {
                Swal.fire({
                  icon: 'error',
                  text: 'Erro ao atualizar a password',
                });
              }
        }
    }
    
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
                                                <label className="text-muted" htmlFor="password">Nova Password</label>
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
                                                A password é um campo de preenchimento obrigatório!
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
                                                A password é um campo de preenchimento obrigatório!
                                            </div>
                                            <span className='password-toggle-icon'>
                                                {confirmPasswordEye === false ? (<AiFillEyeInvisible onClick={handleConfirmPasswordClick} />) : (<AiFillEye onClick={handleConfirmPasswordClick} />)}
                                            </span>
                                        </div>
                                        <div className="align-items-center">
                                            <button type="submit" className="btn btn-primary w-100">
                                                Alterar password
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrimeiroLoginForm;