import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import logo from '../../../assets/logo.png';
import '../oportunidades.css'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

const UpdateProjeto = () => {
    const [projeto, setProjeto] = useState(null);
    const [projetoNome, setProjetoNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [orcamento, setOrcamento] = useState("");
    const [prioridade, setPrioridade] = useState("");
    const [inicio, setInicio] = useState("");
    const [fim, setFim] = useState("");
    const [tipo, setTipo] = useState("");
    const [dataTipo, setDataTipo] = useState("");


    const navigate = useNavigate();
    const { projetoId } = useParams();

    useEffect(() => {
        const url = baseURL + "projeto/get/" + projetoId;
        axios
            .get(url)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    setProjeto(data);
                    setProjetoNome(data.projetoNome)
                    setDescricao(data.descricao);
                    setOrcamento(data.orcamento);
                    setPrioridade(data.prioridade);
                    setInicio(data.dataInicio);
                    setFim(data.dataFim);
                    if (data.tipo) {
                        setTipo(data.tipo.tipoProjetoId);
                    } else {
                        setTipo("");
                    }
                } else {
                    alert("Error Web service");
                }
            })
            .catch((err) => {
                alert("Error server: " + err);
            });

        const urlTipo = baseURL + "tipo-projeto/list";
        axios.get(urlTipo)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    setDataTipo(data);
                } else {
                    alert("Error Web Service");
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Error: " + err);
            });
    }, [projetoId]);

    async function updateProjeto(event) {
        event.preventDefault();

        const systemDate = new Date().toISOString().split("T")[0];

        if (inicio < systemDate) {
          Swal.fire({
            title: "A data de início deve ser igual ou posterior à data atual."
          });
          return;
        }
      
        if (fim < inicio || fim < systemDate) {
          Swal.fire({
            title: "A data de fim deve ser igual ou posterior à data de início e à data atual."
          });
          return;
        }

        try {
            const url = baseURL + "projeto/update/" + projetoId;
            const datapost = {
                projetoNome: projetoNome,
                descricao: descricao,
                orcamento: orcamento,
                prioridade: prioridade,
                dataInicio: inicio,
                dataFim: fim,
                tipoProjetoId: tipo
            };

            const response = await axios.put(url, datapost);

            if (response.data.success) {
                Swal.fire({
                    title: "Projeto alterado com sucesso!"
                }).then(() => {
                    navigate("/oportunidade");
                });
            } else {
                Swal.fire({
                    title: "Erro!"
                });
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                title: err.response.data.message
            });
        }
    }

    if (!projeto) {
        return <div>Loading...</div>;
    }

    return (
        <div className="wrapper">
            <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                <div className="card">
                    <div className="header-image">
                        <img src={logo} alt="Logo-Softinsa" />
                    </div>
                    <div className="card-body">
                        <form onSubmit={updateProjeto}>
                            <div class="textarea-container">
                                <label htmlFor="inputNome" style={{ marginRight: '10px' }}>Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nome"
                                    id="inputNome"
                                    value={projetoNome}
                                    onChange={(event) => setProjetoNome(event.target.value)}
                                />
                            </div>
                            <div class="textarea-container">
                                <label htmlFor="inputOrcamento" style={{ marginRight: '10px' }}>Orçamento</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Orçamento"
                                    id="inputOrcamento"
                                    value={orcamento}
                                    onChange={(event) => setOrcamento(event.target.value)}
                                />
                            </div>
                            <div class="textarea-container">
                                <label htmlFor="inputDesc" style={{ marginRight: '10px' }}>Descrição</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Descrição"
                                    id="inputDesc"
                                    value={descricao}
                                    onChange={(event) => setDescricao(event.target.value)}
                                />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputDate" style={{ marginRight: '10px' }}>Início</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="inputDate"
                                    value={inicio}
                                    onChange={(event) => setInicio(event.target.value)}
                                />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputDate" style={{ marginRight: '10px' }}>Fim</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="inputDate"
                                    value={fim}
                                    onChange={(event) => setFim(event.target.value)}
                                />
                            </div>
                            <div class="textarea-container">
                                <label htmlFor="inputPrioridade" style={{ marginRight: '10px' }}>Prioridade</label>
                                <select
                                    type="text"
                                    className="form-control"
                                    placeholder="Selecione a Prioridade"
                                    id="inputPrioridade"
                                    value={prioridade}
                                    onChange={(event) => setPrioridade(event.target.value)}
                                >
                                    <option defaultValue>Selecione a Prioridade</option>
                                    <option value="1">Urgente</option>
                                    <option value="2">Normal</option>
                                    <option value="3">Pouco Urgente</option>
                                </select>
                            </div>
                            <div class="textarea-container">
                                <label htmlFor="inputTipo" style={{ marginRight: '10px' }}>Tipo</label>
                                <select
                                    type="text"
                                    className="form-control"
                                    placeholder="Selecione um Tipo"
                                    id="inputTipo"
                                    value={tipo}
                                    onChange={(event) => setTipo(event.target.value)}
                                >
                                    <option>Selecione um Tipo</option>
                                    <FillTipo />
                                </select>
                            </div>
                            <div className="btn-wrapper">
                                <div className="btn-group">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-success">
                                        <span className="bi bi-check" />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger cancel-btn"
                                        onClick={() => navigate('/oportunidade')}
                                        style={{ marginLeft: '10px' }}>
                                        <span className="bi bi-x-octagon-fill" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

    function FillTipo() {
        return dataTipo.map((data, index) => {
            return (
                <option key={index} value={data.tipoProjetoId}>
                    {data.tipoProjetoNome}
                </option>
            );
        });
    }

};

export default UpdateProjeto;
