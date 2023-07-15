import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../../assets/logo.png'
import '.././style.css'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com";

export default function CreateDepartamento() {
    const [departamentoNome, setDepartamentoNome] = useState("");
    const [descricao, setDescricao] = useState("");

    const navigate = useNavigate();

    function SendSave(event) {
        event.preventDefault();

        if (!departamentoNome || !descricao) {
            Swal.fire({
                icon: 'error',
                text: "Existem campos de preenchimento obrigatório que se encontram por preencher!",
            });
            return;
        } else {
            const url = baseURL + "/departamento/create";
            const datapost = {
                departamentoNome: departamentoNome,
                descricao: descricao,
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
                                <label htmlFor="inputDNome">Nome do departamento</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nome"
                                    id="inputDNome"
                                    value={departamentoNome}
                                    onChange={(event) => setDepartamentoNome(event.target.value)} />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputDesc">Descrição</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="inputDesc"
                                    placeholder="Descrição"
                                    value={descricao}
                                    onChange={(event) => setDescricao(event.target.value)}
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
                </div >
            </div >
        </div >
    );
}