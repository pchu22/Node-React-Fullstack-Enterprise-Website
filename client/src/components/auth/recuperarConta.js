import '../../custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";

import logo from '../../assets/logo.png';
import React, {useState} from 'react';
import axios from 'axios';

const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com/auth';

function goBack() {
  window.history.back();
}

const RecuperarConta = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.post(`${baseURL}/forgot-password`, { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Erro ao enviar o email de recuperação.');
      console.error(error);
    }

    setIsLoading(false);
  };
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#D9D9D9' }}>
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-md-7 col-sm-8">
              <div className="card shadow-lg">
                <div className="card-body py-4 px-5">
                  <div className="text-center">
                    <img src={logo} alt="Logo Softinsa" style={{ maxWidth: '100%', height: 'auto' }} />
                  </div>
                  <p className="mb-3 text-center">Introduza o endereço email associado à sua conta e será enviado um email com um link para alterar a password.</p>
                  <form className="needs-validation" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label className="text-muted" htmlFor="email">Email</label>
                      </div>
                      <input
                        id="email"
                        type="email"
                        className="form-control shadow-none"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                      <div className="invalid-feedback">
                        O email é de preenchimento obrigatório!
                      </div>
                    </div>
                    <div className="align-items-center">
                    <button type="submit" disabled={isLoading}>
                      {isLoading ? 'Enviando...' : 'Enviar'}
                    </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-absolute end-0 top-0 rounded-circle m-5">
        {/*<button type="button" className="btn btn-primary btn-lg" aria-expanded="false" onClick={goBack}>
          <i className="bi bi-arrow-left"></i>
        </button>*/}
      </div>
    </div>
  );
};

export default RecuperarConta;
