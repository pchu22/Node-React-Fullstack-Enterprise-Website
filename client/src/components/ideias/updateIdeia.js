import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import logo from '../../assets/logo.png';

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

const FormCandidaturas = () => {
  const [ideia, setIdeia] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");

  const navigate = useNavigate();
  const { ideiaId } = useParams();

  useEffect(() => {
    const url = baseURL + "ideia/get/" + ideiaId;
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setIdeia(data);
          setTitulo(data.titulo);
          setDescricao(data.descricao);
          setTipo(data.tipo);
        } else {
          alert("Error Web service");
        }
      })
      .catch((err) => {
        alert("Error server: " + err);
      });
  }, [ideiaId]);

  async function updateIdeia(event) {
    event.preventDefault();

    try {
      const url = baseURL + "ideia/update/" + ideiaId;
      const datapost = {
        titulo: titulo,
        descricao: descricao,
        tipo: tipo
      };

      const response = await axios.put(url, datapost);

      if (response.data.success) {
        Swal.fire({
          title: "Ideia alterada com sucesso!"
        }).then(() => {
          navigate("/ideia");
        });
      } else {
        Swal.fire({
          title: "Erro!"
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: err.response.data.message
      });
    }
  }

  if (!ideia) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wrapper">
      <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
        <div className="card">
          <div className="header-image">
            <img src={logo} alt="Logo-Softinsa" />
          </div>
          <div className="card-body">
            <form onSubmit={updateIdeia}>
              <div className="form-group">
                <label htmlFor="inputTitulo" style={{ marginRight: '10px' }}>Título:</label>
                <input
                  type="text"
                  className="form-control-file"
                  placeholder="Título"
                  id="inputTitulo"
                  value={titulo}
                  onChange={(event) => setTitulo(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputDesc" style={{ marginRight: '10px' }}>Descrição:</label>
                <input
                  type="text"
                  className="form-control-file"
                  placeholder="Descrição"
                  id="inputDesc"
                  value={descricao}
                  onChange={(event) => setDescricao(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputTipo" style={{ marginRight: '10px' }}>Tipo de Ideia:</label>
                <input
                  type="text"
                  className="form-control-file"
                  placeholder="Tipo de Ideia"
                  id="inputTipo"
                  value={tipo}
                  onChange={(event) => setTipo(event.target.value)}
                />
              </div>
              <div className="btn-wrapper">
                <button type="submit" className="btn btn-outline-success">Atualizar Ideia</button>
                <button type="button" className="btn btn-outline-danger cancel-btn" onClick={() => navigate('/candidatura')}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCandidaturas;
