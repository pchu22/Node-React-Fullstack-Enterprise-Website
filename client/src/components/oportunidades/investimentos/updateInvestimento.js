import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import logo from '../../../assets/logo.png';
import '../oportunidades.css'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

const UpdateInvestimento = () => {
  const [investimento, setInvestimento] = useState(null);
  const [montante, setMontante] = useState("");
  const [descricao, setDescricao] = useState("");

  const navigate = useNavigate();
  const { investimentoId } = useParams();

  useEffect(() => {
    const url = baseURL + "investimento/get/" + investimentoId;
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setInvestimento(data);
          setMontante(data.montante);
          setDescricao(data.descricao);
        } else {
          alert("Error Web service");
        }
      })
      .catch((err) => {
        alert("Error server: " + err);
      });
  }, [investimentoId]);

  async function updateInvestimento(event) {
    event.preventDefault();

    try {
      const url = baseURL + "investimento/update/" + investimentoId;
      const datapost = {
        montante: montante,
        descricao: descricao,
      };

      const response = await axios.put(url, datapost);

      if (response.data.success) {
        Swal.fire({
          title: "Investimento alterado com sucesso!"
        }).then(() => {
          navigate("/oportunidade");
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

  if (!investimento) {
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
            <form onSubmit={updateInvestimento}>
              <div className="form-group">
                <label htmlFor="inputMontante" style={{ marginRight: '10px' }}>Montante</label>
                <input
                  type="number"
                  className="form-control-file"
                  placeholder="Montante"
                  id="inputMontante"
                  value={montante}
                  onChange={(event) => setMontante(event.target.value)}
                />
              </div>
              <div class="textarea-container">
                <label htmlFor="inputDesc" style={{ marginRight: '10px' }}>Descrição</label>
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
                        <span className="bi bi-check"/>
                </button>
                <button 
                    type="button" 
                    className="btn btn-outline-danger cancel-btn" 
                    onClick={() => navigate('/oportunidade')} 
                    style={{marginLeft:'10px'}}>
                        <span className="bi bi-x-octagon-fill"/>
                    </button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateInvestimento;
