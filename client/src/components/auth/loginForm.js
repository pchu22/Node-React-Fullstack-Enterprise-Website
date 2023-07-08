import React, { useEffect, useState } from "react";
import AuthService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import '../../custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2"
import logo from '../../assets/logo.png';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function goBack() {
  window.history.back();
}

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [primeiroLogin, setPrimeiroLogin] = useState(false);
  const [emailSelected, setEmailSelected] = useState(false);
  const [passwordSelected, setPasswordSelected] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const [passwordEye, setPasswordEye] = useState(false);

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setMessage("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setMessage("");
  };

  const handleEmailBlur = () => {
    setEmailSelected(true);
  };

  const handlePasswordBlur = () => {
    setPasswordSelected(true);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage("O email e a password são campos de preenchimento obrigatório!");
      return;
    }

    setMessage("");
    setLoading(true);

    AuthService.login(email, password)
      .then((res) => {
        if (!res.data) {
          setMessage("Autenticação falhou.");
          setLoading(false);
          Swal.fire({
            icon: 'error',
            title: 'Erro de Autenticação',
            text: 'Falha ao efetuar login.',
            confirmButtonText: 'OK'
          });
        } else {
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }

          localStorage.setItem("userId", res.data.userId);
          setPrimeiroLogin(res.data.isPrimeiroLogin);
          if (res.data.isPrimeiroLogin) {
            navigate(`/primeiro-login/${res.data.userId}`, { replace: true });
          } else {
            navigate("/homepage", { replace: true });
          }
        }
      })
      .catch((error) => {
        setMessage("Autenticação falhou.");
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Erro de Autenticação',
          text: 'Falha ao efetuar login.',
          confirmButtonText: 'OK'
        });
      });
  };

  const isEmailInvalid = emailSelected && !email;
  const isPasswordInvalid = passwordSelected && !password;

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#D9D9D9' }}>
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-md-8 col-sm-9">
              <div className="card shadow-lg">
                <div className="card-body py-4 px-5">
                  <div className="text-center mb-4">
                    <img src={logo} alt="Logo Softinsa" style={{ maxWidth: '100%', height: 'auto' }} />
                  </div>
                  <form className="needs-validation" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="email">E-Mail</label>
                      <input
                        id="email"
                        type="email"
                        className={`form-control shadow-none ${isEmailInvalid ? 'is-invalid' : ''}`}
                        name="email"
                        autoFocus
                        value={email}
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                      />
                      {isEmailInvalid && emailSelected && (
                        <div className="invalid-feedback">
                          O email é de preenchimento obrigatório!
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label className="text-muted" htmlFor="password">Password</label>
                        <a href="/forgot-password" className="float-end small">
                          Esqueceu-se da password?
                        </a>
                      </div>
                      <input
                        id="password"
                        type={passwordEye ? "text" : "password"}
                        className={`form-control shadow-none ${isPasswordInvalid ? 'is-invalid' : ''}`}
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordBlur}
                      />
                      {isPasswordInvalid && passwordSelected && (
                        <div className="invalid-feedback">
                          A password é de preenchimento obrigatório!
                        </div>
                      )}
                      <span className='password-toggle-icon'>
                        {passwordEye === false ? (<AiFillEyeInvisible onClick={handlePasswordClick} />) : (<AiFillEye onClick={handlePasswordClick} />)}
                      </span>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="remember"
                          id="remember"
                          className="form-check-input shadow-none"
                          checked={rememberMe}
                          onChange={handleRememberMeChange}
                        />
                        <label htmlFor="remember" className="form-check-label">Lembrar-me</label>
                      </div>
                      <button type="submit" className="btn btn-primary ms-auto w-50">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
                <GoogleOAuthProvider clientId="602987663849-1f1jaccl2mmqhppbo3p7c92l0i255cd5.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse);
                      window.open('https://softinsa-web-app-carreiras01.onrender.com/auth/google')
                      navigate('/homepage')
                    }}
                    onError={() => {
                      Swal.fire({
                        icon: 'error',
                        title: 'Erro ao efetuar o login com a sua conta Google',
                        text: 'Tente novamente mais tarde!',
                      });
                      navigate('/login')
                    }}
                  />
                </GoogleOAuthProvider>;
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    Não tenho conta! <a href="/signup" className="text-primary small"> Criar uma</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*<div className="position-absolute end-0 top-0 rounded-circle m-5">
        <button type="button" className="btn btn-primary btn-lg" aria-expanded="false" onClick={goBack}>
          <i className="bi bi-arrow-left"></i>
        </button>
      </div>*/}
    </div>
  );
};

export default LoginForm;
