import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './vagas.css'

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com';

export default function ListVaga() {
  const [vagas, setVagas] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [filiais, setFiliais] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedVaga, setSelectedVaga] = useState([]);
  const [cargo, setCargo] = useState('');

  useEffect(() => {
    loadVagas();
    loadDepartamentos();
    loadFiliais();
    loadUserCargo();
  }, []);

  function loadVagas() {
    const url = baseURL + '/vaga/list';

    axios
      .get(url)
      .then((res) => {
        if (res.data.success === true) {
          const data = res.data.data;
          setVagas(data);
        } else {
          Swal.fire('Error Web Service', 'Lista de vagas indisponível!', 'error');
        }
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  }

  function loadDepartamentos() {
    const url = baseURL + '/departamento/list';

    axios
      .get(url)
      .then((res) => {
        if (res.data.success === true) {
          const data = res.data.data;
          setDepartamentos(data);
        } else {
          Swal.fire('Error Web Service', 'Lista de departamentos indisponível!', 'error');
        }
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  }

  function loadFiliais() {
    const url = baseURL + '/filial/list';

    axios
      .get(url)
      .then((res) => {
        if (res.data.success === true) {
          const data = res.data.data;
          setFiliais(data);
        } else {
          Swal.fire('Error Web Service', 'Lista de filiais indisponível!', 'error');
        }
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  }

  function loadUserCargo() {
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

  function getDepartamentoName(departamentoId) {
    const departamento = departamentos.find((departamento) => departamento.departamentoId === departamentoId);
    return departamento ? departamento.departamentoNome : '';
  }

  function getFilialName(filialId) {
    const filial = filiais.find((filial) => filial.filialId === filialId);
    return filial ? filial.filialNome : '';
  }

  function handleVagaSelect(vaga) {
    const updatedSelectedVaga = selectedVaga.includes(vaga)
      ? selectedVaga.filter((selectedVaga) => selectedVaga !== vaga)
      : [...selectedVaga, vaga];

    setSelectedVaga(updatedSelectedVaga);
  }

  function handleSelectAll() {
    if (selectAll) {
      setSelectedVaga([]);
    } else {
      setSelectedVaga(vagas);
    }
    setSelectAll(!selectAll);
  }

  function handleDeleteSelected() {
    Swal.fire({
      title: 'Tem a certeza que deseja apagar as vagas selecionadas?',
      text: 'Após a eliminação das vagas não será possível a sua visualização!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Apagar vagas',
      cancelButtonText: 'Manter vagas',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSelectedVagas();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado...', 'Não foi possível apagar as vagas!', 'error');
      }
    });
  }

  function deleteSelectedVagas() {
    const url = baseURL + '/vaga/delete';
    const vagaIds = selectedVaga.map((vaga) => vaga.vagaId);

    axios
      .post(url, { vagaIds })
      .then((res) => {
        if (res.data.success) {
          Swal.fire('Apagadas!', 'As vagas foram apagadas com sucesso!', 'success');
          loadVagas();
        }
      })
      .catch((err) => {
        alert('Error: ' + err);
      });
  }

  function renderVagas() {
    let filteredVagas;

    if (cargo === 1) {
      filteredVagas = vagas;
    } else if (cargo === 2 || cargo === 3) {
      filteredVagas = vagas.filter((vaga) => vaga.isInterna);
    } else if (cargo === 4 || cargo === 5) {
      filteredVagas = vagas.filter((vaga) => !vaga.isInterna);
    } else {
      filteredVagas = [];
    }

    return filteredVagas.map((vaga, index) => (
      <tr
        className="user-row"
        key={index}
      >
        <td className='row-vaga'>
          {cargo === 1 ? (
            <input
              type="checkbox"
              checked={selectedVaga.includes(vaga)}
              onChange={() => handleVagaSelect(vaga)}
            />
          ) : null}
        </td>
        <td className='row-vaga' onClick={() => showVagaInfo(vaga)}>{vaga.titulo}</td>
        <td className='row-vaga' onClick={() => showVagaInfo(vaga)}>{vaga.descricao}</td>
        <td className='row-vaga' onClick={() => showVagaInfo(vaga)}>{getDepartamentoName(vaga.departamentoId)}</td>
        <td className='row-vaga' onClick={() => showVagaInfo(vaga)}>{getFilialName(vaga.filialId)}</td>
        <td className='row-vaga'>
          <div style={{ display: 'inline-block' }}>
            {cargo === 1 ? (
              <>
                <Link className="btn btn-outline-warning" role="button" aria-pressed="true" to={`/vaga/update/${vaga.vagaId}`}>
                  <span className="bi bi-pen-fill" />
                </Link>
                <span style={{ marginLeft: '10px' }} />
                <Link className="btn btn-outline-success" role="button" aria-pressed="true" to={`/candidatar/${vaga.vagaId}`}>
                  <span className="bi bi-envelope-check-fill" />
                </Link>
                <span style={{ marginLeft: '10px' }} />
                <Link className="btn btn btn-outline-success" role="button" aria-pressed="true" to={`/referenciar/${vaga.vagaId}`}>
                  <span className="bi bi-file-earmark-fill" />
                </Link>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-success" role="button" aria-pressed="true" to={`/candidatar/${vaga.vagaId}`}>
                  <span className="bi bi-envelope-check-fill" />
                </Link>
                <span style={{ marginLeft: '10px' }} />
                <Link className="btn btn btn-outline-success" role="button" aria-pressed="true" to={`/referenciar/${vaga.vagaId}`}>
                  <span className="bi bi-file-earmark-fill" />
                </Link>
              </>
            )}
          </div>
        </td>
      </tr>
    ));
  }

  function showVagaInfo(vaga) {
    Swal.fire({
      title: vaga.titulo,
      html: `
          <strong>Descrição</strong>: ${vaga.descricao}<br/>
          <strong>Habilitações Mínimas</strong>: ${vaga.habilitacoesMin}<br/>
          <strong>Experiençia Mínima</strong>: ${vaga.experienciaMin}<br/>
          <strong>Remuneração</strong>: ${vaga.remuneracao}<br/>
          <strong>Departamento</strong>: ${getDepartamentoName(vaga.departamentoId)}<br/>
          <strong>Filial</strong>: ${getFilialName(vaga.filialId)}
        `,
      showCancelButton: false,
      focusConfirm: false
    })
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
                <Link to="/vaga/create" className="btn btn-outline-success add-btn">
                  <span className='bi bi-plus-circle' />
                </Link>
              ) : null}
            </div>
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th className='th-vaga' style={{ width: "30px" }}>
                    {cargo === 1 ? (
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    ) : null}
                  </th>
                  <th className='th-vaga'>Título</th>
                  <th className='th-vaga'>Descrição</th>
                  <th className='th-vaga'>Departamento</th>
                  <th className='th-vaga'>Filial</th>
                  <th className='th-vaga'>Ações</th>
                </tr>
              </thead>
              <tbody>
                {vagas.length > 0 ? (
                  renderVagas()
                ) : (
                  <tr>
                    <td colSpan="6" className='row-vaga'>Não existem vagas!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
