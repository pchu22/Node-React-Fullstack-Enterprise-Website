import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './areas.css'

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com';

export default function ListVaga() {
    const [areas, setAreas] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedArea, setSelectedArea] = useState([]);

    useEffect(() => {
        loadAreas();
    }, []);

    function loadAreas() {
        const url = baseURL + '/area-negocio/list';

        axios
            .get(url)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    setAreas(data);
                } else {
                    Swal.fire('Error Web Service', 'Lista de áreas de negócio indisponível!', 'error');
                }
            })
            .catch((err) => {
                alert('Error: ' + err.message);
            });
    }

    function handleAreaSelect(area) {
        const updatedSelectedArea = selectedArea.includes(area)
            ? selectedArea.filter((selectedArea) => selectedArea !== area)
            : [...selectedArea, area];

        setSelectedArea(updatedSelectedArea);
    }

    function handleSelectAll() {
        if (selectAll) {
            setSelectedArea([]);
        } else {
            setSelectedArea(areas);
        }
        setSelectAll(!selectAll);
    }

    function handleDeleteSelected() {
        Swal.fire({
            title: 'Tem a certeza que deseja apagar as áreas de negócio selecionadas?',
            text: 'Após a eliminação das áreas de negócio não será possível a sua visualização!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Apagar áreas de negócio',
            cancelButtonText: 'Manter áreas de negócio',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteSelectedAreas();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelado...', 'Não foi possível apagar as áreas de negócio!', 'error');
            }
        });
    }

    function deleteSelectedAreas() {
        const url = baseURL + '/area-negocio/delete';
        const areaNegocioIds = selectedArea.map((area) => area.areaNegocioId);
        axios.post(url, { areaNegocioIds })
            .then((res) => {
                if (res.data.success) {
                    Swal.fire('Apagadas!', 'As áreas de negócio foram apagadas com sucesso!', 'success');
                    loadAreas();
                }
            })
            .catch((err) => {
                alert('Error: ' + err);
            });
    }

    function renderAreasNegocio() {
        return areas.map((area, index) => (
            <tr
                className="user-row"
                key={index}
            >
                <td className='areas-data'>
                    <input
                        type="checkbox"
                        checked={selectedArea.includes(area)}
                        onChange={() => handleAreaSelect(area)}
                    />
                </td>
                <td className='areas-data'>{area.areaNegocioNome}</td>
                <td className='areas-data'>
                    <div style={{ display: 'inline-block' }}>
                        <Link className="btn btn-outline-warning" role="button" aria-pressed="true" to={`/area-negocio/update/${area.areaNegocioId}`}>
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
                            <Link to="/area-negocio/create" className="btn btn-outline-success add-btn">
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
                                    <th className='th-areas'>Área de Negócio</th>
                                    <th className='th-areas'>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderAreasNegocio()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
