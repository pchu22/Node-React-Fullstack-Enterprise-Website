import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com";

export default function CreateVaga() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [habilitacoesMin, setHabilitacoesMin] = useState("");
  const [experienciaMin, setExperienciaMin] = useState("");
  const [remuneracao, setRemuneracao] = useState("");
  const [isInterna, setIsInterna] = useState(false);
  const [user, setUser] = useState(null);
  const [departamento, setDepartamento] = useState(null);
  const [filial, setFilial] = useState(null);
  const [dataDepartamento, setDataDepartamento] = useState([]);
  const [dataFilial, setDataFilial] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    setUser(userId);

    const urlDepartamento = baseURL + "/departamento/list";
    axios.get(urlDepartamento)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setDataDepartamento(data);
        } else {
          alert("Error Web Service");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error: " + err);
      });

    const urlFilial = baseURL + "/filial/list";
    axios.get(urlFilial)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setDataFilial(data);
        } else {
          alert("Error Web Service");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error: " + err);
      });
  }, []);

  function LoadDepartamento() {
    return dataDepartamento.map((data, index) => {
      return <option key={index} value={data.departamentoId}>{data.departamentoNome}</option>;
    });
  }

  function LoadFilial() {
    return dataFilial.map((data, index) => {
      return <option key={index} value={data.filialId}>{data.filialNome}</option>;
    });
  }
  function SendSave() {
    if (titulo.trim() === "" || descricao.trim() === "" || user === null || departamento === null || filial === null) {
      Swal.fire("Existem campos são de preenchimento obrigatório que estão em branco!");
    } else if (remuneracao <= 0) {
      Swal.fire("A remuneração não pode ser <= 0!");
    } else {
      const url = baseURL + "/vaga/create";
      const datapost = {
        titulo: titulo,
        descricao: descricao,
        habilitacoesMin: habilitacoesMin || "N/A",
        experienciaMin: experienciaMin || "N/A",
        remuneracao: remuneracao || "???",
        isInterna: isInterna,
        userId: user,
        departamentoId: departamento,
        filialId: filial
      };

      axios.post(url, datapost)
        .then(res => {
          if (res.data.success === true) {
            alert(res.data.message);
            navigate('/vaga');
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
          <label htmlFor="inputTitulo">Título</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título"
            id="inputTitulo"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)} />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputDesc">Descrição</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título"
            id="inputDesc"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)} />
        </div>
      </div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="inputHabMin">Habilitações Mínimas</label>
          <input
            type="text"
            className="form-control"
            id="inputHabMin"
            placeholder="Habilitações Mínimas"
            value={habilitacoesMin}
            onChange={(event) => setHabilitacoesMin(event.target.value)} />
        </div>
      </div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="inputXPMin">Experiência Mínima</label>
          <input
            type="text"
            className="form-control"
            id="inputXPMin"
            placeholder="Experiência Mínima"
            value={experienciaMin}
            onChange={(event) => setExperienciaMin(event.target.value)} />
        </div>
        <div className="form-row justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="inputRemuneracao">Remuneração</label>
            <input
              type="number"
              className="form-control"
              id="inputRemuneracao"
              placeholder="Remuneração"
              value={remuneracao}
              onChange={(event) => setRemuneracao(event.target.value)} />
          </div>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputIsInterna">Interna?</label>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="inputIsInterna"
              checked={isInterna}
              onChange={() => setIsInterna(!isInterna)}
            />
            <label className="form-check-label" htmlFor="inputIsColaborador">
              {isInterna ? "Sim" : "Não"}
            </label>
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputDepartamento">Departamento</label>
          <select id="inputDepartamento" className="form-control" onChange={event => setDepartamento(event.target.value)}>
            <option defaultValue>Escolha um departamento...</option>
            {LoadDepartamento()}
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputFilial">Filial</label>
          <select id="inputFilial" className="form-control" onChange={event => setFilial(event.target.value)}>
            <option defaultValue>Escolha uma filial...</option>
            {LoadFilial()}
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-2" onClick={SendSave}>Criar utilizador</button>
    </div>
  );
}