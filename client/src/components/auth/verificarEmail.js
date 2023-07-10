import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
      <div className='card' style={{ color: "#000", textAlign: "center" }}>
        <h1>Verificação de E-mail</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default VerificacaoEmail;
