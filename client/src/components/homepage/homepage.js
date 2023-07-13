import React, { useState, useEffect } from "react";
import axios from "axios";
import bg from '../../assets/bg-login.png'

import 'bootstrap/dist/css/bootstrap.min.css';
import './homepage.css'

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

const Homepage = () => {
    const [user, setUser] = useState("");
    const [primeiroNome, setPrimeiroNome] = useState("");
    const [ultimoNome, setUltimoNome] = useState("");

    useEffect(() => {
        loadCurrentUser();
    }, [])

    function loadCurrentUser() {
        const userId = localStorage.getItem('userId')
        const url = `${baseURL}user/get/${userId}`;
        axios.get(url)
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    console.log(data);
                    setUser(data);
                    setPrimeiroNome(data.primeiroNome);
                    setUltimoNome(data.ultimoNome);
                } else {
                    alert("Error Web service");
                }
            }).catch((err) => {
                alert("Error server: " + err);
            });
    }

    return (
        <main>
            <div className="main-container">
                <div className="main-title">
                    <img src={bg} alt="background-image" />
                    <div>
                        <h1 className="main-greeting">Bem-Vindo(a){', ' + primeiroNome + ' ' + ultimoNome}</h1>
                        <p>O que pretende fazer?</p>
                    </div>
                </div>
                <div className="main-cards">
                    <div className="card-hp">
                        <a href="/oportunidade">
                            <span className="bi bi-briefcase-fill" />
                            <div className="card-inner">
                                <p>Inserir e consultar as suas oportunidades de negócio.</p>
                            </div>
                        </a>
                    </div>
                    <div className="card-hp">
                        <a href="/vaga">
                            <span className='bi bi-file-code-fill' />
                            <div className="card-inner">
                                <p>Conheça todas as nossas ofertas de recrutamento!</p>
                            </div>
                        </a>
                    </div>
                    <div className="card-hp">
                        <a href="/ideia">
                            <span className="bi bi-lightbulb-fill" />
                            <div className="card-inner">
                                <p>Envie-nos a suas ideias e/ou sugestões!</p>
                            </div>
                        </a>
                    </div>
                    <div className="card-hp">
                        <a href="/beneficio">
                            <span className='bi bi-hand-thumbs-up-fill' />
                            <div className="card-inner">
                                <p>Consulte as diversas vantagens em ser colaborador Softinsa!</p>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="charts">
                    <div className="charts-left">
                        <div className="charts-left-title">
                            <div>
                                <h1></h1>
                                <p></p>
                            </div>
                            <span />
                        </div>
                    </div>
                    <div className="charts-right">
                        <div className="charts-right-title">
                            <div>
                                <h1></h1>
                                <p></p>
                            </div>
                            <span />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Homepage;