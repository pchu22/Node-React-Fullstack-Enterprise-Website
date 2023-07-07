import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com';

export default function ListUser() {
  const [filiais, setFiliais] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedFilial, setSelectedFilial] = useState([]);

  useEffect(() => {
    loadFilial();
  }, []);

  function loadFilial() {
    const url = baseURL + '/filial/list';

    axios.get(url)
    .then((res) => {
        if (res.data.success === true) {
            const data = res.data.data;
            setFiliais(data);
        } else {
        Swal.fire('Error Web Service', 'Lista de Filiais indisponível!', 'error');
      }
    })
    .catch((err) => {
      alert('Error: ' + err.message);
    });
  }

  function handleFilialSelect(filial) {
    const updatedSelectedFilial = selectedFilial.includes(filial)
      ? selectedFilial.filter(selectedFilial => selectedFilial !== filial)
      : [...selectedFilial, filial];

    setSelectedFilial(updatedSelectedFilial);
  }

  function handleSelectAll() {
    if (selectAll) {
      setSelectedFilial([]);
    } else {
        setSelectedFilial(filiais);
    }
    setSelectAll(!selectAll);
  }

  function handleDeleteSelected() {
    Swal.fire({
      title: 'Tem a certeza que deseja apagar as filiais selecionadas?',
      text: 'Após a eliminação das filiais não será possível a sua visualização!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Apagar filiais',
      cancelButtonText: 'Manter filiais',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSelectedFiliais();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado...', 'Não foi possível apagar as filiais!', 'error');
      }
    });
  }

  function deleteSelectedFiliais() {
    const url = baseURL + '/filial/delete';
    const filialIds = selectedFilial.map(filial => filial.filialId);

    axios
      .post(url, {filialIds})
      .then((res) => {
        if (res.data.success) {
          Swal.fire('Apagadas!', 'As filiais foram apagadas com sucesso!', 'success');
          loadFilial();
        }
      })
      .catch((err) => {
        alert('Error: ' + err);
      });
  }

  function rederFiliais() {
    return filiais.map((filial, index) => (
      <tr className="user-row" key={index}>
        <td>
          <input
            type="checkbox"
            checked={selectedFilial.includes(filial)}
            onChange={() => handleFilialSelect(filial)}
          />
        </td>
        <td>{index + 1}</td>
        <td>{filial.filialNome}</td>
        <td>{filial.morada}</td>
        <td>{filial.email}</td>
        <td>{filial.telemovel}</td>
        <td>
          <Link className="btn btn-outline-info" to={`/filial/update/${filial.filialId}`}>
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
          Apagar Filiais Selecionadas
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
            <th className="list-header">ID</th>
            <th className="list-header">Nome</th>
            <th className="list-header">Morada</th>
            <th className="list-header">Email</th>
            <th className="list-header">Telemóvel</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filiais.length > 0 ? (
            rederFiliais()
          ) : (
            <tr>
              <td colSpan="7">Não existem filiais!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
