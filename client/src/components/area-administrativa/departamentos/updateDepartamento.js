import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import logo from '../../../assets/logo.png'
import '.././style.css'

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
            }).catch((err) => {
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
                        <form onSubmit={updateDepartamento}>
                            <div className="textarea-container">
                                <label htmlFor="inputNomeDepartamento">Nome do Departamento</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputNomeDepartamento"
                                    placeholder="Nome"
                                    value={isDataLoaded ? departamentoNome : ''}
                                    onChange={(event) => setDepartamentoNome(event.target.value)}
                                />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputDescricao">Descrição</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="inputDescricao"
                                    placeholder="Email"
                                    value={isDataLoaded ? descricao : ''}
                                    onChange={(event) => setDescricao(event.target.value)}
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
                                        onClick={() => navigate('/area-administrativa')}
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


    async function updateDepartamento(event) {
        event.preventDefault();

        if (!departamentoNome || !descricao) {
            Swal.fire({
                icon: 'error',
                text: "Existem campos de preenchimento obrigatório que se encontram por preencher!",
            });
            return;
        }

        try {
            const url = baseURL + "departamento/update/" + departamentoId;
            const datapost = {
                departamentoNome: departamentoNome,
                descricao: descricao,
            };

            const response = await axios.put(url, datapost);
            if (response.data.success === true) {
                Swal.fire({
                    icon: 'success',
                    title: "Departamento alterado com sucesso!",
                })
                .then(() => {
                    navigate("/area-administrativa");
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "Erro ao efetuar a atualização do departamento!",
                });
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: err.response.data.message,
            });
        }
    }
}

export default FormDepartamentos;