import React, { useState } from 'react';
import '../../custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from "sweetalert2"
import logo from '../../assets/logo.png';
import axios from 'axios';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/auth";

const PrimeiroLoginForm = () => {

    const [passwordEye, setPasswordEye] = useState(false);
    const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
    const [passwordSelected, setPasswordSelected] = useState(false);
    const navigate = useNavigate();
    
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

        const { password, confirmPassword } = formData;

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
                    navigate ('/homepage');
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

export default PrimeiroLoginForm;