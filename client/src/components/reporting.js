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
  const COLORS = ['#ff8042', '#0088FE'];

  const cargoNames = {
    1: 'Administrador',
    2: 'Gestor',
    3: 'Colaborador',
    4: 'Candidato',
    5: 'Visitante',
  };

  const cargoColors = [
    '#8884d8', // Administrador
    '#82ca9d', // Gestor
    '#ffbb28', // Colaborador
    '#ff8042', // Candidato
    '#0088FE' // Visitante
  ];
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
    const filteredCandidaturas = filterDataByDateRangeDataCriacao(candidaturas);
    const filteredVagas = filterDataByDateRange(vagas);
    const filteredUser = filterDataByDateRange(users)

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
          locale: 'pt-PT',
          format: 'dd/MM/yyyy',
        }
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
          locale: 'pt-PT',
          format: 'dd/MM/yyyy',
        }
      });

      linkedPicker1Element.addEventListener(Namespace.events.change, (e) => {
        const updatedDate = new Date(e.detail.date);
        updatedDate.setHours(0, 0, 1);
        setDataInicial(updatedDate);
        linked2.updateOptions({
          restrictions: {
            minDate: updatedDate,
          },
        });
      });

      const subscription = linked2.subscribe(Namespace.events.change, (e) => {
        const updatedDate = new Date(e.date);
        updatedDate.setHours(23, 59, 59);
        console.log(updatedDate)
        setDataFinal(updatedDate);
        linked1.updateOptions({
          restrictions: {
            maxDate: updatedDate,
          },
        });
      });
    };

    initializeTempusDominus();

  }, [investimentos, negocios, parcerias, projetos]);

  const filterDataByDateRange = (data) => {
    if (DataInicial && DataFinal) {
      const startDate = new Date(DataInicial);
      const endDate = new Date(DataFinal);

      return data.filter((item) => {
        const itemDate = new Date(item.dataRegisto);
        console.log("itemData: " + itemDate)
        console.log("startDate: " + startDate)
        console.log("endDate: " + endDate)
        console.log(itemDate >= startDate && itemDate <= endDate)
        return itemDate >= startDate && itemDate <= endDate;
      });
    } else {
      return data;
    }
  };

  const filterDataByDateRangeDataCriacao = (data) => {
    if (DataInicial && DataFinal) {
      const startDate = new Date(DataInicial);
      const endDate = new Date(DataFinal);

      return data.filter((item) => {
        const itemDate = new Date(item.dataCriacao);
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
          const filteredNegocios = filterDataByDateRange(data);
          setNegocios(filteredNegocios);
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
          const filteredParcerias = filterDataByDateRange(data);
          setParcerias(filteredParcerias);
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
          const filteredProjetos = filterDataByDateRange(data);
          setProjetos(filteredProjetos);
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
          const filteredUser = filterDataByDateRange(data);
          setUsers(filteredUser);
        } else {
          Swal.fire('Error Web Service', 'Lista de utilizadores indisponível!', 'error');
        }
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  }

  function loadCandidaturas() {
    const url = baseURL + '/candidatura/list';

    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.data;
          const filteredCandidaturas = filterDataByDateRangeDataCriacao(data);
          setCandidaturas(filteredCandidaturas)
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
                    <h5 className="text-center">Relação Oportunidades/Tipo de Oportunidade</h5>
                  </div>
                  <div className="card-body">
                    <ResponsiveContainer width="100%" height={400}>
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
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Numero" fill="#0088FE" name="Quantidade" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mt-5">
                <div className="card card-table" style={{ width: '100%' }}>
                  <div className="card-header">
                    <h5 className="text-center">Número de Candidaturas/Número de Vagas Criadas</h5>
                  </div>
                  <div className="card-body">
                    {candidaturas.length > 0 && vagas.length > 0 ? (
                      <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                          <Pie
                            data={chartDataCandidaturaVagasPie}
                            dataKey="Numero"
                            nameKey="nome"
                            cx="50%"
                            cy="50%"
                            fill="#0088FE"
                            label
                          >
                            {chartDataCandidaturaVagasPie.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Legend />
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (<div className="text-center">
                      <h5>Não existem candidaturas, nem vagas criadas entre as datas selecionadas</h5>
                    </div>)}
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
                    {candidaturas.length > 0 && vagas.length > 0 ? (
                      <ResponsiveContainer width="100%" height={400}>
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
                          <YAxis allowDecimals={false} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="Numero" fill="#0088FE" name="Número de Candidatos" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (<div className="text-center">
                      <h5>Não existem candidaturas, nem vagas criadas entre as datas selecionadas</h5>
                    </div>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mt-5">
                <div className="card card-table" style={{ width: '100%' }}>
                  <div className="card-header">
                    <h5 className="text-center">Relação Utilizadores/Cargo</h5>
                  </div>
                  <div className="card-body">
                    {candidaturas.length > 0 && vagas.length > 0 ? (
                      <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                          <Pie
                            data={chartDataTiposUser}
                            dataKey="Numero"
                            nameKey="nome"
                            cx="50%"
                            cy="50%"
                            fill="#8884d8"
                            label
                          >
                            {chartDataTiposUser.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={cargoColors[index % cargoColors.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (<div className="text-center">
                      <h5>Não existem utilizadores registados, entre as datas definidas</h5>
                    </div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main >
  );
}