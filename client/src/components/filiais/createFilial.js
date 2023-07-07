import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

export default function CreateUser() {
    const [filialNome, setFilialNome] = useState("");
    const [email, setEmail] = useState("");
    const [telemovel, setTelemovel] = useState("");
    const [morada, setMorada] = useState("");  

    const navigate = useNavigate();

    function SendSave() {
      if (filialNome.trim() === "" || email.trim() === "" || telemovel.trim() === "" || morada.trim() === "") {
        Swal.fire('Todos os campos são de preenchimento obrigatório!');
      } else {
        const url = baseURL + "filial/create";
        const datapost = {
            filialNome: filialNome,
            email: email,
            telemovel: telemovel,
            morada: morada,
        };

        axios.post(url, datapost)
            .then(res => {
                if (res.data.success === true) {
                    alert(res.data.message);
                    navigate('/filial');
                } else {
                    alert(res.data.message);
                }
            })
            .catch(err => {
                console.log("Error: ", err);
                alert("Error 34: " + err);
            });
        }
    }

    return (
        <div>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label htmlFor="inputFNome">Nome da filial</label>
                    <input type="text" className="form-control" placeholder="Nome da filial"
                        value={filialNome} onChange={event => setFilialNome(event.target.value)} />
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
                    value={email}
                    onChange={(value) => setEmail(value.target.value)}
                />
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputTelemovel">Telemovel</label>
                <input
                    type="tel"
                    className="form-control"
                    id="inputTelemovel"
                    placeholder="Telemovel"
                    value={telemovel}
                    onChange={(value) => setTelemovel(value.target.value)}
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
                        value={morada}
                        onChange={(value) => setMorada(value.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2" onClick={SendSave}>Criar filial</button>
            </div>
        </div>
    );
}