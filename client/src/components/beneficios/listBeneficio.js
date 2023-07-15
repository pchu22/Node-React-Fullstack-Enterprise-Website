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
          const sortedBeneficios = data.sort((a, b) => {
            if (a.dataRegisto < b.dataRegisto) return -1;
            if (a.dataRegisto > b.dataRegisto) return 1;

            return 0;
          });
          setBeneficios(sortedBeneficios);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error Web Service',
            text: 'Lista de benefícios indisponível!'
          });
        }
      }).catch((err) => {
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
          Swal.fire({
            icon: 'error',
            title: 'Error Web Service',
            text: 'Erro ao carregar o cargo do utilizador!'
          });
        }
      }).catch((err) => {
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
        Swal.fire({
          icon: 'error',
          title: 'Cancelado...',
          text: 'Não foi possível apagar os benefícios!'
        });
      }
    });
  }

  function deleteSelectedBeneficios() {
    const url = baseURL + '/beneficio/delete';
    const beneficioIds = selectedBeneficio.map((beneficio) => beneficio.beneficioId);

    axios.post(url, { beneficioIds })
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Ação executada com sucesso!',
            text: 'Os benefícios foram apagadas com sucesso!'
          });
          loadBeneficios();
        }
      }).catch((err) => {
        alert('Error: ' + err);
      });
  }

  function showBeneficioInfo(beneficio) {
    Swal.fire({
      title: beneficio.titulo,
      html: `
          <strong>Descrição</strong>: ${beneficio.descricao}<br/>
          <strong>Tipo de Benefícios</strong>: ${beneficio.tipo}
        `,
      showCancelButton: false,
      focusConfirm: false
    })
  }

  function renderBeneficios() {
    return beneficios.map((beneficio, index) => (
      <tr className="user-row" key={index}>
        <td className='beneficios-data'>
          {cargo === 1 ? (
            <input
              type="checkbox"
              checked={selectedBeneficio.includes(beneficio)}
              onChange={() => handleBeneficioSelect(beneficio)}
            />
          ) : null}
        </td>
        <td className='beneficios-data' onClick={() => showBeneficioInfo(beneficio)}>{beneficio.titulo}</td>
        <td className='beneficios-data' onClick={() => showBeneficioInfo(beneficio)}>{beneficio.descricao}</td>
        <td className='beneficios-data' onClick={() => showBeneficioInfo(beneficio)}>{beneficio.tipo}</td>
        {cargo === 1 ? (
          <td className='beneficios-data'>
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
    <main className='main-beneficios'>
      <div className="container container-beneficios">
        <h1 className="mt-5 mb-5"><br /></h1>
        <div className="row-beneficios">
          <div className="col-md-12">
            <div className="mb-3 mt-3">
              {cargo === 1 ? (
                <button className="btn btn-outline-danger" role="button" aria-pressed="true" onClick={handleDeleteSelected}>
                  <span className="bi bi-trash-fill" />
                </button>
              ) : null}
              {cargo === 1 ? (
                <Link to="/beneficio/create" className="btn btn-outline-success add-btn">
                  <span className='bi bi-plus-circle' />
                </Link>
              ) : null}
            </div>
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th className='th-beneficios'>
                    {cargo === 1 ? (
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    ) : null}
                  </th>
                  <th className='th-beneficios'>Título</th>
                  <th className='th-beneficios'>Descrição</th>
                  <th className='th-beneficios'>Tipo</th>
                  {cargo === 1 ? (
                    <th className='th-beneficios'>Ações</th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {renderBeneficios()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
