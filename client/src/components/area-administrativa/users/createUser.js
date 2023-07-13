import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

export default function CreateUser() {
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [ultimoNome, setUltimoNome] = useState("");
  const [numeroFuncionario, setNumeroFuncionario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telemovel, setTelemovel] = useState("");
  const [morada, setMorada] = useState("");
  const [salario, setSalario] = useState("");
  const [cargo, setCargo] = useState(null);
  const [departamento, setDepartamento] = useState(null);
  const [filial, setFilial] = useState(null);
  const [dataCargo, setDataCargo] = useState([]);
  const [dataDepartamento, setDataDepartamento] = useState([]);
  const [dataFilial, setDataFilial] = useState([]);
  const [isColaborador, setIsColaborador] = useState(false);
  const [isCandidato, setIsCandidato] = useState(false);
  const [isBallMoving, setIsBallMoving] = useState(false);

  async function toggleUserStatus() {
    setIsBallMoving(true);
    const toggleIsColaborador = !isColaborador;
    setIsColaborador(toggleIsColaborador);
  }

  const [passwordEye, setPasswordEye] = useState(false);
  const [passwordSelected, setPasswordSelected] = useState(false);

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };

  const handlePasswordBlur = () => {
    setPasswordSelected(true);
  };

  const navigate = useNavigate();

  useEffect(() => {

    const urlCargo = baseURL + "cargo/list";
    axios.get(urlCargo)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setDataCargo(data);
        } else {
          alert("Error Web Service");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error: " + err);
      });

    const urlDepartamento = baseURL + "departamento/list";
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

    const urlFilial = baseURL + "filial/list";
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

  function LoadCargo() {
    return dataCargo.map((data, index) => {
      return <option key={index} value={data.cargoId}>{data.cargoNome}</option>;
    });
  }

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
    if (primeiroNome.trim() === "" ||
      ultimoNome.trim() === "" ||
      numeroFuncionario.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      telemovel.trim() === "" ||
      morada.trim() === "" ||
      salario.trim() === "" ||
      isCandidato === null ||
      cargo === null
    ) {
      Swal.fire('Todos os campos são de preenchimento obrigatório!');
    } else if (password.length < 8) {
      Swal.fire('A senha deve ter pelo menos 8 caracteres!');
    } else if (!/[A-Z]/.test(password)) {
      Swal.fire('A senha deve conter pelo menos uma letra maiúscula!');
    } else if (!/[a-z]/.test(password)) {
      Swal.fire('A senha deve conter pelo menos uma letra minúscula!');
    } else if (!/\d/.test(password)) {
      Swal.fire('A senha deve conter pelo menos um número!');
    } else if (!/[!#?%\-_]/.test(password)) {
      Swal.fire('A senha deve conter pelo menos um caractere especial (!#?%-_)!');
    } else if (!/^\d{9}$/.test(telemovel) && !/^\d{10}$/.test(telemovel)) {
      Swal.fire("Tem de inserir um número de telemóvel ou de telefone fixo!");
    } else if (salario < 0) {
      Swal.fire('O salário não pode ser menor que 0!');
    } else {
      const url = baseURL + "user/create";
      const datapost = {
        primeiroNome: primeiroNome,
        ultimoNome: ultimoNome,
        numeroFuncionario: numeroFuncionario,
        email: email,
        password: password,
        telemovel: telemovel,
        morada: morada,
        salario: salario,
        isCandidato: isCandidato,
        cargoId: cargo,
        departamentoId: departamento,
        filialId: filial
      };

      axios.post(url, datapost)
        .then(res => {
          if (res.data.success === true) {
            alert(res.data.message);
            navigate('/user');
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
          <label htmlFor="inputPNome">Primeiro Nome</label>
          <input type="text" className="form-control" placeholder="Primeiro Nome"
            value={primeiroNome} onChange={event => setPrimeiroNome(event.target.value)} />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputUNome">Ultimo Nome</label>
          <input type="text" className="form-control" placeholder="Ultimo Nome"
            value={ultimoNome} onChange={event => setUltimoNome(event.target.value)} />
        </div>
      </div>
      <div className="form-row justify-content-center">
      </div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="inputNFunc">Número de Funcionários</label>
          <input
            type="number"
            className="form-control"
            id="inputNFunc"
            placeholder="Número de Funcionário"
            value={numeroFuncionario}
            onChange={(value) => setNumeroFuncionario(value.target.value)}
          />
        </div>
      </div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Email"
            value={email}
            onChange={(value) => setEmail(value.target.value)}
          />
        </div>
        <div className="form-row justify-content-center">
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword">Password</label>
            <input
              type={passwordEye ? "text" : "password"}
              className="form-control"
              id="inputPassword"
              placeholder="Password"
              value={password}
              onChange={(value) => setPassword(value.target.value)}
              onBlur={handlePasswordBlur}
            />
            <span className='password-toggle-icon'>
              {passwordEye === false ? (<AiFillEyeInvisible onClick={handlePasswordClick} />) : (<AiFillEye onClick={handlePasswordClick} />)}
            </span>
          </div>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputTelemovel">Telemovel</label>
          <input
            type="tel"
            className="form-control"
            id="inputTelemovel"
            placeholder="Telemovel"
            value={telemovel}
            onChange={(value) => setTelemovel(value.target.value)}
          />
        </div>
      </div>
      <div className="form-row justify-content-center">
        <div className="form-group col-md-6">
          <label htmlFor="inputMorada">Morada</label>
          <input
            type="text"
            className="form-control"
            id="inputMorada"
            placeholder="Morada"
            value={morada}
            onChange={(value) => setMorada(value.target.value)}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputSalario">Salário</label>
          <input
            type="tel"
            className="form-control"
            id="inputSalario"
            placeholder="Salário"
            value={salario}
            onChange={(value) => setSalario(value.target.value)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="inputCargo">Cargo</label>
          <select id="inputCargo" className="form-control" onChange={event => setCargo(event.target.value)}>
            <option defaultValue>Escolha um cargo...</option>
            {LoadCargo()}
          </select>
        </div>
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
