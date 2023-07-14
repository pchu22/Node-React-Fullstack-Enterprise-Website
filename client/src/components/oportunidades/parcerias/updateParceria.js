import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import logo from '../../../assets/logo.png';
import '../oportunidades.css'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

const UpdateParceria = () => {
  const [parceria, setParceria] = useState(null);
  const [nomeParceiro, setNomeParceiro] = useState("");
  const [email, setEmail] = useState("");
  const [telemovel, setTelemovel] = useState("");;

  const navigate = useNavigate();
  const { parceriaId } = useParams();

  useEffect(() => {
    const url = baseURL + "parceria/get/" + parceriaId;
    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setParceria(data);
          setNomeParceiro(data.nomeParceiro)
          setEmail(data.email);
          setTelemovel(data.telemovel);
        } else {
          alert("Error Web service");
        }
      })
      .catch((err) => {
        alert("Error server: " + err);
      });
  }, [parceriaId]);

  async function updateParceria(event) {
    event.preventDefault();

    try {
      const url = baseURL + "parceria/update/" + parceriaId;
      const datapost = {
        nomeParceiro: nomeParceiro,
        email: email,
        telemovel: telemovel
      };

      const response = await axios.put(url, datapost);

      if (response.data.success) {
        Swal.fire({
          title: "Parceria alterada com sucesso!"
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

  if (!parceria) {
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
            <form onSubmit={updateParceria}>
            <div class="textarea-container">
                <label htmlFor="inputNome" style={{ marginRight: '10px' }}>Nome</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome"
                  id="inputNome"
                  value={nomeParceiro}
                  onChange={(event) => setNomeParceiro(event.target.value)}
                />
              </div>
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

export default UpdateParceria;
