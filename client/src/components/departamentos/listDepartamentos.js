import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com';

export default function ListDepartamento() {
  const [departamentos, setDepartamentos] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDepartamento, setSelectedDepartamento] = useState([]);

  useEffect(() => {
    loadDepartamento();
  }, []);

  function loadDepartamento() {
    const url = baseURL + '/departamento/list';

    axios.get(url)
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

  function handleDepartamentolSelect(departamento) {
    const updateSelectedDepartamento = selectedDepartamento.includes(departamento)
      ? selectedDepartamento.filter(selectedDepartamento => selectedDepartamento !== departamento)
      : [...selectedDepartamento, departamento];

    setSelectedDepartamento(updateSelectedDepartamento);
  }

  function handleSelectAll() {
    if (selectAll) {
        setSelectedDepartamento([]);
    } else {
        setSelectedDepartamento(departamentos);
    }
    setSelectAll(!selectAll);
  }

  function handleDeleteSelected() {
    Swal.fire({
      title: 'Tem a certeza que deseja apagar os departamentos selecionados?',
      text: 'Após a eliminação dos departamentos não será possível a sua visualização!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Apagar departamentos',
      cancelButtonText: 'Manter departamentos',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSelectedDepartamentos();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado...', 'Não foi possível apagar os departamentos!', 'error');
      }
    });
  }

  function deleteSelectedDepartamentos() {
    const url = baseURL + '/departamento/delete';
    const departamentoIds = selectedDepartamento.map(departamento => departamento.departamentoId);

    axios
      .post(url, {departamentoIds})
      .then((res) => {
        if (res.data.success) {
          Swal.fire('Apagado!', 'Os departamentos foram apagados com sucesso!', 'success');
          loadDepartamento();
        }
      })
      .catch((err) => {
        alert('Error: ' + err);
      });
  }

  function renderDepartamentos() {
    return departamentos.map((departamento, index) => (
      <tr className="user-row" key={index}>
        <td>
          <input
            type="checkbox"
            checked={selectedDepartamento.includes(departamento)}
            onChange={() => handleDepartamentolSelect(departamento)}
          />
        </td>
        <td>{index + 1}</td>
        <td>{departamento.departamentoNome}</td>
        <td>{departamento.descricao}</td>
        <td>
          <Link className="btn btn-outline-info" to={`/departamento/update/${departamento.departamentoId}`}>
            Editar
          </Link>
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <div className="button-container">
        <button className="btn btn-outline-danger" onClick={handleDeleteSelected}>
          Apagar Departamentos Selecionados
        </button>
      </div>
      <table className="table table-hover table-striped">
        <thead className="thead-dark">
          <tr>
            <th className="list-header">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="list-header">ID</th>
            <th className="list-header">Nome</th>
            <th className="list-header">Descrição</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {departamentos.length > 0 ? (
            renderDepartamentos()
          ) : (
            <tr>
              <td colSpan="5">Não existem departamentos!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
