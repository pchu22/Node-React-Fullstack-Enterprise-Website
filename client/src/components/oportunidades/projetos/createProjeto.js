import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../../assets/logo.png'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com";

export default function CreateVaga() {
  const [projetoNome, setProjetoNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [orcamento, setOrcamento] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [user, setUser] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [dataTipo, setDataTipo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    setUser(userId);

    const urlTipo = baseURL + "/tipo-projeto/list";
    axios.get(urlTipo)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setDataTipo(data);
        } else {
          alert("Error Web Service");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error: " + err);
      });

  }, []);

  function LoadTipos() {
    return dataTipo.map((data, index) => {
      return <option key={index} value={data.tipoProjetoId}>{data.tipoProjetoNome}</option>;
    });
  }

  function SendSave(event) {
    event.preventDefault();

    if (projetoNome.trim() === "" || descricao.trim() === "" || orcamento.trim() === "" || prioridade.trim() === "" || user === null || tipo === null) {
      Swal.fire("Existem campos são de preenchimento obrigatório que estão em branco!");
    } else {
      const url = baseURL + "/projeto/create";
      const datapost = {
        projetoNome: projetoNome,
        descricao: descricao,
        orcamento: orcamento,
        prioridade: prioridade,
        userId: user,
        tipoProjetoId: tipo
      };

      axios.post(url, datapost)
        .then(res => {
          if (res.data.success === true) {
            alert(res.data.message);
            navigate('/oportunidade');
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
              <div class="textarea-container">
                <label htmlFor="inputNome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome"
                  id="inputNome"
                  value={projetoNome}
                  onChange={(event) => setProjetoNome(event.target.value)}
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
                <label htmlFor="inputPrioridade">Prioridade</label>
                <select
                  type="text"
                  className="form-control"
                  id="inputPrioridade"
                  onChange={(event) => setPrioridade(event.target.value)}
                >
                  <option defaultValue>Selecione a Prioridade</option>
                  <option value="1">Urgente</option>
                  <option value="2">Normal</option>
                  <option value="3">Pouco Urgente</option>
                </select>
              </div>
              <div class="textarea-container">
                <label htmlFor="inputTipo">Tipo</label>
                <select
                  type="text"
                  className="form-control"
                  id="inputTipo"
                  onChange={(event) => setTipo(event.target.value)}
                >
                  <option defaultValue>Selecione o Tipo</option>
                  {LoadTipos()}
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