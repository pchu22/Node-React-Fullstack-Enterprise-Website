import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../assets/logo.png'
import './beneficios.css'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com";

export default function CreateBeneficio() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");

  const navigate = useNavigate();

  function SendSave(event) {
    event.preventDefault();

    if (!titulo || !descricao || !tipo) {
      Swal.fire("Todos os campos são de preenchimento obrigatório");
    } else {
      const url = baseURL + "/beneficio/create";
      const datapost = {
        titulo: titulo,
        descricao: descricao,
        tipo: tipo
      };

      axios.post(url, datapost)
        .then(res => {
          if (res.data.success) {
            Swal.fire(res.data.message);
            navigate('/beneficio');
          } else {
            Swal.fire(res.data.message);
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
            <div className="textarea-container">
                <label htmlFor="inputTitulo">Título</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Título"
                  id="inputTitulo"
                  value={titulo}
                  onChange={(event) => setTitulo(event.target.value)}
                />
              </div>
              <div className="textarea-container">
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
              <div className="textarea-container">
                <label htmlFor="inputTipo">Tipo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tipo de benefício"
                  id="inputTipo"
                  value={tipo}
                  onChange={(event) => setTipo(event.target.value)}
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
                    onClick={() => navigate('/beneficio')}
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
