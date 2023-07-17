import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './tipos.css'

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com';

export default function ListVaga() {
    const [tipos, setTipos] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedTipo, setSelectedTipo] = useState([]);

    useEffect(() => {
        loadTipos();
    }, []);

    function loadTipos() {
        const url = baseURL + '/tipo-projeto/list';

        axios
            .get(url)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    setTipos(data);
                } else {
                    Swal.fire('Error Web Service', 'Lista de tipos de projeto indisponível!', 'error');
                }
            })
            .catch((err) => {
                alert('Error: ' + err.message);
            });
    }

    function handleTipoSelect(tipo) {
        const updatedSelectedTipo = selectedTipo.includes(tipo)
            ? selectedTipo.filter((selectedTipo) => selectedTipo !== tipo)
            : [...selectedTipo, tipo];

        setSelectedTipo(updatedSelectedTipo);
    }

    function handleSelectAll() {
        if (selectAll) {
            setSelectedTipo([]);
        } else {
            setSelectedTipo(tipos);
        }
        setSelectAll(!selectAll);
    }

    function handleDeleteSelected() {
        Swal.fire({
            title: 'Tem a certeza que deseja apagar os tipos de projeto selecionadas?',
            text: 'Após a eliminação dos tipos de projeto não será possível a sua visualização!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Apagar tipos de projeto',
            cancelButtonText: 'Manter tipos de projeto',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteSelectedTipos();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    icon: 'error',
                    title: 'Cancelado...', 
                    text: 'Não foi possível apagar os tipos de projeto!'
                });
            }
        });
    }

    function deleteSelectedTipos() {
        const url = baseURL + '/tipo-projeto/delete';
        const tipoProjetoIds = selectedTipo.map((tipo) => tipo.tipoProjetoId);
        axios.post(url, { tipoProjetoIds })
            .then((res) => {
                if (res.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Ação executada com sucesso!', 
                        text: 'Os tipos de projeto foram apagados com sucesso!'
                    });
                    loadTipos();
                }
            })
            .catch((err) => {
                alert('Error: ' + err);
            });
    }

    function renderTiposProjeto() {
        return tipos.map((tipo, index) => (
            <tr
                className="user-row"
                key={index}
            >
                <td className='areas-data'>
                    <input
                        type="checkbox"
                        checked={selectedTipo.includes(tipo)}
                        onChange={() => handleTipoSelect(tipo)}
                    />
                </td>
                <td className='areas-data'>{tipo.tipoProjetoNome}</td>
                <td className='areas-data'>
                    <div style={{ display: 'inline-block' }}>
                        <Link className="btn btn-outline-warning" role="button" aria-pressed="true" to={`/tipo-projeto/update/${tipo.tipoProjetoId}`}>
                            <span className="bi bi-pen-fill" />
                        </Link>
                    </div>
                </td>
            </tr>
        ));
    }

    return (
        <main className='main-areas'>
            <div className="container container-areas">
                <h1 className="mt-5 mb-5"><br /></h1>
                <div className="row-areas">
                    <div className="col-md-12">
                        <div className="mb-3 mt-3">
                            <button className="btn btn-outline-danger del-btn" role="button" aria-pressed="true" onClick={handleDeleteSelected}>
                                <span className="bi bi-trash-fill" />
                            </button>
                            <Link to="/tipo-projeto/create" className="btn btn-outline-success add-btn">
                                <span className='bi bi-plus-circle' />
                            </Link>
                        </div>
                        <table className="table table-striped mt-3">
                            <thead>
                                <tr>
                                    <th className='th-areas' style={{ width: "30px" }}>
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                    <th className='th-areas'>Tipo de Projeto</th>
                                    <th className='th-areas'>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderTiposProjeto()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
