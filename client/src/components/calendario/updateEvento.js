import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import logo from '../../assets/logo.png'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

const FormEventos = () => {
    const [eventos, setEventos] = useState("")
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("");
    const [inicio, setInicio] = useState("");
    const [fim, setFim] = useState("");


    const navigate = useNavigate();
    const { eventoId } = useParams();

    useEffect(() => {
        const url = baseURL + "evento/get/" + eventoId;
        axios.get(url)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    console.log(data);
                    setEventos(data);
                    setTitulo(data.titulo);
                    setDescricao(data.descricao);
                    setTipo(data.tipo);
                    setInicio(data.dataInicio);
                    setFim(data.dataFim);
                } else {
                    alert("Error Web service");
                }
            })
            .catch((err) => {
                alert("Error server: " + err);
            });
    }, []);

    return (
        <div className="wrapper">
            <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                <div className="card">
                    <div className="header-image">
                        <img src={logo} alt="Logo-Softinsa" />
                    </div>
                    <div className="card-body">
                        <form onSubmit={updateBeneficio}>
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
                                    type="datetime-local"
                                    className="form-control"
                                    id="inputDate"
                                    value={inicio}
                                    onChange={(event) => setInicio(event.target.value)}
                                />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputDate" style={{ marginRight: '10px' }}>Fim</label>
                                <input
                                    type="datetime-local"
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
                                        <span className="bi bi-check" />
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
            </div >
        </div >
    );

    async function updateBeneficio(event) {
        event.preventDefault();

        try {
            const url = baseURL + "evento/update/" + eventoId;
            const datapost = {
                titulo: titulo,
                descricao: descricao,
                tipo: tipo,
                dataInicio: inicio,
                dataFim: fim
            };

            const response = await axios.put(url, datapost);
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    text: response.data.message
                })
                    .then(() => {
                        navigate("/calendario");
                    });
            } else {
                Swal.fire({
                    icon: 'error',
                    text: "Erro!"
                });
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                text: err.response.data.message,
            });
        }
    }
};

export default FormEventos;
