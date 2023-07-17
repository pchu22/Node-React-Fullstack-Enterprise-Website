import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import logo from '../../assets/logo.png'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

const FormBeneficios = () => {
    const [areas, setAreas] = useState("")
    const [nome, setNome] = useState("");
    const [isDataLoaded, setIsDataLoaded] = useState(false);


    const navigate = useNavigate();
    const { areaNegocioId } = useParams();

    useEffect(() => {
        const url = baseURL + "area-negocio/get/" + areaNegocioId;
        axios.get(url)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    console.log(data);
                    setAreas(data);
                    setNome(data.areaNegocioNome);
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
                        <form onSubmit={updateAreaNegocio}>
                            <div className="textarea-container">
                                <label htmlFor="inputNome">Área de Negócio</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nome"
                                    id="inputNome"
                                    value={isDataLoaded ? nome : ''}
                                    onChange={(event) => setNome(event.target.value)} />
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
                                        onClick={() => navigate('/area-negocio')}
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

    async function updateAreaNegocio(event) {
        event.preventDefault();

        try {
            const url = baseURL + "area-negocio/update/" + areaNegocioId;
            const datapost = { areaNegocioNome: nome };

            const response = await axios.put(url, datapost);
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    text: response.data.message
                })
                    .then(() => {
                        navigate("/area-negocio");
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

export default FormBeneficios;
