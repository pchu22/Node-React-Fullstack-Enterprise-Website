import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import logo from '../../../assets/logo.png'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

const FormUsers = () => {
  const [user, setUser] = useState("");
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [ultimoNome, setUltimoNome] = useState("");
  const [numeroFuncionario, setNumeroFuncionario] = useState("");
  const [email, setEmail] = useState("");
  const [salario, setSalario] = useState("");
  const [dataContratacao, setDataContratacao] = useState("");
  const [cargo, setCargo] = useState(null);
  const [departamento, setDepartamento] = useState(null);
  const [filial, setFilial] = useState(null);
  const [dataCargo, setDataCargo] = useState([]);
  const [dataDepartamento, setDataDepartamento] = useState([]);
  const [dataFilial, setDataFilial] = useState([]);
  const [isColaborador, setIsColaborador] = useState(false);
  const [isBallMoving, setIsBallMoving] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    loadUserInfo();
    loadCargo();
    loadFilial();
    loadDepartamento();
  }, []);

  function loadUserInfo() {
    const url = baseURL + "user/get/" + userId;
    axios.get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          console.log(data);
          setUser(data);
          setPrimeiroNome(data.primeiroNome);
          setUltimoNome(data.ultimoNome);
          setNumeroFuncionario(data.numeroFuncionario);
          setEmail(data.email);
          setSalario(data.salario);
          setIsColaborador(data.isColaborador);
          if (data.cargo) {
            setCargo(data.cargo.cargoId);
          } else {
            setCargo("");
          }
          if (data.departamento) {
            setDepartamento(data.departamento.departamentoId);
          } else {
            setDepartamento("");
          }
          if (data.filial) {
            setFilial(data.filial.filialId);
          } else {
            setFilial("");
          }
          setIsDataLoaded(true);
        } else {
          alert("Error Web service");
        }
      }).catch((err) => {
        alert("Error server: " + err);
      });
  }

  function loadCargo() {
    const urlCargo = baseURL + "cargo/list";
    axios.get(urlCargo)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setDataCargo(data);
        } else {
          alert("Error Web Service");
        }
      }).catch((err) => {
        console.error(err);
        alert("Error: " + err);
      });
  }
  
  function loadFilial() {
    const urlFilial = baseURL + "filial/list";
    axios.get(urlFilial)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setDataFilial(data);
        } else {
          alert("Error Web Service");
        }
      }).catch((err) => {
        console.error(err);
        alert("Error: " + err);
      });
  }

  function loadDepartamento() {
    const urlDepartamento = baseURL + "departamento/list";
    axios.get(urlDepartamento)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setDataDepartamento(data);
        } else {
          alert("Error Web Service");
        }
      }).catch((err) => {
        console.error(err);
        alert("Error: " + err);
      });
  }
  
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#D9D9D9' }}>
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-md-8 col-sm-9">
              <div className="card shadow-lg">
                <div className="card-body py-4 px-5">
                  <div className="text-center mb-4">
                    <img src={logo} alt="Logo Softinsa" style={{ maxWidth: '100%', height: 'auto' }} />
                  </div>
                  <div>
                  <div className="textarea-container">
                        <label htmlFor="inputPNome">Primeiro Nome</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputPNome"
                          placeholder="Primeiro Nome"
                          value={isDataLoaded ? primeiroNome : ''}
                          onChange={(event) => setPrimeiroNome(event.target.value)}
                        />
                      </div>
                      <div className="textarea-container">
                        <label htmlFor="inputUNome">Último Nome</label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputUNome"
                          placeholder="Ultimo Nome"
                          value={isDataLoaded ? ultimoNome : ''}
                          onChange={(event) => setUltimoNome(event.target.value)}
                        />
                      </div>
                      <div className="textarea-container">
                        <label htmlFor="inputIsColaborador">É Colaborador?</label>
                        <div
                          className={`status-bar ${isColaborador ? "active" : "inactive"}`}
                          onClick={toggleUserStatus}
                        >
                          <div className={`status-ball ${isBallMoving ? "ball-moving" : ""}`}/>
                        </div>
                      </div>
                      <div className="textarea-container">
                        <label htmlFor="inputNFunc">Número de Funcionário</label>
                        <input
                          type="number"
                          className="form-control"
                          id="inputNFunc"
                          placeholder="Número de Funcionário"
                          value={isDataLoaded ? numeroFuncionario : ''}
                          onChange={(event) => setNumeroFuncionario(event.target.value)}
                          disabled={!isColaborador}
                        />
                      </div>
                      <div className="textarea-container">
                        <label htmlFor="inputEmail">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="inputEmail"
                          placeholder="Email"
                          value={isDataLoaded ? email : ''}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </div>
                      <div className="textarea-container">
                        <label htmlFor="inputSalario">Salário</label>
                        <input
                          type="number"
                          step=".01"
                          className="form-control"
                          id="inputSalario"
                          placeholder="Salário"
                          value={isDataLoaded ? salario : ''}
                          onChange={(event) => { setSalario(event.target.value); }}
                        />
                      </div>
                      <div className="textarea-container">
                        <label htmlFor="inputCargo">Cargo</label>
                        <select
                          id="inputCargo"
                          className="form-control"
                          value={isDataLoaded ? cargo : ''}
                          onChange={(event) => setCargo(parseInt(event.target.value))}
                        >
                          <option>Escolha um cargo:</option>
                          <FillCargo />
                        </select>
                      </div>
                      <div className="textarea-container">
                        <label htmlFor="inputDepartamento">Departamento</label>
                        <select
                          id="inputDepartamento"
                          className="form-control"
                          value={isDataLoaded ? departamento : ''}
                          onChange={(event) => setDepartamento(parseInt(event.target.value))}
                        >
                          <option>Escolha um departamento:</option>
                          <FillDepartamento />
                        </select>
                      </div>
                      <div className="textarea-container">
                        <label htmlFor="inputFilial">Filial</label>
                        <select
                          id="inputFilial"
                          className="form-control"
                          value={isDataLoaded ? filial : ''}
                          onChange={(event) => setFilial(parseInt(event.target.value))}
                        >
                          <option>Escolha uma filial:</option>
                          <FillFilial />
                        </select>
                      </div>
                    <div className="textarea-container">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={updateUser}
                        >
                          Atualizar Utilizador
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*<div className="position-absolute end-0 top-0 rounded-circle m-5">
        <button type="button" className="btn btn-primary btn-lg" aria-expanded="false" onClick={goBack}>
          <i className="bi bi-arrow-left"></i>
        </button>
      </div>*/}
    </div>
  );

  async function toggleUserStatus() {
    setIsBallMoving(true);
    const toggleIsColaborador = !isColaborador;
    setIsColaborador(toggleIsColaborador);

    if (toggleIsColaborador) {
      setDataContratacao(new Date());
    } else {
      setCargo(5);
      setNumeroFuncionario(null);
      setSalario(null)
    }

    const action = toggleIsColaborador
      ? "colaborador Softinsa"
      : "utilizador comum";
    Swal.fire({
      title: `O utilizador agora é um ${action}!`,
      icon: "success",
      timer: 2500,
      showConfirmButton: false,
    });
  }

  async function updateUser() {
    if (!cargo) {
      Swal.fire({
        title: "Por favor, escolha um cargo!",
      });
      return;
    }

    try {
      const url = baseURL + "user/update/" + userId;
      const datapost = {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        numeroFuncionario: numeroFuncionario,
        email: email,
        salario: salario,
        dataContratacao: dataContratacao,
        isColaborador: isColaborador,
        cargoId: cargo,
        departamentoId: departamento || null,
        filialId: filial || null
      };

      const response = await axios.put(url, datapost);
      if (response.data.success === true) {
        Swal.fire({
          title: "Utilizador alterado com sucesso!",
        }).then(() => {
          navigate("/area-administrativa");
        });
      } else {
        Swal.fire({
          title: "Erro!",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: err.response.data.message,
      });
    }
  }

  function FillCargo() {
    return dataCargo.map((data, index) => {
      return (
        <option key={index} value={data.cargoId}>
          {data.cargoNome}
        </option>
      );
    });
  }

  function FillDepartamento() {
    return dataDepartamento.map((data, index) => {
      return (
        <option key={index} value={data.departamentoId}>
          {data.departamentoNome}
        </option>
      );
    });
  }

  function FillFilial() {
    return dataFilial.map((data, index) => {
      return (
        <option key={index} value={data.filialId}>
          {data.filialNome}
        </option>
      );
    });
  }
};

export default FormUsers;
