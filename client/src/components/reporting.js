import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TempusDominus, Namespace } from '@eonasdan/tempus-dominus';
import '@eonasdan/tempus-dominus/dist/css/tempus-dominus.css';

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com';

export default function MainReporting() {
  const [investimentos, setInvestimentos] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [parcerias, setParcerias] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [users, setUsers] = useState([])
  const [chartData, setChartData] = useState([])
  const [DataInicial, setDataInicial] = useState(null);
  const [DataFinal, setDataFinal] = useState(null);

  const loggedInUserId = localStorage.getItem('userId');

  useEffect(() => {
    loadInvestimentos();
    loadNegocios();
    loadParcerias();
    loadProjetos();
    loadUsers();

  }, []);

  useEffect(() => {
    const filteredInvestimentos = filterDataByDateRange(investimentos);
    const filteredNegocios = filterDataByDateRange(negocios);
    const filteredParcerias = filterDataByDateRange(parcerias);
    const filteredProjetos = filterDataByDateRange(projetos);

    const countInvestimentos = filteredInvestimentos.length;
    const countNegocios = filteredNegocios.length;
    const countParcerias = filteredParcerias.length;
    const countProjetos = filteredProjetos.length;

    const chartData = [
      { nome: 'Investimentos', Numero: countInvestimentos },
      { nome: 'Negócios', Numero: countNegocios },
      { nome: 'Parcerias', Numero: countParcerias },
      { nome: 'Projetos', Numero: countProjetos },
    ];

    setChartData(chartData);

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
            close: 'bi bi-xmark'
          },
        },
        localization: {
          hourCycle: 'h23',
          format: 'LLLL'
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
            close: 'bi bi-xmark'
          },
        },
        localization: {
          hourCycle: 'h23',
          format: 'LLLL'
        }
      });

      //using event listeners
      linkedPicker1Element.addEventListener(Namespace.events.change, (e) => {
        linked2.updateOptions({
          restrictions: {
            minDate: e.detail.date,
          },
        });
      });

      //using subscribe method
      const subscription = linked2.subscribe(Namespace.events.change, (e) => {
        linked1.updateOptions({
          restrictions: {
            maxDate: e.date,
          },
        });
      });
    }

    initializeTempusDominus();
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
          const filteredInvestimentos = filterDataByDateRange(data); // Filter the data
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

  const handleDataInicialChange = (event) => {
    const selectedDate = event.target.value;
    console.log('Selected Data Inicial:', selectedDate);
    setDataInicial(selectedDate);
  };

  const handleDataFinalChange = (event) => {
    const selectedDate = event.target.value;
    console.log('Selected Data Final:', selectedDate);
    setDataFinal(selectedDate);
  };

  return (
    <main className="main-adm">
      <div className="container container-adm">
        <h1 className="mt-5 mb-5"><br /></h1>
        <div className="row">
          <div className="col-md-12">
            <div class='row py-3'>
              <div class="col-md-6 form-group pt-2 px-4">
                <label for="datetimepicker1Input" class="form-label d-flex align-items-center justify-content-center pb-1"
                >Data Inicial</label
                >
                <div
                  class="input-group"
                  id="datetimepicker1"
                  data-td-target-input="nearest"
                  data-td-target-toggle="nearest"
                >
                  <input
                    id="datetimepicker1Input"
                    type="text"
                    class="form-control shadow-none"
                    data-td-target="#datetimepicker1"
                    placeholder='Escolha uma data inicial'
                    value={DataInicial}
                    onChange={handleDataInicialChange}

                  />
                  <span
                    class="input-group-text"
                    data-td-target="#datetimepicker1"
                    data-td-toggle="datetimepicker"

                  >
                    <span class="bi bi-calendar"></span>
                  </span>
                </div>
              </div>
              <div class="col-md-6 form-group pt-2 px-4">
                <label for="datetimepicker2Input" class="form-label d-flex align-items-center justify-content-center pb-1"
                >Data Final</label
                >
                <div
                  class="input-group"
                  id="datetimepicker2"
                  data-td-target-input="nearest"
                  data-td-target-toggle="nearest"
                >
                  <input
                    id="datetimepicker2Input"
                    type="text"
                    class="form-control shadow-none"
                    data-td-target="#datetimepicker2"
                    placeholder='Escolha uma data final'
                    value={DataFinal}
                    onChange={handleDataFinalChange}
                  />
                  <span
                    class="input-group-text"
                    data-td-target="#datetimepicker2"
                    data-td-toggle="datetimepicker"

                  >
                    <span class="bi bi-calendar"></span>
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2>Dates from Investimentos</h2>
              <ul>
                {investimentos.map((investimento) => (
                  <li key={investimento.id}>{investimento.dataRegisto}</li>
                ))}
              </ul>
            </div>
            <div className="card" style={{ width: '100%', height: '80%' }}>
              <ResponsiveContainer width="100%" height="90%">
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
              </ResponsiveContainer>
            </div>

          </div>
        </div>
      </div>
    </main >
  );
}