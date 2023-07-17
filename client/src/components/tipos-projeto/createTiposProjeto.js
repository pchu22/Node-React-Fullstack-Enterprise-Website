import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../assets/logo.png'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com";

export default function CreateTipo() {
    const [nome, setNome] = useState("");

    const navigate = useNavigate();

    function SendSave(event) {
        event.preventDefault();

        if (!nome) {
            Swal.fire("O nome do tipo de projeto é de preenchimento obrigatório");
        } else {
            const url = baseURL + "/tipo-projeto/create";
            const datapost = { tipoProjetoNome: nome };

            axios.post(url, datapost)
                .then(res => {
                    if (res.data.success) {
                        Swal.fire({
                            icon: 'success',
                            text: res.data.message
                        });
                        navigate('/tipo-projeto');
                    } else {
                        Swal.fire({
                            icon: 'error',
                            text: res.data.message
                        });
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
                            <div className="textarea-container">
                                <label htmlFor="inputNome">Tipo de Projeto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nome"
                                    id="inputNome"
                                    value={nome}
                                    onChange={(event) => setNome(event.target.value)}
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
                                        onClick={() => navigate('/tipo-projeto')}
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
