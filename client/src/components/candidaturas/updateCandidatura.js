import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import logo from '../../assets/logo.png'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

const FormCandidaturas = () => {
    const [candidatura, setCandidatura] = useState("");
    const [CV, setCV] = useState("");

    const navigate = useNavigate();
    const { candidaturaId } = useParams();

    useEffect(() => {
            const url = baseURL + "candidatura/get/" + candidaturaId;
            axios.get(url)
                .then((res) => {
                    if (res.data.success) {
                        const data = res.data.data;
                        setCandidatura(data);
                        setCV(data.cv)
                    } else {
                        alert("Error Web service");
                    }
                }).catch((err) => {
                    alert("Error server: " + err);
                });
    }, []);

    return (
        <div className='wrapper'>
            <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                <div className="card">
                    <div className="header-image">
                        <img src={logo} alt="Logo-Softinsa" />
                    </div>
                    <div className="card-body">
                        <form onSubmit={updateCandidatura}>
                            <div className="form-group">
                                <label htmlFor="inputCV">Curriculum vitae</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="inputCV"
                                    accept=".pdf"
                                    onChange={(event) => setCV(event.target.files[0])}
                                />
                            </div>
                            <div className="btn-wrapper">
                                <button type="submit" className="btn btn-outline-success">Atualizar Candidatura</button>
                                <button type="button" className="btn btn-outline-danger cancel-btn" onClick={() => navigate('/candidatura')}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );


    async function updateCandidatura(event) {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('cv', CV);
    
        try {
            const url = baseURL + "candidatura/update/" + candidaturaId;
    
            const response = await axios.put(url, formData, {
            });
    
            if (response.data.success) {
                Swal.fire({
                    title: "Candidatura alterada com sucesso!",
                }).then(() => {
                    navigate("/candidatura");
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

export default FormCandidaturas;