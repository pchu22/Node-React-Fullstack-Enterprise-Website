import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BarChart, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart } from 'recharts';
import { TempusDominus, Namespace } from '@eonasdan/tempus-dominus';
import '@eonasdan/tempus-dominus/dist/css/tempus-dominus.css';
import '../components/area-administrativa/style.css';

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com';

export default function MainReporting() {
  const [investimentos, setInvestimentos] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [parcerias, setParcerias] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [candidaturas, setCandidaturas] = useState([]);
  const [vagas, setVagas] = useState([]);
  const [users, setUsers] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartDataVagas, setChartDataVagas] = useState([]);
  const [chartDataCandidaturaVagasPie, setchartDataCandidaturaVagasPie] = useState([]);
  const [chartDataTiposUser, setchartDataTiposUser] = useState([]);
  const [DataInicial, setDataInicial] = useState(null);
  const [DataFinal, setDataFinal] = useState(null);
  const COLORS = ['#8884d8', '#82ca9d', '#ffbb28', '#ff8042', '#0088FE'];

  const cargoNames = {
    1: 'Administrador',
    2: 'Gestor',
    3: 'Colaborador',
    4: 'Candidato',
    5: 'Visitante',
  };

  const cargoColors = {
    1: '#8884d8', // Administrador
    2: '#82ca9d', // Gestor
    3: '#ffbb28', // Colaborador
    4: '#ff8042', // Candidato
    5: '#0088FE', // Visitante
  };
  const loggedInUserId = localStorage.getItem('userId');

  useEffect(() => {
    loadInvestimentos();
    loadNegocios();
    loadParcerias();
    loadProjetos();
    loadUsers();
    loadCandidaturas();
    loadVagas();
  }, []);

  useEffect(() => {
    const filteredInvestimentos = filterDataByDateRange(investimentos);
    const filteredNegocios = filterDataByDateRange(negocios);
    const filteredParcerias = filterDataByDateRange(parcerias);
    const filteredProjetos = filterDataByDateRange(projetos);
    const filteredCandidaturas = filterDataByDateRange(candidaturas);
    const filteredVagas = filterDataByDateRange(vagas);

    const countInvestimentos = filteredInvestimentos.length;
    const countNegocios = filteredNegocios.length;
    const countParcerias = filteredParcerias.length;
    const countProjetos = filteredProjetos.length;
    const countCandidaturas = filteredCandidaturas.length;
    const countVagas = filteredVagas.length;
    const countUser = users.length;

    const chartData = [
      { nome: 'Investimentos', Numero: countInvestimentos },
      { nome: 'Negócios', Numero: countNegocios },
      { nome: 'Parcerias', Numero: countParcerias },
      { nome: 'Projetos', Numero: countProjetos },
    ];

    const chartDataCandidaturaVagasPie = [
      { nome: 'Candidaturas', Numero: countCandidaturas },
      { nome: 'Vagas', Numero: countVagas },
    ];

    setChartData(chartData);
    setchartDataCandidaturaVagasPie(chartDataCandidaturaVagasPie);

    const initializeTempusDominus = () => {
      const linkedPicker1Element = document.getElementById('datetimepicker1');
      const linked1 = new TempusDominus(linkedPicker1Element, {
        display: {
          theme: 'light',
          placement: 'bottom',
          icons: {
            type: 'icons',
            time: 'bi bi-clock',
            date: 'bi bi-calendar',
            up: 'bi bi-arrow-up',
            down: 'bi bi-arrow-down',
            previous: 'bi bi-chevron-left',
            next: 'bi bi-chevron-right',
            today: 'bi bi-calendar-check',
            clear: 'bi bi-trash',
            close: 'bi bi-xmark',
          },
        },
        localization: {
          hourCycle: 'h23',
          format: 'LLLL',
        },
      });
      const linked2 = new TempusDominus(document.getElementById('datetimepicker2'), {
        useCurrent: false,
        display: {
          theme: 'light',
          placement: 'bottom',
          icons: {
            type: 'icons',
            time: 'bi bi-clock',
            date: 'bi bi-calendar',
            up: 'bi bi-arrow-up',
            down: 'bi bi-arrow-down',
            previous: 'bi bi-chevron-left',
            next: 'bi bi-chevron-right',
            today: 'bi bi-calendar-check',
            clear: 'bi bi-trash',
            close: 'bi bi-xmark',
          },
        },
        localization: {
          hourCycle: 'h23',
          format: 'LLLL',
        },
      });

      linkedPicker1Element.addEventListener(Namespace.events.change, (e) => {
        linked2.updateOptions({
          restrictions: {
            minDate: e.detail.date,
          },
        });
      });

      const subscription = linked2.subscribe(Namespace.events.change, (e) => {
        linked1.updateOptions({
          restrictions: {
            maxDate: e.date,
          },
        });
      });
    };

    initializeTempusDominus();

    const chartDataVagas = filteredVagas.map((vaga) => ({
      nome: vaga.titulo,
      Numero: candidaturas.filter((candidatura) => candidatura.vagaId === vaga.vagaId).length,
    }));
    setChartDataVagas(chartDataVagas);

    const roleCount = {};
    users.forEach((user) => {
      if (roleCount[user.cargoId]) {
        roleCount[user.cargoId]++;
      } else {
        roleCount[user.cargoId] = 1;
      }
    });

    const chartDataTiposUser = [1, 2, 3, 4, 5].map((cargoId) => ({
      nome: cargoNames[cargoId],
      Numero: roleCount[cargoId] || 0,
    }));

    const COLORS = chartDataTiposUser.map((entry) => cargoColors[entry.cargoId]);

    setchartDataTiposUser(chartDataTiposUser);
  }, [investimentos, negocios, parcerias, projetos]);

  const filterDataByDateRange = (data) => {
    if (DataInicial && DataFinal) {
      const startDate = new Date(DataInicial);
      const endDate = new Date(DataFinal);

      return data.filter((item) => {
        const itemDate = new Date(item.dataRegisto);
        return itemDate >= startDate && itemDate <= endDate;
      });
    } else {
      return data;
    }
  };

  function loadInvestimentos() {
    const url = baseURL + '/investimento/list';

    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          const filteredInvestimentos = filterDataByDateRange(data);
          setInvestimentos(filteredInvestimentos);
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

  const handleDataInicialChange = (selectedDate) => {
    console.log('Selected Data Inicial:', selectedDate);
    setDataInicial(selectedDate);
  };

  const handleDataFinalChange = (selectedDate) => {
    console.log('Selected Data Final:', selectedDate);
    setDataFinal(selectedDate);
  };

  function loadCandidaturas() {
    const url = baseURL + '/candidatura/list';

    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          const filteredCandidaturas = filterDataByDateRange(data);
          setCandidaturas(filteredCandidaturas);
        } else {
          Swal.fire('Error Web Service', 'Lista de candidaturas indisponível!', 'error');
        }
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  }

  function loadVagas() {
    const url = baseURL + '/vaga/list';

    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          const filteredVagas = filterDataByDateRange(data);
          setVagas(filteredVagas);
        } else {
          Swal.fire('Error Web Service', 'Lista de vagas indisponível!', 'error');
        }
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  }

  const loadData = () => {
    loadInvestimentos();
    loadNegocios();
    loadParcerias();
    loadProjetos();
    loadUsers();
    loadCandidaturas();
    loadVagas();
  };

  return (
    <main className="main-reporting">
      <div className="container container-reporting">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12 mt-5">
                <div className="card card-table" style={{ width: '100%' }}>
                  <div className="card-header">
                    <h5 className="text-center">
                      <br />
                      Selecione o Período
                    </h5>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="form-group row">
                        <label htmlFor="datetimepicker1" className="col-sm-3 col-form-label">
                          Data Inicial
                        </label>
                        <div
                          className="input-group"
                          id="datetimepicker1"
                          data-td-target-input="nearest"
                          data-td-target-toggle="nearest"
                        >
                          <input
                            id="datetimepicker1Input"
                            type="text"
                            className="form-control shadow-none"
                            data-td-target="#datetimepicker1"
                            placeholder="Escolha uma data inicial"
                            readOnly
                          />
                          <span
                            className="input-group-text"
                            data-td-target="#datetimepicker1"
                            data-td-toggle="datetimepicker"
                          >
                            <span className="bi bi-calendar"></span>
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="datetimepicker2" className="col-sm-3 col-form-label">
                          Data Final
                        </label>
                        <div
                          className="input-group"
                          id="datetimepicker2"
                          data-td-target-input="nearest"
                          data-td-target-toggle="nearest"
                        >
                          <input
                            id="datetimepicker2Input"
                            type="text"
                            className="form-control shadow-none"
                            data-td-target="#datetimepicker2"
                            placeholder="Escolha uma data final"
                            readOnly
                          />
                          <span
                            className="input-group-text"
                            data-td-target="#datetimepicker2"
                            data-td-toggle="datetimepicker"
                          >
                            <span className="bi bi-calendar"></span>
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-sm-12 d-flex justify-content-center">
                          <button type="button" className="btn btn-outline-success" onClick={loadData}>
                            Aplicar Filtro
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mt-5">
                <div className="card card-table" style={{ width: '100%' }}>
                  <div className="card-header">
                    <h5 className="text-center">Total de Oportunidades</h5>
                  </div>
                  <div className="card-body">
                    <BarChart
                      width={500}
                      height={300}
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nome" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Numero" fill="#8884d8" />
                    </BarChart>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mt-5">
                <div className="card card-table" style={{ width: '100%' }}>
                  <div className="card-header">
                    <h5 className="text-center">Número de Candidaturas</h5>
                  </div>
                  <div className="card-body">
                    <PieChart width={500} height={300}>
                      <Pie
                        data={chartDataCandidaturaVagasPie}
                        dataKey="Numero"
                        nameKey="nome"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {chartDataCandidaturaVagasPie.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mt-5">
                <div className="card card-table" style={{ width: '100%' }}>
                  <div className="card-header">
                    <h5 className="text-center">Relação Candidaturas/Vagas</h5>
                  </div>
                  <div className="card-body">
                    <BarChart
                      width={500}
                      height={300}
                      data={chartDataVagas}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nome" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Numero" fill="#8884d8" />
                    </BarChart>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mt-5">
                <div className="card card-table" style={{ width: '100%' }}>
                  <div className="card-header">
                    <h5 className="text-center">Número de Utilizadores por Cargo</h5>
                  </div>
                  <div className="card-body">
                    <BarChart
                      width={500}
                      height={300}
                      data={chartDataTiposUser}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="nome" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Numero" fill="#8884d8" />
                    </BarChart>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mt-5">
                <div className="card card-table" style={{ width: '100%' }}>
                  <div className="card-header">
                    <h5 className="text-center">Relatório de Tipos de Utilizador</h5>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart width={500} height={400}>
                        <Pie
                          data={chartDataTiposUser}
                          dataKey="Numero"
                          nameKey="nome"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          label
                        >
                          {chartDataTiposUser.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
