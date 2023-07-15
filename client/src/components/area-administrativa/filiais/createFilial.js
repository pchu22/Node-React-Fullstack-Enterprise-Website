import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../../assets/logo.png'
import '.././style.css'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

export default function CreateUser() {
    const [filialNome, setFilialNome] = useState("");
    const [email, setEmail] = useState("");
    const [telemovel, setTelemovel] = useState("");
    const [morada, setMorada] = useState("");

    const navigate = useNavigate();

    function SendSave(event) {
        event.preventDefault();

        if (!filialNome || !email || !telemovel || !morada) {
            Swal.fire({
                icon: 'error',
                text: "Existem campos de preenchimento obrigatório que se encontram por preencher!",
            });
            return;
        } else {
            const url = baseURL + "filial/create";
            const datapost = {
                filialNome: filialNome,
                email: email,
                telemovel: telemovel,
                morada: morada,
            };

            axios.post(url, datapost)
                .then(res => {
                    if (res.data.success === true) {
                        Swal.fire({
                            icon: 'success',
                            text: res.data.message
                        });
                        navigate('/area-administrativa');
                    } else {
                        Swal.fire({
                            icon: 'error',
                            text: res.data.message
                        });
                    }
                }).catch(err => {
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
                            <div className="textarea-container">
                                <label htmlFor="inputFNome">Nome da filial</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nome da filial"
                                    value={filialNome}
                                    onChange={(event) => setFilialNome(event.target.value)}
                                />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputEmail">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputTelemovel">Telemovel</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="inputTelemovel"
                                    placeholder="Telemovel"
                                    value={telemovel}
                                    onChange={(event) => setTelemovel(event.target.value)}
                                />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputMorada">Morada</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputMorada"
                                    placeholder="Morada"
                                    value={morada}
                                    onChange={(event) => setMorada(event.target.value)}
                                />
                            </div>
                            <div className="btn-wrapper">
                                <div className="btn-group">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-success">
                                        <span className="bi bi-check-lg" />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger cancel-btn"
                                        onClick={() => navigate('/area-administrativa')}
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