import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com";

export default function CreateDepartamento() {
    const [departamentoNome, setDepartamentoNome] = useState("");
    const [descricao, setDescricao] = useState("");

    const navigate = useNavigate();

    function SendSave() {
      if (departamentoNome.trim() === "" || descricao.trim() === "") {
        Swal.fire('Todos os campos são de preenchimento obrigatório!');
      } else {
        const url = baseURL + "/departamento/create";
        const datapost = {
            departamentoNome: departamentoNome,
            descricao: descricao,
        };

        axios.post(url, datapost)
            .then(res => {
                if (res.data.success === true) {
                    alert(res.data.message);
                    navigate('/departamento');
                } else {
                    alert(res.data.message);
                }
            }) .catch(err => {
                console.log("Error: ", err);
                alert("Error 34: " + err);
            });
        }
    }

    return (
        <div>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label htmlFor="inputDNome">Nome do departamento</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nome"
                        id="inputDNome"
                        value={departamentoNome} 
                        onChange={(event) => setDepartamentoNome(event.target.value)} />
                </div>
            </div>
            <div className="form-row justify-content-center">
                <div className="form-group col-md-6">
                    <label htmlFor="inputDesc">Descrição</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputDesc"
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(event) => setDescricao(event.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2" onClick={SendSave}>Criar departamento</button>
            </div>
        </div>
    );
}