import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Swal from 'sweetalert2';

import './style.css'

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com';

export default function AreaAdministrativa() {
    const [users, setUsers] = useState([]);
    const [filiais, setFiliais] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);

    const [selectedUser, setSelectedUser] = useState([]);
    const [selectedFilial, setSelectedFilial] = useState([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState([]);

    const [selectAllUser, setSelectAllUser] = useState(false);
    const [selectAllFilial, setSelectAllFilial] = useState(false);
    const [selectAllDepartamento, setSelectAllDepartamento] = useState(false);

    const [selectAll, setSelectAll] = useState(false);
    const [cargo, setCargo] = useState('');

    const [currentTable, setCurrentTable] = useState(0);
    const loggedInUserId = localStorage.getItem('userId');


    useEffect(() => {
        loadUsers();
        loadFiliais();
        loadDepartamentos();
        loadUserCargo();
        startingTable();
    }, [cargo]);

    function startingTable() {
        if (cargo === 1) {
            setCurrentTable(0);
        } else {
            setCurrentTable(1);
        }
    }

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
            }).catch((err) => {
                alert('Error: ' + err.message);
            });
    }

    function loadFiliais() {
        const url = baseURL + '/filial/list';

        axios
            .get(url)
            .then((res) => {
                if (res.data.success) {
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

    function loadDepartamentos() {
        const url = baseURL + '/departamento/list';

        axios
            .get(url)
            .then((res) => {
                if (res.data.success) {
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

    function loadUserCargo() {
        const userId = localStorage.getItem('userId');
        const urlCargo = baseURL + '/user/get/' + userId;

        axios
            .get(urlCargo)
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

    function handleItemSelect(type, item) {
        let updatedSelectedItems;

        switch (type) {
            case 'Utilizador':
                updatedSelectedItems = selectedUser.includes(item)
                    ? selectedUser.filter((selectedItem) => selectedItem !== item)
                    : [...selectedUser, item];
                setSelectedUser(updatedSelectedItems);
                break;

            case 'Filial':
                updatedSelectedItems = selectedFilial.includes(item)
                    ? selectedFilial.filter((selectedItem) => selectedItem !== item)
                    : [...selectedFilial, item];
                setSelectedFilial(updatedSelectedItems);
                break;

            case 'Departamento':
                updatedSelectedItems = selectedDepartamento.includes(item)
                    ? selectedDepartamento.filter((selectedItem) => selectedItem !== item)
                    : [...selectedDepartamento, item];
                setSelectedDepartamento(updatedSelectedItems);
                break;

            default:
                break;
        }
    }

    function handleSelectAll(type) {
        let updatedSelectedItems;
        let selectedItems;

        switch (type) {
            case 'Utilizador':
                selectedItems = selectAll ? [] : users;
                setSelectedUser(selectedItems);
                updatedSelectedItems = selectedItems;
                break;

            case 'Filial':
                selectedItems = selectAll ? [] : filiais;
                setSelectedFilial(selectedItems);
                updatedSelectedItems = selectedItems;
                break;

            case 'Departamento':
                selectedItems = selectAll ? [] : departamentos;
                setSelectedDepartamento(selectedItems);
                updatedSelectedItems = selectedItems;
                break;

            default:
                break;
        }

        setSelectAll(!selectAll);
        return updatedSelectedItems;
    }

    function deleteSelectedUsers() {
        const url = baseURL + '/user/delete';
        const userIds = selectedUser.map((user) => user.userId);

        axios
            .post(url, { userIds })
            .then((res) => {
                if (res.data.success) {
                    Swal.fire('Ação executada com sucesso!', 'Os utilizadores foram apagados com sucesso!', 'success');
                    loadUsers();
                }
            })
            .catch((err) => {
                alert('Error: ' + err);
            });
    }

    function deleteSelectedFiliais() {
        const url = baseURL + '/filial/delete';
        const filialIds = selectedFilial.map((filial) => filial.filialId);

        axios
            .post(url, { filialIds })
            .then((res) => {
                if (res.data.success) {
                    Swal.fire('Ação executada com sucesso!', 'As filiais foram apagadas com sucesso!', 'success');
                    loadFiliais();
                }
            })
            .catch((err) => {
                alert('Error: ' + err);
            });
    }

    function deleteSelectedDepartamentos() {
        const url = baseURL + '/departamento/delete';
        const departamentoIds = selectedDepartamento.map((departamento) => departamento.departamentoId);

        axios
            .post(url, { departamentoIds })
            .then((res) => {
                if (res.data.success) {
                    Swal.fire('Ação executada com sucesso!', 'Os departamentos foram apagados com sucesso!', 'success');
                    loadDepartamentos();
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

    function toggleUserStatus(user) {
        const { userId, isAtivo } = user;
        const url = `${baseURL}/user/${isAtivo ? 'deactivate' : 'activate'}/${userId}`;

        axios.put(url)
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
            }).catch((err) => {
                alert('Error: ' + err);
            });
    }

    return (
        <main className='main-adm'>
            <div className="container container-adm">
                <div className="row">
                    <div className="col-md-12">
                        <nav className='nav'>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                {cargo === 1 ? (
                                    <button
                                        className={`nav-link adm-nav-link ${currentTable === 0 ? 'active' : ''}`}
                                        id="nav-investimentos-tab"
                                        data-bs-toggle="tab"
                                        data-bs-target="#nav-users"
                                        type="button"
                                        role="tab"
                                        aria-controls="nav-users"
                                        aria-selected={currentTable === 0}
                                    >
                                        Utilizadores
                                    </button>
                                ) : null}
                                <button
                                    className={`nav-link adm-nav-link ${currentTable === 1 ? 'active' : ''}`}
                                    id="nav-negocios-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#nav-filiais"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-filiais"
                                    aria-selected={currentTable === 1}
                                >
                                    Filiais
                                </button>
                                <button
                                    className={`nav-link adm-nav-link ${currentTable === 2 ? 'active' : ''}`}
                                    id="nav-parcerias-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#nav-departamentos"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-departamentos"
                                    aria-selected={currentTable === 2}
                                >
                                    Departamentos
                                </button>
                            </div>
                        </nav>
                        <div className="tab-content w-100" id="nav-tabContent">
                            {cargo === 1 ? (
                                <div
                                    className={`tab-pane fade show ${currentTable === 0 ? 'active' : ''}`}
                                    id="nav-users"
                                    role="tabpanel"
                                    aria-labelledby="nav-users-tab"
                                    style={{ minHeight: "calc(100vh - 150px)" }}
                                >
                                    <div className="mb-3 mt-3">
                                        {cargo === 1 ? (
                                            <button
                                                className="btn btn-outline-danger me-2 del-btn"
                                                onClick={() => deleteSelectedUsers()}
                                            >
                                                <span className='bi bi-trash-fill' />
                                            </button>
                                        ) : null}
                                        {cargo === 1 ? (
                                            <Link to="/user/create" className="btn btn-outline-success add-btn">
                                                <span className='bi bi-plus-circle' />
                                            </Link>
                                        ) : null}
                                    </div>
                                    {cargo === 1 ? (
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className='th-adm'>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectAllUser}
                                                            onChange={() => handleSelectAll('Utilizador')}
                                                        />
                                                    </th>
                                                    <th scope='col' className='th-adm'>Nome</th>
                                                    {/*<th scope='col' className='th-adm'>Nº Funcionário</th>*/}
                                                    <th scope='col' className='th-adm'>Cargo</th>
                                                    <th scope='col' className='th-adm'>Email</th>
                                                    {/*<th scope='col' className='th-adm'>Nº Telemóvel</th>*/}
                                                    <th scope='col' className='th-adm'>Estado</th>
                                                    <th scope='col' className='th-adm'>Ações</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user) => {
                                                    const canEditUsers = cargo === 1 || Number(user.userId) === Number(loggedInUserId);
                                                    return (
                                                        <tr key={user.userId}>
                                                            {cargo === 1 ? (
                                                                <td className='td-adm'>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedUser.includes(user)}
                                                                        onChange={() => handleItemSelect('Utilizador', user)}
                                                                    />
                                                                </td>
                                                            ) : null}
                                                            <td className='td-adm'>{user.primeiroNome + ' ' + user.ultimoNome}</td>
                                                            {/*<td className='td-adm'>{user.numeroFuncionario ? user.numeroFuncionario : 'N/A'}</td>*/}
                                                            <td className='td-adm'>{getCargoIcon(user.cargoId)}</td>
                                                            <td className='td-adm'>{user.email}</td>
                                                            {/*<td className='td-adm'>{user.telemovel ? user.telemovel : 'N/A'}</td>*/}
                                                            <td className='td-adm'>
                                                                <div
                                                                    className={`status-bar ${user.isAtivo ? 'active' : 'inactive'}`}
                                                                    onClick={() => toggleUserStatus(user)}
                                                                >
                                                                    <div className="status-ball"></div>
                                                                </div>
                                                            </td>
                                                            <td className='td-adm'>
                                                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                                        {canEditUsers ? (
                                                                            <Link to={`/user/update/${user.userId}`} className="btn btn-outline-warning">
                                                                                <span className="bi bi-pen-fill" />
                                                                            </Link>
                                                                        ) : null}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    ) : null}
                                </div>
                            ) : null}
                            <div
                                className={`tab-pane fade show ${currentTable === 1 ? 'active' : ''}`}
                                id="nav-filiais"
                                role="tabpanel"
                                aria-labelledby="nav-filiais-tab"
                                style={{ minHeight: "calc(100vh - 150px)" }}
                            >
                                <div className="mb-3 mt-3">
                                    {cargo === 1 ? (
                                        <button
                                            className="btn btn-outline-danger me-2 del-btn"
                                            onClick={() => deleteSelectedFiliais()}
                                        >
                                            <span className='bi bi-trash-fill' />
                                        </button>
                                    ) : null}
                                    {cargo === 1 ? (
                                        <Link to="/filial/create" className="btn btn-outline-success add-btn">
                                            <span className='bi bi-plus-circle' />
                                        </Link>
                                    ) : null}
                                </div>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            {cargo === 1 ? (
                                                <th scope="col">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectAllFilial}
                                                        onChange={() => handleSelectAll('Filial')}
                                                    />
                                                </th>
                                            ) : null}
                                            <th scope="col" className='th-adm'>Nome</th>
                                            <th scope="col" className='th-adm'>Morada</th>
                                            <th scope="col" className='th-adm'>Email</th>
                                            <th scope="col" className='th-adm'>Telemóvel</th>
                                            {cargo === 1 ? (
                                                <th scope="col" className='th-adm'>Ações</th>
                                            ) : null}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filiais.map((filial) => {
                                            return (
                                                <tr key={filial.filialId}>
                                                    {cargo === 1 ? (
                                                        <td className='td-adm'>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedFilial.includes(filial)}
                                                                onChange={() => handleItemSelect('Filial', filial)}
                                                            />
                                                        </td>
                                                    ) : null}
                                                    <td className='td-adm'>{filial.filialNome}</td>
                                                    <td className='td-adm'>{filial.morada}</td>
                                                    <td className='td-adm'>{filial.email}</td>
                                                    <td className='td-adm'>{filial.telemovel}</td>
                                                    {cargo === 1 ? (
                                                        <td className='td-adm'>
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                                    {cargo === 1 ? (
                                                                        <Link to={`/filial/update/${filial.filialId}`} className="btn btn-outline-warning">
                                                                            <span className="bi bi-pen-fill" />
                                                                        </Link>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    ) : null}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className={`tab-pane fade show ${currentTable === 2 ? 'active' : ''}`}
                                id="nav-departamentos"
                                role="tabpanel"
                                aria-labelledby="nav-departamentos-tab"
                                style={{ minHeight: "calc(100vh - 150px)" }}
                            >
                                <div className='mt-3 mb-3'>
                                    {cargo === 1 ? (
                                        <button
                                            className="btn btn-outline-danger me-2 del-btn"
                                            onClick={() => deleteSelectedDepartamentos()}
                                        >
                                            <span className='bi bi-trash-fill' />
                                        </button>
                                    ) : null}
                                    {cargo === 1 ? (
                                        <Link to="/departamento/create" className="btn btn-outline-success add-btn">
                                            <span className='bi bi-plus-circle' />
                                        </Link>
                                    ) : null}
                                </div>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            {cargo === 1 ? (
                                                <th scope="col">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectAllDepartamento}
                                                        onChange={() => handleSelectAll('Departamento')}
                                                    />
                                                </th>
                                            ) : null}
                                            <th scope="col" className='th-adm'>Nome</th>
                                            <th scope="col" className='th-adm'>Descrição</th>
                                            {cargo === 1 ? (
                                                <th scope="col" className='th-adm'>Ações</th>
                                            ) : null}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {departamentos.map((departamento) => {
                                            return (
                                                <tr key={departamento.departamentoId}>
                                                    {cargo === 1 ? (
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedDepartamento.includes(departamento)}
                                                                onChange={() => handleItemSelect('Departamento', departamento)}
                                                            />
                                                        </td>
                                                    ) : null}
                                                    <td>{departamento.departamentoNome}</td>
                                                    <td>{departamento.descricao}</td>
                                                    {cargo === 1 ? (
                                                        <td>
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                                    {cargo === 1 ? (
                                                                        <Link to={`/departamento/update/${departamento.departamentoId}`} className="btn btn-outline-warning">
                                                                            <span className="bi bi-pen-fill" />
                                                                        </Link>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    ) : null}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </main >
    );
}
