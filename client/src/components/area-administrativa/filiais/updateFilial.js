import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import logo from '../../../assets/logo.png'
import '.././style.css'

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
                        <form onSubmit={updateFilial}>
                            <div className="textarea-container">
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
                            <div className="textarea-container">
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
                            <div className="textarea-container">
                                <label htmlFor="inputTelemovel">Telemovel</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="inputTelemovel"
                                    placeholder="Telemovel"
                                    value={isDataLoaded ? telemovel : ''}
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
                                    value={isDataLoaded ? morada : ''}
                                    onChange={(event) => { setMorada(event.target.value); }}
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

    async function updateFilial(event) {
        event.preventDefault();

        if (!filialNome || !email || !telemovel || !morada) {
            Swal.fire({
                icon: 'error',
                text: "Existem campos de preenchimento obrigatório que se encontram por preencher!",
            });
            return;
        }
        
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
                    icon: 'success',
                    title: "Filial alterada com sucesso!",
                }).then(() => {
                    navigate("/area-administrativa");
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "Erro ao efetuar a atualização da filial!",
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