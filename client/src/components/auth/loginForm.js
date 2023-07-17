import React, { useEffect, useState } from "react";
import AuthService from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import '../../custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import Swal from "sweetalert2";
import logo from '../../assets/logo.png';
import './auth.css';

const baseURL = "https://softinsa-web-app-carreiras01.onrender.com";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordSelected, setPasswordSelected] = useState(false);
  const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberedEmail") ? true : false);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const [passwordEye, setPasswordEye] = useState(false);

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail && rememberMe) {
      setEmail(rememberedEmail);
    }
  }, [rememberMe]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setMessage("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setMessage("");
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
          const userId = localStorage.getItem("userId")
          setLoggedIn(true);

          const user = localStorage.getItem("user");
          if (user && JSON.parse(user).isPrimeiroLogin === true) {
            navigate(`/primeiro-login/${userId}`)
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

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isPasswordInvalid = passwordSelected && !password;

  if (loggedIn) {
    return <Link to="/homepage" />;
  }
  const googleLogin = (event) => {
    event.preventDefault();

    // Replace "baseURL" with the actual base URL for your application
    const authUrl = `${baseURL}/auth/google/redirect`;

    // Open the authentication URL in a new window
    const authWindow = window.open(authUrl, "_blank", "width=500,height=600");

    let messageContent;

    // Listen for messages from the opened window
    const messageListener = (event) => {
      event.preventDefault();

      console.log("Received message from authentication window:", event.data);

      // Check if the received message contains an accessToken
      if (event.data && event.data.accessToken) {
        messageContent = event.data;

        // Store the accessToken in localStorage
        localStorage.setItem("token", messageContent.accessToken);

        console.log("Access token:", messageContent.accessToken);

        // Redirect to the homepage after 1 second
        setTimeout(() => {
          console.log("Redirecting to homepage...");
          window.location.href = "/homepage";
        }, 1000);

        // Close the authentication window
        console.log("Closing authentication window...");
        authWindow.close();

        // Remove the event listener
        window.removeEventListener("message", messageListener);
      }
    };

    // Attach the message listener
    window.addEventListener("message", messageListener);
  };



  return (
    <div className="wrapper">
      <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
        <div className="card">
          <div className="header-image">
            <img src={logo} alt="Logo-Softinsa" />
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="textarea-container">
                <label htmlFor="email">E-Mail</label>
                <input
                  id="email"
                  type="email"
                  className={`form-control ${isEmailValid(email) ? '' : 'is-invalid'}`}
                  name="email"
                  required
                  autoFocus
                  value={email}
                  onChange={handleEmailChange}
                />
                <div className="invalid-feedback">Email inválido</div>
              </div>
              <div className={`textarea-container ${isPasswordInvalid ? 'has-error' : ''}`}>
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    id="password"
                    type={passwordEye ? 'text' : 'password'}
                    className={`form-control shadow-none ${isPasswordInvalid ? 'is-invalid' : ''}`}
                    name="password"
                    autoComplete="off"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <span className={`password-toggle-icon ${isPasswordInvalid ? 'hidden' : ''}`} onClick={handlePasswordClick}>
                  {passwordEye === false ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              <div className="content-container" style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ alignSelf: "center" }}>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  <label htmlFor="rememberMe" style={{ marginLeft: "0.5rem" }}>Lembrar-me</label>
                </div>
                <div style={{ alignSelf: "center" }}>
                  <Link className="forgotPW" to={"/recover"}>
                    Esqueceu-se da password?
                  </Link>
                </div>
              </div>
              <div className="btn-wrapper">
                <div className="btn-group">
                  <button
                    type="submit"
                    className="btn btn-outline-success"
                    style={{ marginBottom: "10px" }}
                  >
                    <span className="bi bi-check-lg"> Login</span>
                  </button>
                </div>
                <div className="btn-group">
                  <button
                    type="submit"
                    className="btn btn-outline-warning"
                    style={{ marginBottom: "10px" }}
                    onClick={googleLogin}
                  >
                    <span className="bi bi-google"> Login com o Google</span>
                  </button>
                </div>
                {/*<div className="btn-group">
                  <button
                    type="submit"
                    className="btn btn-outline-primary"
                  >
                    <span className="bi bi-facebook"> Login com o Facebook</span>
                  </button>
                </div>*/}
              </div>
              <div className="card-container">
                <div className="card-footer border-0">
                  <div className="text-center">
                    Não tenho conta! <a href="/signup" className="text-primary small">Criar uma</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
