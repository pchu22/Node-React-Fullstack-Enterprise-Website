import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../../assets/logo.png'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com";

export default function CreateInvestimento() {
  const [montante, setMontante] = useState("");
  const [descricao, setDescricao] = useState("");

  const navigate = useNavigate();

  function SendSave(event) {
    event.preventDefault();

    if (montante.trim() === "" || descricao.trim() === "") {
      Swal.fire("Existem campos são de preenchimento obrigatório que estão em branco!");
    } else {
      const url = baseURL + "/investimento/create";
      const userId = localStorage.getItem('userId');
      const datapost = {
        montante: montante,
        userId: userId,
        descricao: descricao,
      };

      axios.post(url, datapost)
        .then(res => {
          if (res.data.success) {
            Swal.fire(res.data.message);
            navigate('/oportunidade');
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
    <div className='wrapper'>
      <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
        <div className="card">
          <div className="header-image">
            <img src={logo} alt="Logo-Softinsa" />
          </div>
          <div className="card-body">
            <form onSubmit={SendSave}>
              <div class="textarea-container">
                <label htmlFor="inputMontante">Montante</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Montante"
                  id="inputMontante"
                  value={montante}
                  onChange={(event) => setMontante(event.target.value)}
                />
              </div>
              <div class="textarea-container">
                <label htmlFor="inputDesc">Descrição</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Descrição"
                  id="inputDesc"
                  value={descricao}
                  onChange={(event) => setDescricao(event.target.value)}
                />
              </div>
              <div className="btn-wrapper">
                <div className="btn-group">
                  <button
                    type="submit"
                    className="btn btn-outline-success">
                    <span className="bi bi-check-lg" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger cancel-btn"
                    onClick={() => navigate('/oportunidade')}
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