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
          Swal.fire({
            icon: 'error',
            title: 'Error Web Service',
            text: 'Lista de ideias indisponível!'
          });
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
          Swal.fire({
            icon: 'error',
            title: 'Error Web Service',
            text: 'Erro ao carregar o cargo do utilizador!'
          });
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
          Swal.fire({
            icon: 'error',
            title: 'Error Web Service',
            text: 'Erro ao carregar o cargo do utilizador!'
          });
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
        Swal.fire({
          icon: 'error',
          title: 'Cancelado...', 
          text: 'Não foi possível apagar as ideias!'
        });
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
          Swal.fire({
            icon: 'success',
            title: 'Ação executada com sucesso!',
            text: 'As ideias foram apagadas com sucesso!'
          });
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
          <td className='ideias-data'>
            {cargo === 1 ? (
              <input
                type="checkbox"
                checked={selectedIdeia.includes(ideia)}
                onChange={() => handleIdeiaSelect(ideia)}
              />
            ) : null}
          </td>
          <td className='ideais-data'>{ideia.titulo}</td>
          <td className='ideais-data'>{ideia.descricao}</td>
          <td className='ideais-data'>{ideia.tipo}</td>
          <td className='ideais-data'>{userName}</td>
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
          ) : <td />}
        </tr>
      );
    });
  }



  return (
    <main className='main-vagas'>
      <div className="container container-vagas">
        <h1 className="mt-5 mb-5"><br /></h1>
        <div className="row-vagas">
          <div className="col-md-12">
            <div className="mb-3 mt-3">
              {cargo === 1 ? (
                <button className="btn btn-outline-danger del-btn" role="button" aria-pressed="true" onClick={handleDeleteSelected}>
                  <span className="bi bi-trash-fill" />
                </button>
              ) : null}
              {cargo === 1 ? (
                <Link to="/ideia/create" className="btn btn-outline-success add-btn">
                  <span className='bi bi-plus-circle' />
                </Link>
              ) : null}
            </div>
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th className='th-ideias' style={{ width: "30px" }}>
                    {cargo === 1 ? (
                      <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    ) : null}
                  </th>
                  <th className='th-ideias'>Título</th>
                  <th className='th-ideias'>Ideia</th>
                  <th className='th-ideias'>Tipo</th>
                  <th className='th-ideias'>Criador</th>
                  {cargo === 1 ? <th>Ações</th> : <th/>}
                </tr>
              </thead>
              <tbody>
                {renderIdeias()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
