import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import logo from '../../assets/logo.png'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

const FormBeneficios = () => {
    const [beneficios, setBeneficios] = useState("")
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("");
    const [isDataLoaded, setIsDataLoaded] = useState(false);


    const navigate = useNavigate();
    const { beneficioId } = useParams();

    useEffect(() => {
        const url = baseURL + "beneficio/get/" + beneficioId;
        axios.get(url)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    console.log(data);
                    setBeneficios(data);
                    setTitulo(data.titulo);
                    setDescricao(data.descricao);
                    setTipo(data.tipo);
                    setIsDataLoaded(true)
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
                                    value={isDataLoaded ? titulo : ''}
                                    onChange={(event) => setTitulo(event.target.value)} />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputDesc">Descrição</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Descrição"
                                    id="inputDesc"
                                    value={isDataLoaded ? descricao : ''}
                                    onChange={(event) => setDescricao(event.target.value)} />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputTipo">Tipo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputTipo"
                                    placeholder="Tipo"
                                    value={isDataLoaded ? tipo : ''}
                                    onChange={(event) => setTipo(event.target.value)} />
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
                                        onClick={() => navigate('/beneficio')}
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

    async function updateBeneficio() {
        try {
            const url = baseURL + "beneficio/update/" + beneficioId;
            const datapost = {
                titulo: titulo,
                descricao: descricao,
                tipo: tipo,
            };

            const response = await axios.put(url, datapost);
            if (response.data.success) {
                Swal.fire(response.data.message)
                    .then(() => {
                        navigate("/beneficio");
                    });
            } else {
                Swal.fire({
                    title: "Erro!",
                });
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                title: err.response.data.message,
            });
        }
    }
};

export default FormBeneficios;
