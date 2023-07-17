import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../assets/logo.png'

import './calendario.css'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com";

export default function CreateEvento() {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("");
    const [inicio, setInicio] = useState("");
    const [fim, setFim] = useState("");
    const navigate = useNavigate();

    function SendSave(event) {
        event.preventDefault();

        const url = baseURL + "/evento/create";
        const userId = localStorage.getItem('userId');
        const datapost = {
            titulo: titulo,
            descricao: descricao,
            tipo: tipo,
            dataInicio: inicio,
            dataFim: fim,
            userId: userId
        }

        axios.post(url, datapost)
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: res.data.message,
                    }).then(() => navigate('/calendario'));
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: res.data.message,
                    });
                }
            }).catch(err => {
                console.log("Error: ", err);
                alert("Error 34: " + err);
            });
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
                                <label htmlFor="inputTitulo">Título</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Título"
                                    id="inputTitulo"
                                    value={titulo}
                                    onChange={(event) => setTitulo(event.target.value)}
                                />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputDesc">Descrição</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Descrição"
                                    id="inputDesc"
                                    value={descricao}
                                    onChange={(event) => setDescricao(event.target.value)}
                                />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputTipo">Tipo</label>
                                <select
                                    type="text"
                                    className="form-control"
                                    placeholder="Tipo de Ideia"
                                    id="inputTipo"
                                    value={tipo}
                                    onChange={(event) => setTipo(event.target.value)}
                                >
                                    <option disabled>Por favor, escolha o tipo do evento</option>
                                    <option value={"Reunião"}>Reunião</option>
                                    <option value={"Entrevista"}>Entrevista</option>
                                    <option>Outro</option>
                                </select>
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputDate" style={{ marginRight: '10px' }}>Início</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="inputDate"
                                    value={inicio}
                                    onChange={(event) => setInicio(event.target.value)}
                                />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputDate" style={{ marginRight: '10px' }}>Fim</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="inputDate"
                                    value={fim}
                                    onChange={(event) => setFim(event.target.value)}
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
                                        onClick={() => navigate('/calendario')}
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