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
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#D9D9D9' }}>
            <section className="h-100">
                <div className="container h-100">
                    <div className="row justify-content-sm-center h-100">
                        <div className="col-md-8 col-sm-9">
                            <div className="card shadow-lg">
                                <div className="form-row justify-content-center">
                                    <div className="text-center mb-4">
                                        <img src={logo} alt="Logo Softinsa" style={{ maxWidth: '100%', height: 'auto' }} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputTitulo">Título</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Título"
                                            id="inputTitulo"
                                            value={isDataLoaded ? titulo : ''}
                                            onChange={(event) => setTitulo(event.target.value)} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputDesc">Descrição</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Descrição"
                                            id="inputDesc"
                                            value={isDataLoaded ? descricao : ''}
                                            onChange={(event) => setDescricao(event.target.value)} />
                                    </div>
                                </div>
                                <div className="form-row justify-content-center">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputTipo">Tipo</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputTipo"
                                            placeholder="Tipo"
                                            value={isDataLoaded ? tipo : ''}
                                            onChange={(event) => setTipo(event.target.value)} />
                                    </div>
                                </div>
                                <div className="form-row justify-content-center">
                                    <div className="form-group col-md-6">
                                        <button type="button" className="btn btn-success" onClick={updateBeneficio}>Atualizar Vaga</button>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <button type="button" className="btn btn-danger" onClick={() => navigate("/vaga")}>Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            {/*<div className="position-absolute end-0 top-0 rounded-circle m-5">
                <button type="button" className="btn btn-primary btn-lg" aria-expanded="false" onClick={goBack}>
                    <i className="bi bi-arrow-left"></i>
                </button>
            </div>*/}
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
 