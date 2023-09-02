import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './candidaturas.css';
import CalendarioComponent from "../../components/calendario/calendario";

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com';

export default function ListCandidatura() {
    const [candidaturas, setCandidaturas] = useState([]);
    const [users, setUsers] = useState([]);
    const [vagas, setVagas] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedCandidatura, setSelectedCandidatura] = useState([]);
    const [showCalendario, setShowCalendario] = useState(false);
    const [cargo, setCargo] = useState("");
    const loggedInUser = localStorage.getItem('userId');

    useEffect(() => {
        loadCandidaturas();
        loadUsers();
        loadVagas();
        loadUserCargo();
    }, []);

    function loadCandidaturas() {
        const url = baseURL + '/candidatura/list';

        axios.get(url)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    setCandidaturas(data);
                } else {
                    Swal.fire('Error Web Service', 'Lista de candidaturas indisponível!', 'error');
                }
            }).catch((err) => {
                alert('Error: ' + err.message);
            });
    }

    function loadUsers() {
        const url = baseURL + '/user/list';

        axios.get(url)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    setUsers(data);
                } else {
                    Swal.fire('Error Web Service', 'Lista de utilizadores indisponível!', 'error');
                }
            }).catch((err) => {
                alert('Error: ' + err.message);
            });
    }
    

    function loadVagas() {
        const url = baseURL + '/vaga/list';

        axios.get(url)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    setVagas(data);
                } else {
                    Swal.fire('Error Web Service', 'Lista de vagas indisponível!', 'error');
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
                    Swal.fire('Error Web Service', 'Erro ao carregar o cargo do utilizador!', 'error');
                }
            }).catch((err) => {
                alert('Error: ' + err.message);
            });
    }

    function handleCandidaturaSelect(candidatura) {
        const updatedSelectedCandidatura = selectedCandidatura.includes(candidatura)
            ? selectedCandidatura.filter((selectedCandidatura) => selectedCandidatura !== candidatura)
            : [...selectedCandidatura, candidatura];

        setSelectedCandidatura(updatedSelectedCandidatura);
    }

    function handleSelectAll() {
        if (selectAll) {
            setSelectedCandidatura([]);
        } else {
            setSelectedCandidatura(candidaturas);
        }
        setSelectAll(!selectAll);
    }

    function handleDeleteSelected() {
        Swal.fire({
            title: 'Tem a certeza que deseja apagar as candidaturas selecionadas?',
            text: 'Após a eliminação das candidaturas não será possível a sua visualização!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Apagar candidaturas',
            cancelButtonText: 'Manter candidaturas',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteSelectedCandidaturas();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelado...', 'Não foi possível apagar as candidaturas!', 'error');
            }
        });
    }

    function deleteSelectedCandidaturas() {
        const url = baseURL + '/candidatura/delete';
        const candidaturaIds = selectedCandidatura.map((candidatura) => candidatura.candidaturaId);

        axios
            .post(url, { candidaturaIds })
            .then((res) => {
                if (res.data.success) {
                    Swal.fire('Apagadas!', 'As candidaturas foram apagadas com sucesso!', 'success');
                    loadCandidaturas();
                } else {
                    Swal.fire('Erro', 'Ocorreu um erro ao apagar as candidaturas.', 'error');
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

    function getVagaTitle(vagaId) {
        const vaga = vagas.find((vaga) => vaga.vagaId === vagaId);
        return vaga ? vaga.titulo : '';
    }

    function renderCandidaturas() {
        return candidaturas.map((candidatura, index) => {
            const canEdit = Number(candidatura.userId) === Number(loggedInUser)
            return (
                <tr className="user-row" key={index}>
                    {cargo === 1 ? (
                        <td className='candidaturas-data'>
                            <input
                                type="checkbox"
                                checked={selectedCandidatura.includes(candidatura)}
                                onChange={() => handleCandidaturaSelect(candidatura)}
                            />
                        </td>
                    ) : <td />}
                    {/*<td className='candidaturas-data'>button that allows to download cv</td>*/}
                    <td className='candidaturas-data' onClick={() => showCandidaturaInfo(candidatura)}>{getUserName(candidatura.userId)}</td>
                    <td className='candidaturas-data' onClick={() => showCandidaturaInfo(candidatura)}>{getVagaTitle(candidatura.vagaId)}</td>
                    {canEdit ? (
                        <td className='candidaturas-data'>
                            <Link className="btn btn-outline-warning" role="button" aria-pressed="true" to={`/candidatura/update/${candidatura.candidaturaId}`}>
                                <span className="bi bi-pen-fill" />
                            </Link>
                        </td>
                    ) : <td />}
                </tr>
            )
        });
    }

    function showCandidaturaInfo(candidatura) {
    Swal.fire({
      title: null,
      html: `
          <strong>Nome</strong>: ${getUserName(candidatura.userId)}<br/>
          <strong>Vaga:</strong>: ${getVagaTitle(candidatura.vagaId)}<br/>
        `,
        showCancelButton: true,
        cancelButtonText: 'Agendar Reunião',
        focusConfirm: false
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          setShowCalendario(true);
        }
      })
  }

    return (
        <main className='main-oportunidades'>
      {showCalendario ?(
      <CalendarioComponent />
    ) : (
        <div className='main-candidaturas'>
            <div className="container container-candidaturas">
                <h1 className="mt-5 mb-5"><br /></h1>
                <div className="row-candidaturas">
                    <div className="col-md-12">
                        <div className="mb-3 mt-3">
                            {cargo === 1 ? (
                                <button
                                    className="btn btn-outline-danger me-2"
                                    onClick={() => handleDeleteSelected()}
                                >
                                    <span className='bi bi-trash-fill' />
                                </button>
                            ) : null}
                        </div>
                        <table className="table table-striped mt-3">
                            <thead>
                                <tr>
                                    {cargo === 1 ? (
                                        <th className='candidaturas-header'>
                                            <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                        </th>
                                    ) : <th />}
                                    {/*<th className='candidaturas-header'>Curriculum vitae</th>*/}
                                    <th className='candidaturas-header'>Utilizador</th>
                                    <th className='candidaturas-header'>Vaga</th>
                                    <th className='candidaturas-header'>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderCandidaturas()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )}
    </main>
    );
}
