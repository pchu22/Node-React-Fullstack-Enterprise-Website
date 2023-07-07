import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com/";

const Barra_BemVindo = () => {
    const [user, setUser] = useState("");
    const [primeiroNome, setPrimeiroNome] = useState("");
    const [ultimoNome, setUltimoNome] = useState("");
    
    useEffect(() => {
        const userId = localStorage.getItem('userId')
        const url = baseURL + "user/get/" + userId;
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
          })
          .catch((err) => {
            alert("Error server: " + err);
          });
        },[])

    return (
        <div className="bg-secondary text-white py-3 font-weight-bold" style={{marginTop:"53px"}}>
            <div className="container">
                <div className="d-flex justify-content-start align-items-center">
                    <div>
                        <h1>Bem-Vindo(a){', '+ primeiroNome + ' ' + ultimoNome}</h1>
                        <h2>O que pretende fazer ?</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Barra_BemVindo;