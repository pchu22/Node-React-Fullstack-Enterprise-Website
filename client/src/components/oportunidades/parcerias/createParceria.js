import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../../assets/logo.png'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com";

export default function CreateInvestimento() {
    const [nomeParceiro, setNomeParceiro] = useState("");
    const [email, setEmail] = useState("");
    const [telemovel, setTelemovel] = useState("");
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        setUser(userId);
    }, [])

    function SendSave(event) {
        event.preventDefault();

        if (nomeParceiro.trim() === "" || email.trim() === "" || telemovel.trim() === "" || user === null) {
            Swal.fire("Existem campos são de preenchimento obrigatório que estão em branco!");
        } else if (!/^\d{9}$/.test(telemovel) && !/^\d{10}$/.test(telemovel)) {
            Swal.fire("Tem de inserir um número de telemóvel ou de telefone fixo!");
        } else {
            const url = baseURL + "/parceria/create";
            const datapost = {
                nomeParceiro: nomeParceiro,
                email: email,
                telemovel: telemovel,
                userId: user
            };

            axios.post(url, datapost)
                .then(res => {
                    if (res.data.success) {
                        Swal.fire(res.data.message);
                        navigate('/oportunidade');
                    } else {
                        Swal.fire(res.data.message);
                    }
                })
                .catch(err => {
                    console.log("Error: ", err);
                    alert("Error 34: " + err);
                });
        }
    }

    return (
        <div className='wrapper'>
            <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                <div className="card">
                    <div className="header-image">
                        <img src={logo} alt="Logo-Softinsa" />
                    </div>
                    <div className="card-body">
                        <form onSubmit={SendSave}>
                        <div class="textarea-container">
                                <label htmlFor="inputNome">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nome"
                                    id="inputNome"
                                    value={nomeParceiro}
                                    onChange={(event) => setNomeParceiro(event.target.value)}
                                />
                            </div>
                            <div class="textarea-container">
                                <label htmlFor="inputEmail">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    id="inputEmail"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div class="textarea-container">
                                <label htmlFor="inputTel">Telemóvel</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="Número de Telemóvel"
                                    id="inputTel"
                                    value={telemovel}
                                    onChange={(event) => setTelemovel(event.target.value)}
                                />
                            </div>
                            <div className="btn-wrapper">
                                <div className="btn-group">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-success">
                                        <span className="bi bi-check" />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger cancel-btn"
                                        onClick={() => navigate('/oportunidade')}
                                        style={{ marginLeft: '10px' }}>
                                        <span className="bi bi-x-octagon-fill" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}