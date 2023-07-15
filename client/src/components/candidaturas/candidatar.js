import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import './candidaturas.css'
import logo from '../../assets/logo.png'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com";

export default function Candidatar() {
    const [CV, setCV] = useState(null);
    const { vagaId } = useParams();
    const navigate = useNavigate();

    function SendSave(event) {
        event.preventDefault();

        if (!CV) {
            Swal.fire({
                icon: 'warning',
                title: 'O CV é um campo de preenchimento obrogatório!',
            });
            return;
        }

        const url = `${baseURL}/candidatura/create`;
        const userId = localStorage.getItem('userId');
        const datapost = {
            cv: CV,
            userId: userId,
            vagaId: vagaId,
        };

        axios.post(url, datapost)
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: res.data.message,
                    }).then(() => navigate('/vaga'));
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: res.data.message,
                    });
                }
            }).catch(err => {
                console.log("Error: ", err);
                if (err.response && err.response.status === 400) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Já se candidatou a esta vaga',
                    });
                    navigate("/vaga");
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: `Error: ${err}`,
                    });
                }
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
                                <div className="btn-group">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-success">
                                        <span className="bi bi-check" />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger cancel-btn"
                                        onClick={() => navigate('/vaga')}
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
