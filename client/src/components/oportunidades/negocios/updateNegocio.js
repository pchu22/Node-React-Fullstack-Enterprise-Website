import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import logo from '../../../assets/logo.png';
import '../oportunidades.css'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

const UpdateNegocio = () => {
  const [negocio, setNegocio] = useState(null);
  const [email, setEmail] = useState("");
  const [telemovel, setTelemovel] = useState("");
  const [orcamento, setOrcamento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [area, setArea] = useState(null);
  const [dataArea, setDataArea] = useState([]);

  const navigate = useNavigate();
  const { negocioId } = useParams();

  useEffect(() => {
    const url = baseURL + "negocio/get/" + negocioId;
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setNegocio(data);
          setEmail(data.email);
          setTelemovel(data.telemovel);
          setOrcamento(data.orcamento);
          setDescricao(data.descricao);
          if (data.area) {
            setArea(data.area.areaNegocioId);
          } else {
            setArea("");
          }
        } else {
          alert("Error Web service");
        }
      })
      .catch((err) => {
        alert("Error server: " + err);
      });

      const urlArea = baseURL + "area-negocio/list";
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
  }, [negocioId]);

  async function updateNegocio(event) {
    event.preventDefault();
    if (!area) {
        Swal.fire({
          title: "Por favor, selecione uma área!",
        });
        return;
      }

    try {
      const url = baseURL + "negocio/update/" + negocioId;
      const datapost = {
        email: email,
        telemovel: telemovel,
        orcamento: orcamento,
        descricao: descricao,
        areaNegocioId: area
      };

      const response = await axios.put(url, datapost);

      if (response.data.success) {
        Swal.fire({
          title: "Negócio alterado com sucesso!"
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

  if (!negocio) {
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
            <form onSubmit={updateNegocio}>
            <div class="textarea-container">
                <label htmlFor="inputEmail" style={{ marginRight: '10px' }}>Email</label>
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
                <label htmlFor="inputTel" style={{ marginRight: '10px' }}>Telemóvel</label>
                <input
                  type="tek"
                  className="form-control"
                  placeholder="Telemóvel"
                  id="inputTel"
                  value={telemovel}
                  onChange={(event) => setTelemovel(event.target.value)}
                />
              </div>
              <div class="textarea-container">
                <label htmlFor="inputOrcamento" style={{ marginRight: '10px' }}>Orçamento</label>
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
              <div class="textarea-container">
                <label htmlFor="inputDesc" style={{ marginRight: '10px' }}>Área</label>
                <select
                  type="text"
                  className="form-control"
                  placeholder="Descrição"
                  id="inputDesc"
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                >
                    <option>Selecione uma Área</option>
                    <FillArea />
                </select>
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

  function FillArea() {
    return dataArea.map((data, index) => {
      return (
        <option key={index} value={data.areaNegocioId}>
          {data.areaNegocioNome}
        </option>
      );
    });
  }

};

export default UpdateNegocio;
