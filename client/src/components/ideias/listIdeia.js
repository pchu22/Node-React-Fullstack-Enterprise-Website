import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './ideias.css';

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com';

export default function ListBeneficios() {
  const [ideias, setIdeias] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIdeia, setSelectedIdeia] = useState([]);
  const [cargo, setCargo] = useState('');
  const loggedInUserId = localStorage.getItem('userId');

  useEffect(() => {
    loadIdeias();
    loadUsers();
    loadCargo();
  }, []);

  function loadIdeias() {
    const url = baseURL + '/ideia/list';

    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setIdeias(data);
        } else {
          Swal.fire('Error Web Service', 'Lista de ideias indisponível!', 'error');
        }
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  }

  function loadUsers() {
    const urlCargo = baseURL + '/user/list';
    axios.get(urlCargo)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setUsers(data instanceof Array ? data : [data]);
        } else {
          Swal.fire('Error Web Service', 'Erro ao carregar o cargo do utilizador!', 'error');
        }
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  }
  
  function loadCargo() {
    const userId = localStorage.getItem('userId');
    const urlCargo = baseURL + '/user/get/' + userId;

    axios
      .get(urlCargo)
      .then((res) => {
        if (res.data.success === true) {
          console.log(res.data.data.cargo.cargoId);
          setCargo(res.data.data.cargo.cargoId);
        } else {
          Swal.fire('Error Web Service', 'Erro ao carregar o cargo do utilizador!', 'error');
        }
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  }

  function handleIdeiaSelect(ideia) {
    const updatedSelectedIdeia = selectedIdeia.includes(ideia)
      ? selectedIdeia.filter((selectedIdeia) => selectedIdeia !== ideia)
      : [...selectedIdeia, ideia];

    setSelectedIdeia(updatedSelectedIdeia);
  }

  function handleSelectAll() {
    if (selectAll) {
      setSelectedIdeia([]);
    } else {
      setSelectedIdeia(ideias);
    }
    setSelectAll(!selectAll);
  }

  function handleDeleteSelected() {
    Swal.fire({
      title: 'Tem a certeza que deseja apagar as ideias selecionadas?',
      text: 'Após a eliminação das ideias não será possível a sua visualização!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Apagar ideias',
      cancelButtonText: 'Manter ideias',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSelectedIdeia();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado...', 'Não foi possível apagar as ideias!', 'error');
      }
    });
  }

  function deleteSelectedIdeia() {
    const url = baseURL + '/ideia/delete';
    const ideiaIds = selectedIdeia.map((ideia) => ideia.ideiaId);

    axios
      .post(url, { ideiaIds })
      .then((res) => {
        if (res.data.success) {
          Swal.fire('Apagadas!', 'As ideias foram apagadas com sucesso!', 'success');
          loadIdeias();
        }
      })
      .catch((err) => {
        alert('Error: ' + err);
      });
  }

  function getUserName(userId) {
    const user = users.find((user) => user.userId === userId);
    return user ? user.primeiroNome + ' ' + user.ultimoNome : '';
  }

  function renderIdeias() {
    return ideias.map((ideia, index) => {
      const canEdit = Number(ideia.userId) === Number(loggedInUserId);
      const userName = getUserName(ideia.userId);
  
      return (
        <tr className="user-row" key={index}>
          <td>
            {cargo === 1 ? (
              <input
                type="checkbox"
                checked={selectedIdeia.includes(ideia)}
                onChange={() => handleIdeiaSelect(ideia)}
              />
            ) : null}
          </td>
          {cargo === 1 ? <td>{index + 1}</td> : null}
          <td>{ideia.titulo}</td>
          <td>{ideia.descricao}</td>
          <td>{ideia.tipo}</td>
          <td>{userName}</td>
          {canEdit ? (
            <td>
              <div style={{ display: 'inline-block' }}>
                <Link
                  className="btn btn-outline-warning"
                  role="button"
                  aria-pressed="true"
                  to={`/ideia/update/${ideia.ideiaId}`}
                >
                  <span className="bi bi-pen-fill" />
                </Link>
              </div>
            </td>
          ) : null  }
        </tr>
      );
    });
  }
  
  

  return (
    <div className="wrapper" style={{ width: '100vw', height: '100vh' }}>
      <div className="container">
        <h2 className="text-center">
          <br />
        </h2>
        <div className="text-left">
          {cargo === 1 ? (
            <button
              className="btn btn-outline-danger"
              role="button"
              aria-pressed="true"
              onClick={handleDeleteSelected}
            >
              <span className="bi bi-trash-fill" />
            </button>
          ) : null}
        </div>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>
                {cargo === 1 ? (
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                ) : null}
              </th>
              {cargo === 1 ? <th>ID</th> : null}
              <th>Título</th>
              <th>Ideia</th>
              <th>Tipo</th>
              <th>Criador</th>
              {cargo === 1 ? <th>Ações</th> : null}
            </tr>
          </thead>
          <tbody>
            {ideias.length > 0 ? (
              renderIdeias()
            ) : (
              <tr>
                <td colSpan="7">Não existem ideias!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
