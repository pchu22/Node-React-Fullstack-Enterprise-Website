import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import logo from '../../../assets/logo.png'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

const FormFiliais = () => {
    const [filial, setFilial] = useState("");
    const [filialNome, setFilialNome] = useState("");
    const [email, setEmail] = useState("");
    const [telemovel, setTelemovel] = useState("");
    const [morada, setMorada] = useState("");
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const navigate = useNavigate();
    const { filialId } = useParams();


    useEffect(() => {
        const url = baseURL + "filial/get/" + filialId;
        axios.get(url)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    console.log(data);
                    setFilial(data);
                    setFilialNome(data.filialNome);
                    setMorada(data.morada);
                    setTelemovel(data.telemovel);
                    setEmail(data.email);
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
                                        <h2 className="my-4">Atualizar filial</h2>
                                        <div className="form-row justify-content-center">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputNomeFilial">Nome da filial</label>
                                                <input
                                                type="text"
                                                className="form-control"
                                                id="inputNomeFilial"
                                                placeholder="Nome"
                                                value={isDataLoaded ? filialNome : ''}
                                                onChange={(event) => setFilialNome(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row justify-content-center">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="inputEmail"
                                                placeholder="Email"
                                                value={isDataLoaded ? email : ''}
                                                onChange={(event) => setEmail(event.target.value)}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputTelemovel">Telemovel</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="inputTelemovel"
                                                placeholder="Telemovel"
                                                value={isDataLoaded ? telemovel: ''}
                                                onChange={(event) => setTelemovel(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row justify-content-center">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputMorada">Morada</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputMorada"
                                                placeholder="Morada"
                                                value={isDataLoaded ? morada : ''}
                                                onChange={(event) => {setMorada(event.target.value);}}
                                            />
                                        </div>
                                        <div className="form-row justify-content-center">
                                            <div className="form-group col-md-6">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={updateFilial}
                                                >
                                                    Atualizar Filial
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


    async function updateFilial() {
        try {
            const url = baseURL + "filial/update/" + filialId;
            const datapost = {
                filialNome: filialNome,
                telemovel: telemovel,
                morada: morada,
                email: email
            };

            const response = await axios.put(url, datapost);
            if (response.data.success === true) {
                Swal.fire({
                title: "Filial alterada com sucesso!",
                }).then(() => {
                navigate("/filial");
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

export default FormFiliais;