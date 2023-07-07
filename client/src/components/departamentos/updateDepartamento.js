import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import logo from '../../assets/logo.png'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

const FormDepartamentos = () => {
    const [departamento, setDepartamento] = useState("");
    const [departamentoNome, setDepartamentoNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const navigate = useNavigate();
    const { departamentoId } = useParams();


    useEffect(() => {
        const url = baseURL + "departamento/get/" + departamentoId;
        axios.get(url)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    console.log(data);
                    setDepartamento(data);
                    setDepartamentoNome(data.departamentoNome);
                    setDescricao(data.descricao);
                    setIsDataLoaded(true);
                } else {
                    alert("Error Web service");
                }
        }) .catch((err) => {
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
                                <div className="card-body py-4 px-5">
                                    <div className="text-center mb-4">
                                        <img src={logo} alt="Logo Softinsa" style={{ maxWidth: '100%', height: 'auto' }} />
                                    </div>
                                    <div>
                                        <h2 className="my-4">Atualizar departamento</h2>
                                        <div className="form-row justify-content-center">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputNomeDepartamento">Nome do departamento</label>
                                                <input
                                                type="text"
                                                className="form-control"
                                                id="inputNomeDepartamento"
                                                placeholder="Nome"
                                                value={isDataLoaded ? departamentoNome : ''}
                                                onChange={(event) => setDepartamentoNome(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row justify-content-center">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputDescricao">descricao</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputDescricao"
                                                placeholder="Email"
                                                value={isDataLoaded ? descricao : ''}
                                                onChange={(event) => setDescricao(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row justify-content-center">
                                        <div className="form-row justify-content-center">
                                            <div className="form-group col-md-6">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={updateDepartamento}
                                                >
                                                    Atualizar Departamento
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<div className="position-absolute end-0 top-0 rounded-circle m-5">
                <button type="button" className="btn btn-primary btn-lg" aria-expanded="false" onClick={goBack}>
                    <i className="bi bi-arrow-left"></i>
                </button>
            </div>*/}
        </div>
    );


    async function updateDepartamento() {
        try {
            const url = baseURL + "departamento/update/" + departamentoId;
            const datapost = {
                departamentoNome: departamentoNome,
                descricao: descricao,
            };

            const response = await axios.put(url, datapost);
            if (response.data.success === true) {
                Swal.fire({
                title: "Departamento alterado com sucesso!",
                }).then(() => {
                navigate("/departamento");
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
}

export default FormDepartamentos;