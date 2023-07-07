import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './listUsers.css';

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com';

export default function ListUser() {
  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers() {
    const url = baseURL + '/user/list';

    axios.get(url)
    .then((res) => {
      if (res.data.success === true) {
        const data = res.data.data;
        const sortedUsers = data.sort((a, b) => {
          if (a.cargoId < b.cargoId) return -1;
          if (a.cargoId > b.cargoId) return 1;
          if (a.dataRegisto < b.dataRegisto) return -1;
          if (a.dataRegisto > b.dataRegisto) return 1;

          return 0;
        });
        
        setUsers(sortedUsers);
      } else {
        Swal.fire('Error Web Service', 'Lista de Utilizadores indisponível!', 'error');
      }
    })
    .catch((err) => {
      alert('Error: ' + err.message);
    });
  }

  function toggleUserStatus(user) {
    const { userId, isAtivo } = user;
    const url = `${baseURL}/user/${isAtivo ? 'deactivate' : 'activate'}/${userId}`;

    axios
      .put(url)
      .then((res) => {
        if (res.data.success) {
          const action = isAtivo ? 'desativada' : 'ativada';
          Swal.fire({
            title: `Conta ${action} com sucesso!`,
            icon: 'success',
            timer: 2500,
            showConfirmButton: false
          });
          loadUsers();
        }
      })
      .catch((err) => {
        alert('Error: ' + err);
      });
  }

  function handleUserSelect(user) {
    const updatedSelectedUsers = selectedUsers.includes(user)
      ? selectedUsers.filter(selectedUser => selectedUser !== user)
      : [...selectedUsers, user];

    setSelectedUsers(updatedSelectedUsers);
  }

  function handleSelectAll() {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users);
    }
    setSelectAll(!selectAll);
  }

  function handleDeleteSelected() {
    Swal.fire({
      title: 'Tem a certeza que deseja apagar os utilizadores selecionados?',
      text: 'Após a eliminação dos utilizadores não será possível a sua visualização!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Apagar utilizadores',
      cancelButtonText: 'Manter utilizadores',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSelectedUsers();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado...', 'Não foi possível apagar os utilizadores!', 'error');
      }
    });
  }

  function deleteSelectedUsers() {
    const url = baseURL + '/user/delete';
    const userIds = selectedUsers.map(user => user.userId);

    axios
      .post(url, { userIds })
      .then((res) => {
        if (res.data.success) {
          Swal.fire('Apagados!', 'Os utilizadores foram apagados com sucesso!', 'success');
          loadUsers();
        }
      })
      .catch((err) => {
        alert('Error: ' + err);
      });
  }

  function getCargoIcon(cargoId) {
    let cargoName = '';

    switch (cargoId) {
      case 1:
        cargoName = 'Administrador';
        return <div className='icon-div'><i className="bi bi-person-fill admin-icon" /><span className="cargo-name">{cargoName}</span></div>;
      case 2:
        cargoName = 'Gestor';
        return <div className='icon-div'><i className="bi bi-people-fill gestor-icon" /><span className="cargo-name">{cargoName}</span></div>;
      case 3:
        cargoName = 'Colaborador';
        return <div className='icon-div'><i className="bi bi-person-badge-fill colaborador-icon" /><span className="cargo-name">{cargoName}</span></div>;
      case 4:
        cargoName = 'Candidato';
        return <div className='icon-div'><i className="bi bi-person-circle candidato-icon" /><span className="cargo-name">{cargoName}</span></div>;
      case 5:
        cargoName = 'Visitante';
        return <div className='icon-div'><i className="bi bi-person-dash-fill visitante-icon" /><span className="cargo-name">{cargoName}</span></div>;
      default:
        return null;
    }
  }

  function renderUsers() {
    return users.map((user, index) => (
      <tr className="user-row" key={index}>
        <td>
          <input
            type="checkbox"
            checked={selectedUsers.includes(user)}
            onChange={() => handleUserSelect(user)}
          />
        </td>
        <td>{index + 1}</td>
        <td>{user.primeiroNome + ' ' + user.ultimoNome}</td>
        <td>{user.numeroFuncionario ? user.numeroFuncionario : 'N/A'}</td>
        <td>{getCargoIcon(user.cargoId)}</td>
        <td>{user.email}</td>
        <td>{user.telemovel ? user.telemovel : 'N/A'}</td>
        <td>
          <div
            className={`status-bar ${user.isAtivo ? 'active' : 'inactive'}`}
            onClick={() => toggleUserStatus(user)}
          >
            <div className="status-ball"></div>
          </div>
        </td>
        <td>
          <Link className="btn btn-outline-info" to={`/user/update/${user.userId}`}>
            Editar
          </Link>
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <div className="button-container">
        <button className="btn btn-outline-danger" onClick={handleDeleteSelected}>
          Apagar Utilizadores Selecionados
        </button>
      </div>
      <table className="table table-hover table-striped">
        <thead className="thead-dark">
          <tr>
            <th className="list-header">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="list-header">Nome</th>
            <th className="list-header">Nº Funcionário</th>
            <th className="list-header">Cargo</th>
            <th className="list-header">Email</th>
            <th className="list-header">Nº Telemóvel</th>
            <th className="list-header">Estado</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            renderUsers()
          ) : (
            <tr>
              <td colSpan="8">Não existem utilizadores!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
