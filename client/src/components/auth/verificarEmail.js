import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import bg from '../../assets/bg-login.png'
const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com/auth';

const VerificacaoEmail = () => {
  const [message, setMessage] = useState('');
  const { verificationToken } = useParams();

  useEffect(() => {
    const url = `${baseURL}/ativacao/${verificationToken}`;

    axios.post(url)
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(`Erro ao verificar o e-mail. ${error.response.data.message}`);
        console.error(error.response);
      });
  }, [verificationToken]);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <img src={bg} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh", color: "#000", textAlign: "center" }}>
        <div className='card'>
          <h1>Verificação do E-mail</h1>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default VerificacaoEmail;
