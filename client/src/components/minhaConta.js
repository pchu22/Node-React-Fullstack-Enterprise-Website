import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const baseURL = "https://softinsa-web-app-carreiras01.onrender.com";


const FormMinhaConta = () => {
    const loggedInUserId = localStorage.getItem('userId');
    const [Nome, setNome] = useState("");
    const [Email, setEmail] = useState("");
    const [Telefone, setTelefone] = useState("");
    const [Password, setPassword] = useState("");
    const [Morada, setMorada] = useState("");
    const navigate = useNavigate();
useEffect(() => {
    loadUserData();
  }, []);

  function loadUserData() {
    const url = baseURL + '/user/get/' + loggedInUserId;

    axios
      .get(url)
      .then((res) => {
        if (res.data.success) {
          const user = res.data.data;
          setNome(user.primeiroNome + " " + user.ultimoNome)
          setEmail(user.email)
          setTelefone(user.telemovel)
          setMorada(user.morada)


        } else {
          Swal.fire('Error Web Service', 'Utilizador indisponível!', 'error');
        }
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
  }

  async function updateUser() {
    try {
      const url = baseURL + "/user/update/" + loggedInUserId;
      const datapost = {
        email: Email,
        telemovel: Telefone,
        morada: Morada,
      };
  
      const response = await axios.put(url, datapost);
  
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: 'Alterações aplicadas com sucesso!',
          timer: 2500,
          timerProgressBar: true,
          confirmButtonColor: '#00B8E0',
        });
      } else {
        Swal.fire({
          title: "Erro!",
          text: response.data.message, // Display the error message from the server
          icon: "error",
        });
      }
    } catch (err) {
    console.log(err);
    console.log(err.response);
      Swal.fire({
        title: err,
        text: "Ocorreu um erro ao atualizar os dados.",
        icon: "error",
      });
    }
  }

  async function updatePassword() {
    try {
      const url = baseURL + "/user/update/" + loggedInUserId;
      const datapost = {
        password: Password,
      };
  
      const response = await axios.put(url, datapost);
  
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: 'Password alterada com sucesso!',
          timer: 2500,
          timerProgressBar: true,
          confirmButtonColor: '#00B8E0',
        });
      } else {
        Swal.fire({
          title: "Erro!",
          text: response.data.message, // Display the error message from the server
          icon: "error",
        });
      }
    } catch (err) {
    console.log(err);
    console.log(err.response);
      Swal.fire({
        title: err,
        text: "Ocorreu um erro ao atualizar os dados.",
        icon: "error",
      });
    }
  }

  async function deleteUser() {
    try {
      const url = baseURL + "/user/delete";
      const datapost = {
        userIds: loggedInUserId,
      };
  
      const response = await axios.post(url, datapost);
  
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: 'A sua conta foi eliminada com sucesso!',
          timer: 2500,
          timerProgressBar: true,
          confirmButtonColor: '#00B8E0',
        }).then(() => {
                try {
                  localStorage.removeItem('user');
                  localStorage.removeItem('userId');
                  console.log("Logout efetuado com sucesso!");
                } catch (error) {
                  console.error("Erro enquanto tentava efetuar o logout: ", error);
                }
            navigate("/");
        });;
      } else {
        Swal.fire({
          title: "Erro!",
          text: response.data.message, 
          icon: "error",
        });
      }
    } catch (err) {
      Swal.fire({
        title: err,
        text: "Ocorreu um erro ao atualizar os dados.",
        icon: "error",
      });
    }
  }

    const Send = () => {
        if (Email === "") {
            Swal.fire({
                title: "Tem que inserir um email!",
                confirmButtonColor: '#00B8E0',
                icon: "warning",
            });
        } else if (Telefone === "") {
            Swal.fire({
                title: "Tem que inserir um Nº de telemóvel!",
                confirmButtonColor: '#00B8E0',
                icon: "warning",
            });

        } else {
            Swal.fire({
                title: "Tem a certeza?",
                text: "Deseja confirmar estas alterações?",
                showCancelButton: true,
                confirmButtonText: "Sim, alterar!",
                confirmButtonColor: '#00B8E0',
                cancelButtonText: "Não, voltar atrás",
                cancelButtonColor: "#C51616",
                icon: "question"

            }).then((result) => {
                if (result.value) {
                    updateUser()
                    
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({ title: "Cancelado", text: "As alterações não foram aplicadas!", icon: "error", confirmButtonColor: '#00B8E0', });
                }
            });
        }
    };

    const Alterar = () => {
        Swal.fire({
            title: 'Alterar Password',
            html: `<input type="password" id="passwordAntinga" class="swal2-input" placeholder="Password Antiga">
            <input type="password" id="passwordNova" class="swal2-input" placeholder="Password Nova">`,
            confirmButtonText: 'Alterar',
            confirmButtonColor: '#39C516',
            focusConfirm: false,
            preConfirm: () => {
                const passwordAntinga = Swal.getPopup().querySelector('#passwordAntinga').value
                const passwordNova = Swal.getPopup().querySelector('#passwordNova').value
                if (!passwordAntinga) {
                    Swal.showValidationMessage(`Introduza a sua password antiga!`)
                }
                else if
                    (!passwordNova) {
                    Swal.showValidationMessage(`Introduza a sua password nova!`)
                }
                setPassword(passwordNova)

            }
        }).then((result) => {
            if (result.value) {
                updatePassword()
            }
            
            
        })
    }
    const Eliminar = () => {
        Swal.fire({
            title: "Tem a certeza que deseja eliminar a sua conta ?",
            text: "Esta ação NÃO é regressível!",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonColor: "#C51616",
            confirmButtonColor: '#39C516',
            cancelButtonText: "Não",
            icon: "warning"
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Confirme a eliminação da sua conta',
                    html: `<label> Escreva em letras maiúsculas <b>“CONFIRMO”<b> </label>
                    <input type="text" id="confirmacao" class="swal2-input" placeholder="Password Antiga">`,
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: "Cancelar",
                    cancelButtonColor: "#C51616",
                    confirmButtonColor: '#39C516',
                    focusConfirm: false,
                    preConfirm: () => {
                        const confirmacao = Swal.getPopup().querySelector('#confirmacao').value
                        if (!confirmacao || confirmacao !== "CONFIRMO") {
                            Swal.showValidationMessage(`Tem que introduzir a palavra corretamente`)
                        }
                        return { confirmacao: confirmacao }

                    }
                }).then((result) => {
                    if (result.value) {
                        deleteUser();
                    }

                    else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({ title: "Cancelada", text: "Eliminação Abortada!", icon: "error", confirmButtonColor: '#00B8E0', });
                    }

                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({ title: "Cancelada", text: "Eliminação Abortada!", icon: "error", confirmButtonColor: '#00B8E0', });
            }
        });
    }

    return (
        <div className='wrapper'>
      <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
        <div className="card">
          <div className="card-body">
          <div className="container">
    <div className="row">
        <div className="col-10">
            <h2>Os seus dados</h2>
        </div>
        <div className="col-2 d-flex justify-content-end">
            <button
                className="btn btn-outline-primary"
                onClick={() => {
                    window.history.back();
                }}
                
            >
                <span className="bi bi-arrow-left" />
            </button>
        </div>
    </div>
</div>
          
          <p></p>
            <form onSubmit={Send}>
            <div class="textarea-container">
                <label htmlFor="inputNome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome"
                  id="inputNome"
                  value={Nome}
                  disabled
                />
              </div>
              <div class="textarea-container">
                <label htmlFor="inputEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="inputEmail"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>

              <div class="textarea-container">
                <label htmlFor="inputTelemove">Nº de Telemóvel</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Telemóvel"
                  id="inputTelemovel"
                  value={Telefone}
                  onChange={(e) => setTelefone(e.target.value)} 
                />
              </div>

              <div class="textarea-container">
                <label htmlFor="inputMorada">Morada</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Morada"
                  id="inputMorada"
                  value={Morada}
                  onChange={(e) => setMorada(e.target.value)} 
                />
              </div>
              <div className="btn-wrapper">
                <div class="col-md-10 mb-2">
                  <button
                   type="button"
                   onClick={Send}
                    className="btn btn-outline-success">
                    <span className="bi bi-check-lg" />
                  Confirmar Alterações</button>
                  </div>
                  <div class="col-md-10 mb-2">
                  <button
                    type="button"
                    onClick={Alterar}
                    className="btn btn-outline-warning">
                    <span className="bi bi-shield-lock" />
                  Alterar Password</button></div>
                  <div class="col-md-10">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={Eliminar}>
                    <span className="bi bi-trash" />
                  Eliminar a minha Conta</button></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    );


};



export default FormMinhaConta;

