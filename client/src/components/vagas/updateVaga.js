import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import logo from '../../assets/logo.png'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

const FormVagas = () => {
    const [vaga, setVaga] = useState("")
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [habilitacoesMin, setHabilitacoesMin] = useState("");
    const [experienciaMin, setExperienciaMin] = useState("");
    const [remuneracao, setRemuneracao] = useState("");
    const [isInterna, setIsInterna] = useState(false);
    const [departamento, setDepartamento] = useState(null);
    const [filial, setFilial] = useState(null);
    const [dataDepartamento, setDataDepartamento] = useState([]);
    const [dataFilial, setDataFilial] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);


    const navigate = useNavigate();
    const { vagaId } = useParams();

    useEffect(() => {
        const url = baseURL + "vaga/get/" + vagaId;
        axios.get(url)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    console.log(data);
                    setVaga(data);
                    setTitulo(data.titulo);
                    setDescricao(data.descricao);
                    setHabilitacoesMin(data.habilitacoesMin);
                    setExperienciaMin(data.experienciaMin);
                    setRemuneracao(data.remuneracao);
                    setIsInterna(data.isInterna);
                    if (data.departamento) {
                        setDepartamento(data.departamento.departamentoId);
                    } else {
                        setDepartamento("");
                    }
                    if (data.filial) {
                        setFilial(data.filial.filialId);
                    } else {
                        setFilial("");
                    }
                    setIsDataLoaded(true);
                } else {
                    alert("Error Web service");
                }
            })
            .catch((err) => {
                alert("Error server: " + err);
            });

        const urlDepartamento = baseURL + "departamento/list";
        axios.get(urlDepartamento)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    setDataDepartamento(data);
                } else {
                    alert("Error Web Service");
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Error: " + err);
            });

        const urlFilial = baseURL + "filial/list";
        axios.get(urlFilial)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    setDataFilial(data);
                } else {
                    alert("Error Web Service");
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Error: " + err);
            });
    }, []);

    return (
        <div className='wrapper'>
            <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
                <div className="card">
                    <div className="header-image">
                        <img src={logo} alt="Logo-Softinsa" />
                    </div>
                    <div className="card-body">
                        <form onSubmit={updateVaga}>
                            <div className="textarea-container">
                                <label htmlFor="inputTitulo">Título</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Título"
                                    id="inputTitulo"
                                    value={isDataLoaded ? titulo : ''}
                                    onChange={(event) => setTitulo(event.target.value)} />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputDesc">Descrição</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Descrição"
                                    id="inputDesc"
                                    value={isDataLoaded ? descricao : ''}
                                    onChange={(event) => setDescricao(event.target.value)} />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputHabMin">Habilitações Mínimas</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputHabMin"
                                    placeholder="Habilitações Mínimas"
                                    value={isDataLoaded ? habilitacoesMin : ''}
                                    onChange={(event) => setHabilitacoesMin(event.target.value)} />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputXPMin">Experiência Mínima</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputXPMin"
                                    placeholder="Experiência Mínima"
                                    value={isDataLoaded ? experienciaMin : ''}
                                    onChange={(event) => setExperienciaMin(event.target.value)} />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputRemuneracao">Remuneração</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="inputRemuneracao"
                                    placeholder="Remuneração"
                                    value={isDataLoaded ? remuneracao : ''}
                                    onChange={(event) => setRemuneracao(event.target.value)} />
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputIsInterna">Interna?</label>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="inputIsInterna"
                                        checked={isInterna}
                                        onChange={() => setIsInterna(!isInterna)}
                                    />
                                    <label className="form-check-label" htmlFor="inputIsColaborador">
                                        {isInterna ? "Sim" : "Não"}
                                    </label>
                                </div>
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputDepartamento">Departamento</label>
                                <select
                                    id="inputDepartamento"
                                    className="form-control"
                                    value={isDataLoaded ? departamento : ''}
                                    onChange={(event) => setDepartamento(parseInt(event.target.value))}
                                >
                                    <option>Por favor, escolha um departamento</option>
                                    <FillDepartamento />
                                </select>
                            </div>
                            <div className="textarea-container">
                                <label htmlFor="inputFilial">Filial</label>
                                <select
                                    id="inputFilial"
                                    className="form-control"
                                    value={isDataLoaded ? filial : ''}
                                    onChange={(event) => setFilial(parseInt(event.target.value))}
                                >
                                    <option>Por favor, escolha uma filial</option>
                                    <FillFilial />
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
                                        onClick={() => navigate('/vaga')}
                                        style={{ marginLeft: '10px' }}>
                                        <span className="bi bi-x-octagon-fill" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );

    async function updateVaga() {
        if (!departamento) {
            Swal.fire({
                title: "Por favor, escolha um departamento!",
            });
            return;
        }
        if (!filial) {
            Swal.fire({
                title: "Por favor, escolha uma filial!",
            });
            return;
        }

        try {
            const url = baseURL + "vaga/update/" + vagaId;
            const datapost = {
                titulo: titulo,
                descricao: descricao,
                habilitacoesMin: habilitacoesMin || "N/A",
                experienciaMin: experienciaMin || "N/A",
                remuneracao: remuneracao || "???",
                isInterna: isInterna,
                departamentoId: departamento || null,
                filialId: filial || null
            };

            const response = await axios.put(url, datapost);
            if (response.data.success === true) {
                Swal.fire({
                    title: "Vaga alterada com sucesso!",
                }).then(() => {
                    navigate("/vaga");
                });
            } else {
                Swal.fire({
                    title: "Erro!",
                });
            }
        } catch (err) {
            console.log(err);
            Swal.fire({
                title: err.response.data.message,
            });
        }
    }

    function FillDepartamento() {
        return dataDepartamento.map((data, index) => {
            return (
                <option key={index} value={data.departamentoId}>
                    {data.departamentoNome}
                </option>
            );
        });
    }

    function FillFilial() {
        return dataFilial.map((data, index) => {
            return (
                <option key={index} value={data.filialId}>
                    {data.filialNome}
                </option>
            );
        });
    }
};

export default FormVagas;
