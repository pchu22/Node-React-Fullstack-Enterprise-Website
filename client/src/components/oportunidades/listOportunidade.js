import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './oportunidades.css'

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com';

export default function ListOportunidades() {
  const [investimentos, setInvestimentos] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [parcerias, setParcerias] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedInvestimento, setSelectedInvestimento] = useState([]);
  const [selectedNegocio, setSelectedNegocio] = useState([]);
  const [selectedParceria, setSelectedParceria] = useState([]);
  const [selectedProjeto, setSelectedProjeto] = useState([]);

  const [selectAllInvestimento, setSelectAllInvestimento] = useState(false);
  const [selectAllNegocio, setSelectAllNegocio] = useState(false);
  const [selectAllParceria, setSelectAllParceria] = useState(false);
  const [selectAllProjeto, setSelectAllProjeto] = useState(false);

  const [selectAll, setSelectAll] = useState(false);
  const [cargo, setCargo] = useState('');

  const [currentTable, setCurrentTable] = useState(0);
  const loggedInUserId = localStorage.getItem('userId');


  useEffect(() => {
    loadInvestimentos();
    loadNegocios();
    loadParcerias();
    loadProjetos();
    loadUserCargo();
    loadUsers();
  }, []);

  function loadInvestimentos() {
    const url = baseURL + '/investimento/list';

    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setInvestimentos(data);
        } else {
          Swal.fire('Error Web Service', 'Lista de investimentos indisponível!', 'error');
        }
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  }

  function loadNegocios() {
    const url = baseURL + '/negocio/list';

    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setNegocios(data);
        } else {
          Swal.fire('Error Web Service', 'Lista de negócios indisponível!', 'error');
        }
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  }

  function loadParcerias() {
    const url = baseURL + '/parceria/list';

    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setParcerias(data);
        } else {
          Swal.fire('Error Web Service', 'Lista de parcerias indisponível!', 'error');
        }
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  }

  function loadProjetos() {
    const url = baseURL + '/projeto/list';

    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setProjetos(data);
        } else {
          Swal.fire('Error Web Service', 'Lista de projetos indisponível!', 'error');
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

  function loadUsers() {
    const url = baseURL + '/user/list';

    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          setUsers(data);
        } else {
          Swal.fire('Error Web Service', 'Lista de utilizadores indisponível!', 'error');
        }
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  }

  function handleItemSelect(type, item) {
    let updatedSelectedItems;

    switch (type) {
      case 'Investimento':
        updatedSelectedItems = selectedInvestimento.includes(item)
          ? selectedInvestimento.filter((selectedItem) => selectedItem !== item)
          : [...selectedInvestimento, item];
        setSelectedInvestimento(updatedSelectedItems);
        break;

      case 'Negocio':
        updatedSelectedItems = selectedNegocio.includes(item)
          ? selectedNegocio.filter((selectedItem) => selectedItem !== item)
          : [...selectedNegocio, item];
        setSelectedNegocio(updatedSelectedItems);
        break;

      case 'Parceria':
        updatedSelectedItems = selectedParceria.includes(item)
          ? selectedParceria.filter((selectedItem) => selectedItem !== item)
          : [...selectedParceria, item];
        setSelectedParceria(updatedSelectedItems);
        break;

      case 'Projeto':
        updatedSelectedItems = selectedProjeto.includes(item)
          ? selectedProjeto.filter((selectedItem) => selectedItem !== item)
          : [...selectedProjeto, item];
        setSelectedProjeto(updatedSelectedItems);
        break;

      default:
        break;
    }
  }

  function handleSelectAll(type) {
    let updatedSelectedItems;
    let selectedItems;

    switch (type) {
      case 'Investimento':
        selectedItems = selectAll ? [] : investimentos;
        setSelectedInvestimento(selectedItems);
        updatedSelectedItems = selectedItems;
        break;

      case 'Negocio':
        selectedItems = selectAll ? [] : negocios;
        setSelectedNegocio(selectedItems);
        updatedSelectedItems = selectedItems;
        break;

      case 'Parceria':
        selectedItems = selectAll ? [] : parcerias;
        setSelectedParceria(selectedItems);
        updatedSelectedItems = selectedItems;
        break;

      case 'Projeto':
        selectedItems = selectAll ? [] : projetos;
        setSelectedProjeto(selectedItems);
        updatedSelectedItems = selectedItems;
        break;

      default:
        break;
    }

    setSelectAll(!selectAll);
    return updatedSelectedItems;
  }

  function deleteSelectedInvestimentos() {
    const url = baseURL + '/investimento/delete';
    const investimentoIds = selectedInvestimento.map((investimento) => investimento.investimentoId);

    axios
      .post(url, { investimentoIds })
      .then((res) => {
        if (res.data.success) {
          Swal.fire('Ação executada com sucesso!', 'Os investimentos foram apagados com sucesso!', 'success');
          loadInvestimentos();
        }
      })
      .catch((err) => {
        alert('Error: ' + err);
      });
  }

  function deleteSelectedNegocios() {
    const url = baseURL + '/negocio/delete';
    const negocioIds = selectedNegocio.map((negocio) => negocio.negocioId);

    axios
      .post(url, { negocioIds })
      .then((res) => {
        if (res.data.success) {
          Swal.fire('Ação executada com sucesso!', 'Os negócios foram apagados com sucesso!', 'success');
          loadNegocios();
        }
      })
      .catch((err) => {
        alert('Error: ' + err);
      });
  }

  function deleteSelectedParcerias() {
    const url = baseURL + '/parceria/delete';
    const parceriaIds = selectedParceria.map((parceria) => parceria.parceriaId);

    axios
      .post(url, { parceriaIds })
      .then((res) => {
        if (res.data.success) {
          Swal.fire('Ação executada com sucesso!', 'As parcerias foram apagados com sucesso!', 'success');
          loadParcerias();
        }
      })
      .catch((err) => {
        alert('Error: ' + err);
      });
  }

  function deleteSelectedProjetos() {
    const url = baseURL + '/projeto/delete';
    const projetoIds = selectedProjeto.map((projeto) => projeto.projetoId);

    axios
      .post(url, { projetoIds })
      .then((res) => {
        if (res.data.success) {
          Swal.fire('Ação executada com sucesso!', 'Os projetos foram apagados com sucesso!', 'success');
          loadProjetos();
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

  function permissionInvestimentos() {
    return (
      cargo === 1 || cargo === 2 ||
      investimentos.some((investimento) => Number(investimento.userId) === Number(loggedInUserId))
    );
  }

  function permissionNegocios() {
    return (
      cargo === 1 || cargo === 2 ||
      negocios.some((negocio) => Number(negocio.userId) === Number(loggedInUserId))
    );
  }

  function permissionParcerias() {
    return (
      cargo === 1 || cargo === 2 ||
      parcerias.some((parceria) => Number(parceria.userId) === Number(loggedInUserId))
    );
  }

  function permissionProjetos() {
    return (
      cargo === 1 || cargo === 2 ||
      projetos.some((projeto) => Number(projeto.userId) === Number(loggedInUserId))
    );
  }

  return (
    <div className="container container-oportunidades">
      <h1 className="mt-5 mb-5"><br /></h1>
      <div className="row">
        <div className="col-md-12">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                className={`nav-link op-nav-link ${currentTable === 0 ? 'active' : ''}`}
                id="nav-investimentos-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-investimentos"
                type="button"
                role="tab"
                aria-controls="nav-investimentos"
                aria-selected={currentTable === 0}
              >
                Investimentos
              </button>
              <button
                className={`nav-link op-nav-link ${currentTable === 1 ? 'active' : ''}`}
                id="nav-negocios-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-negocios"
                type="button"
                role="tab"
                aria-controls="nav-negocios"
                aria-selected={currentTable === 1}
              >
                Negócios
              </button>
              <button
                className={`nav-link op-nav-link ${currentTable === 2 ? 'active' : ''}`}
                id="nav-parcerias-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-parcerias"
                type="button"
                role="tab"
                aria-controls="nav-parcerias"
                aria-selected={currentTable === 2}
              >
                Parcerias
              </button>
              <button
                className={`nav-link op-nav-link ${currentTable === 3 ? 'active' : ''}`}
                id="nav-projetos-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-projetos"
                type="button"
                role="tab"
                aria-controls="nav-projetos"
                aria-selected={currentTable === 3}
              >
                Projetos
              </button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div
              className={`tab-pane fade show ${currentTable === 0 ? 'active' : ''}`}
              id="nav-investimentos"
              role="tabpanel"
              aria-labelledby="nav-investimentos-tab"
            >
              <div className="mb-3 mt-3">
                {cargo === 1 ? (
                  <button
                    className="btn btn-outline-danger me-2"
                    onClick={() => deleteSelectedInvestimentos()}
                  >
                    <span className='bi bi-trash-fill' />
                  </button>
                ) : null}
                <Link to="/oportunidade/investimento/create" className="btn btn-outline-success">
                  <span className='bi bi-plus-circle' />
                </Link>
              </div>
              {permissionInvestimentos() ? (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      {cargo === 1 ? (
                        <th scope="col">
                          <input
                            type="checkbox"
                            checked={selectAllInvestimento}
                            onChange={() => handleSelectAll('Investimento')}
                          />
                        </th>
                      ) : null}
                      <th scope="col">Investidor</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Montante</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investimentos
                      .filter((investimento) => cargo === 1 || cargo === 2 || Number(investimento.userId) === Number(loggedInUserId))
                      .map((investimento) => {
                        const canEditInvestimentos = Number(investimento.userId) === Number(loggedInUserId);
                        return (
                          <tr key={investimento.investimentoId}>
                            {cargo === 1 ? (
                              <td>
                                <input
                                  type="checkbox"
                                  checked={selectedInvestimento.includes(investimento)}
                                  onChange={() => handleItemSelect('Investimento', investimento)}
                                />
                              </td>
                            ) : null}
                            <td>{getUserName(investimento.userId)}</td>
                            <td>{investimento.descricao}</td>
                            <td>{investimento.montante} €</td>
                            <td>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                  {canEditInvestimentos ? (
                                    <Link to={`/oportunidade/investimento/update/${investimento.investimentoId}`} className="btn btn-outline-warning">
                                      <span className="bi bi-pen-fill"/>
                                    </Link>
                                  ) : null}
                                  {cargo === 1 || cargo === 2 ? (
                                    <>
                                      <button className="btn btn-outline-success" style={{ marginLeft: '10px' }}>
                                        <span className="bi bi-check-lg" />
                                      </button>
                                      <button className="btn btn-outline-danger" style={{ marginLeft: '10px' }}>
                                        <span className="bi bi-x-lg" />
                                      </button>
                                    </>
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
            <div
              className={`tab-pane fade show ${currentTable === 1 ? 'active' : ''}`}
              id="nav-negocios"
              role="tabpanel"
              aria-labelledby="nav-negocios-tab"
            >
              <div className="mb-3 mt-3">
                {cargo === 1 ? (
                  <button
                    className="btn btn-outline-danger me-2"
                    onClick={() => deleteSelectedNegocios()}
                  >
                    <span className='bi bi-trash-fill' />
                  </button>
                ) : null}
                <Link to="/oportunidade/negocio/create" className="btn btn-outline-success">
                  <span className='bi bi-plus-circle' />
                </Link>
              </div>
              {permissionNegocios() ? (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      {cargo === 1 ? (
                        <th scope="col">
                          <input
                            type="checkbox"
                            checked={selectAllNegocio}
                            onChange={() => handleSelectAll('Negocio')}
                          />
                        </th>
                      ) : null}
                      <th scope="col">Nome</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Orçamento</th>
                      <th scope="col">Email</th>
                      <th scope="col">Telemóvel</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {negocios
                      .filter((negocio) => cargo === 1 || cargo === 2 || Number(negocio.userId) === Number(loggedInUserId))
                      .map((negocio) => {
                        const canEditNegocios = Number(negocio.userId) === Number(loggedInUserId);
                        return (
                          <tr key={negocio.negocioId}>
                            {cargo === 1 ? (
                              <td>
                                <input
                                  type="checkbox"
                                  checked={selectedNegocio.includes(negocio)}
                                  onChange={() => handleItemSelect('Negocio', negocio)}
                                />
                              </td>
                            ) : null}
                            <td>{getUserName(negocio.userId)}</td>
                            <td>{negocio.descricao}</td>
                            <td>{negocio.orcamento} €</td>
                            <td>{negocio.email}</td>
                            <td>{negocio.telemovel}</td>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <div style={{ display: 'flex', flexDirection: 'row' }}>
                                {canEditNegocios ? (
                                  <Link to={`/oportunidade/negocio/update/${negocio.negocioId}`} className="btn btn-outline-warning">
                                    <span className="bi bi-pen-fill" />
                                  </Link>
                                ) : null}
                                {cargo === 1 || cargo === 2 ? (
                                  <>
                                    <button className="btn btn-outline-success" style={{ marginLeft: '10px' }}>
                                      <span className="bi bi-check-lg" />
                                    </button>
                                    <button className="btn btn-outline-danger" style={{ marginLeft: '10px' }}>
                                      <span className="bi bi-x-lg" />
                                    </button>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              ) : null}
            </div>
            <div
              className={`tab-pane fade show ${currentTable === 2 ? 'active' : ''}`}
              id="nav-parcerias"
              role="tabpanel"
              aria-labelledby="nav-parcerias-tab"
            >
              <div className="mb-3 mt-3">
                {cargo === 1 ? (
                  <button
                    className="btn btn-outline-danger me-2"
                    onClick={() => deleteSelectedParcerias()}
                  >
                    <span className='bi bi-trash-fill' />
                  </button>
                ) : null}
                <Link to="/oportunidade/parceria/create" className="btn btn-outline-success">
                  <span className='bi bi-plus-circle' />
                </Link>
              </div>
              {permissionParcerias() ? (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      {cargo === 1 ? (
                        <th scope="col">
                          <input
                            type="checkbox"
                            checked={selectAllParceria}
                            onChange={() => handleSelectAll('Parceria')}
                          />
                        </th>
                      ) : null}
                      <th scope="col">Parceiro</th>
                      <th scope="col">Email</th>
                      <th scope="col">Telemóvel</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parcerias
                      .filter((parceria) => cargo === 1 || cargo === 2 || Number(parceria.userId) === Number(loggedInUserId))
                      .map((parceria) => {
                        const canEditParcerias = Number(parceria.userId) === Number(loggedInUserId);
                        return (
                          <tr key={parceria.parceriaId}>
                            {cargo === 1 ? (
                              <td>
                                <input
                                  type="checkbox"
                                  checked={selectedParceria.includes(parceria)}
                                  onChange={() => handleItemSelect('Parceria', parceria)}
                                />
                              </td>
                            ) : null}
                            <td>{parceria.nomeParceiro}</td>
                            <td>{parceria.email}</td>
                            <td>{parceria.telemovel}</td>
                            <td>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                  {canEditParcerias ? (
                                    <Link to={`/oportunidade/parceria/update/${parceria.parceriaId}`} className="btn btn-outline-warning">
                                      <span className="bi bi-pen-fill" />
                                    </Link>
                                  ) : null}
                                  {cargo === 1 || cargo === 2 ? (
                                    <>
                                      <button className="btn btn-outline-success" style={{ marginLeft: '10px' }}>
                                        <span className="bi bi-check-lg" />
                                      </button>
                                      <button className="btn btn-outline-danger" style={{ marginLeft: '10px' }}>
                                        <span className="bi bi-x-lg" />
                                      </button>
                                    </>
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
            <div
              className={`tab-pane fade show ${currentTable === 3 ? 'active' : ''}`}
              id="nav-projetos"
              role="tabpanel"
              aria-labelledby="nav-projetos-tab"
            >
              <div className="mb-3 mt-3">
                {cargo === 1 ? (
                  <button
                    className="btn btn-outline-danger me-2"
                    onClick={() => deleteSelectedProjetos()}
                  >
                    <span className='bi bi-trash-fill' />
                  </button>
                ) : null}
                <Link to="/oportunidade/projeto/create" className="btn btn-outline-success">
                  <span className='bi bi-plus-circle' />
                </Link>
              </div>
              {permissionProjetos() ? (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      {cargo === 1 ? (
                        <th scope="col">
                          <input
                            type="checkbox"
                            checked={selectAllProjeto}
                            onChange={() => handleSelectAll('Projeto')}
                          />
                        </th>
                      ) : null}
                      <th scope="col">Prioridade</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Projeto</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Orçamento</th>
                      <th scope="col">Início</th>
                      <th scope="col">Fim</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projetos
                      .filter((projeto) => cargo === 1 || cargo === 2 || Number(projeto.userId) === Number(loggedInUserId))
                      .map((projeto) => {
                        const canEditProjetos = Number(projeto.userId) === Number(loggedInUserId);
                        return (
                          <tr key={projeto.projetoId}>
                            {cargo === 1 ? (
                              <td>
                                <input
                                  type="checkbox"
                                  checked={selectedProjeto.includes(projeto)}
                                  onChange={() => handleItemSelect('Projeto', projeto)}
                                />
                              </td>
                            ) : null}
                            <td>
                              {projeto.prioridade === '1' ? 'Urgente' : projeto.prioridade === '2' ? 'Normal' : 'S/ Urgência'}
                            </td>
                            <td>{getUserName(projeto.userId)}</td>
                            <td>{projeto.projetoNome}</td>
                            <td>{projeto.descricao}</td>
                            <td>{projeto.orcamento} €</td>
                            <td>{projeto.dataInicio ? new Date(projeto.dataInicio).toLocaleDateString('en-GB') : 'N/A'}</td>
                            <td>{projeto.dataFim ? new Date(projeto.dataFim).toLocaleDateString('en-GB') : 'N/A'}</td>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <div style={{ display: 'flex', flexDirection: 'row' }}>
                                {canEditProjetos ? (
                                  <Link to={`/oportunidade/projeto/update/${projeto.projetoId}`} className="btn btn-outline-warning">
                                    <span className="bi bi-pen-fill" />
                                  </Link>
                                ) : null}
                                {cargo === 1 || cargo === 2 ? (
                                  <>
                                    <button className="btn btn-outline-success" style={{ marginLeft: '10px' }}>
                                      <span className="bi bi-check-lg" />
                                    </button>
                                    <button className="btn btn-outline-danger" style={{ marginLeft: '10px' }}>
                                      <span className="bi bi-x-lg" />
                                    </button>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
