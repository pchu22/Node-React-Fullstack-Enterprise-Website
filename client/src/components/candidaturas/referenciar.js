import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import './candidaturas.css'
import logo from '../../assets/logo.png'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com";

export default function Candidatar() {
  const [CV, setCV] = useState(null);
  const [userReference, setUserReference] = useState('');
  const [users, setUsers] = useState([]);
  const { vagaId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers() {
    const url = baseURL + '/user/list';

    axios.get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          data.sort((a, b) => a.userId - b.userId);
          setUsers(data);
        } else {
          Swal.fire('Error Web Service', 'Lista de utilizadores indisponível!', 'error');
        }
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  }

  function SendSave(event) {
    event.preventDefault();

    if (!userReference) {
      Swal.fire({
        icon: 'warning',
        title: 'Por favor, selecione o utilizador que quer referênciar!',
      });
      return;
    }

    const url = `${baseURL}/candidatura/create`;
    const datapost = {
      cv: CV,
      userId: userReference,
      vagaId: vagaId,
    };

    axios.post(url, datapost)
      .then(res => {
        console.log(res.data);
        if (res.data.success) {
          Swal.fire({
            icon: 'success',
            title: res.data.message,
          }).then(() => navigate('/vaga'));
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: res.data.message,
          });
        }
      })
      .catch(err => {
        console.log("Error: ", err);
        if (err.response && err.response.status === 400 && err.response.data.message === "Você já se candidatou para essa vaga!") {
          Swal.fire({
            icon: 'warning',
            title: 'Já se candidatou a esta vaga',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: `Error: ${err}`,
          });
        }
      });
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
              <div className="form-group">
                <label htmlFor="userReference">Utilizador de referência</label>
                <select
                  className="form-control"
                  id="userReference"
                  value={userReference}
                  onChange={(event) => setUserReference(event.target.value)}
                >
                  <option value="">Selecione o utilizador</option>
                  <FillUser />
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="inputCV">Curriculum vitae</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="inputCV"
                  accept=".pdf"
                  onChange={(event) => setCV(event.target.files[0])}
                />
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
                                        onClick={() => navigate('/vaga')}
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

  function FillUser() {
    return users.map((data, index) => {
      return (
        <option key={index} value={data.userId}>
          {data.primeiroNome + ' ' + data.ultimoNome}
        </option>
      );
    });
  }
}
