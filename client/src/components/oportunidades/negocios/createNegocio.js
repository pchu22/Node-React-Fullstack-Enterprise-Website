import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../../assets/logo.png'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com";

export default function CreateVaga() {
  const [email, setEmail] = useState("");
  const [telemovel, setTelemovel] = useState("");
  const [orcamento, setOrcamento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [user, setUser] = useState(null);
  const [area, setArea] = useState(null);
  const [dataArea, setDataArea] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    setUser(userId);

    const urlArea = baseURL + "/area-negocio/list";
    axios.get(urlArea)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setDataArea(data);
        } else {
          alert("Error Web Service");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error: " + err);
      });

  }, []);

  function LoadAreas() {
    return dataArea.map((data, index) => {
      return <option key={index} value={data.areaNegocioId}>{data.areaNegocioNome}</option>;
    });
  }

  function SendSave(event) {
    event.preventDefault();

    if (email.trim() === "" || telemovel.trim() === "" || orcamento.trim() === "" || descricao.trim() === "" || user === null || area === null) {
      Swal.fire("Existem campos são de preenchimento obrigatório que estão em branco!");
    } else if (!/^\d{9}$/.test(telemovel) && !/^\d{10}$/.test(telemovel)) {
      Swal.fire("Tem de inserir um número de telemóvel ou de telefone fixo!");
    } else {
      const url = baseURL + "/negocio/create";
      const datapost = {
        email: email,
        telemovel: telemovel,
        orcamento: orcamento,
        descricao: descricao,
        userId: user,
        areaNegocioId: area
      };

      axios.post(url, datapost)
        .then(res => {
          if (res.data.success === true) {
            alert(res.data.message);
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
                <label htmlFor="inputEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="inputEmail"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div class="textarea-container">
                <label htmlFor="inputTel">Telemóvel</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Telemóvel"
                  id="inputTel"
                  value={telemovel}
                  onChange={(event) => setTelemovel(event.target.value)}
                />
              </div>
              <div class="textarea-container">
                <label htmlFor="inputOrcamento">Orçamento</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Orçamento"
                  id="inputOrcamento"
                  value={orcamento}
                  onChange={(event) => setOrcamento(event.target.value)}
                />
              </div>
              <div class="textarea-container">
                <label htmlFor="inputDesc">Descrição</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Descrição"
                  id="inputDesc"
                  value={descricao}
                  onChange={(event) => setDescricao(event.target.value)}
                />
              </div>
              <div class="textarea-container">
                <label htmlFor="inputTipo">Área</label>
                <select
                  type="text"
                  className="form-control"
                  placeholder="Tipo de Ideia"
                  id="inputTipo"
                  onChange={(event) => setArea(event.target.value)}
                >
                  <option>Selecione uma Área</option>
                  {LoadAreas()}
                </select>
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