import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './beneficios.css'

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com';

export default function ListBeneficios() {
  const [beneficios, setBeneficios] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBeneficio, setSelectedBeneficio] = useState([]);
  const [cargo, setCargo] = useState('');

  useEffect(() => {
    loadBeneficios();
    loadUserCargo();
  }, []);

  function loadBeneficios() {
    const url = baseURL + '/beneficio/list';

    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setBeneficios(data);
        } else {
          Swal.fire('Error Web Service', 'Lista de benefícios indisponível!', 'error');
        }
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  }

  function loadUserCargo() {
    const userId = localStorage.getItem('userId');
    const urlCargo = baseURL + '/user/get/' + userId;

    axios.get(urlCargo)
      .then((res) => {
        if (res.data.success) {
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

  function handleBeneficioSelect(beneficio) {
    const updatedSelectedBeneficio = selectedBeneficio.includes(beneficio)
      ? selectedBeneficio.filter((selectedBeneficio) => selectedBeneficio !== beneficio)
      : [...selectedBeneficio, beneficio];

      setSelectedBeneficio(updatedSelectedBeneficio);
  }

  function handleSelectAll() {
    if (selectAll) {
      setSelectedBeneficio([]);
    } else {
        setSelectedBeneficio(beneficios);
    }
    setSelectAll(!selectAll);
  }

  function handleDeleteSelected() {
    Swal.fire({
      title: 'Tem a certeza que deseja apagar os benefícios selecionadas?',
      text: 'Após a eliminação dos benefícios não será possível a sua visualização!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Apagar benefícios',
      cancelButtonText: 'Manter benefícios',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSelectedBeneficios();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado...', 'Não foi possível apagar os benefícios!', 'error');
      }
    });
  }

  function deleteSelectedBeneficios() {
    const url = baseURL + '/beneficio/delete';
    const beneficioIds = selectedBeneficio.map((beneficio) => beneficio.beneficioId);

    axios
      .post(url, { beneficioIds })
      .then((res) => {
        if (res.data.success) {
          Swal.fire('Apagadas!', 'Os benefícios foram apagadas com sucesso!', 'success');
          loadBeneficios();
        }
      })
      .catch((err) => {
        alert('Error: ' + err);
      });
  }

  function renderBeneficios() {

    return beneficios.map((beneficio, index) => (
      <tr className="user-row" key={index}>
        <td>
        {cargo === 1 ? (
          <input
            type="checkbox"
            checked={selectedBeneficio.includes(beneficio)}
            onChange={() => handleBeneficioSelect(beneficio)}
          />
        ) : null}
        </td>
        {cargo === 1 ? (
          <td>{index + 1}</td>
        ) : null}
        <td>{beneficio.titulo}</td>
        <td>{beneficio.descricao}</td>
        <td>{beneficio.tipo}</td>
        {cargo === 1 ? (
        <td>
          <div style={{ display: 'inline-block' }}>
                <Link className="btn btn-outline-warning" role="button" aria-pressed="true" to={`/beneficio/update/${beneficio.beneficioId}`}>
                  <span className="bi bi-pen-fill" />
                </Link>
          </div>
        </td>
        ) : (null)}
      </tr>
    ));
  }

  return (
    <div className="wrapper" style={{ width: '100vw', height: '100vh' }}>
      <div className="container">
        <h2 className="text-center">Lista de Vagas</h2>
        <div className="text-left">
          {cargo === 1 ? (
            <button className="btn btn-outline-danger" role="button" aria-pressed="true" onClick={handleDeleteSelected}>
              <span className="bi bi-trash-fill" />
            </button>
          ) : null}
        </div>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>
              {cargo === 1 ? (
                  <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              ) : null}
              </th>
              {cargo === 1 ? (
                <th>ID</th>
              ) : null}
              <th>Título</th>
              <th>Descrição</th>
              <th>Tipo</th>
              {cargo === 1 ? (
                <th>Ações</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {beneficios.length > 0 ? (
              renderBeneficios()
            ) : (
              <tr>
                <td colSpan="6">Não existem beneficios!</td>
              </tr>
            )}</tbody>
        </table>
      </div>
    </div>
  );
}
