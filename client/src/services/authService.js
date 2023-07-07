import axios from "axios";
import Swal from "sweetalert2";

class AuthService {
  
  login(email, password) {
    return axios.post("https://softinsa-web-app-carreiras01.onrender.com/auth/login", { email, password })
      .then(res => {
        console.log("Login response:", res);
        if (res.data.accessToken) {
          console.log("Token encontrado:", res.data.accessToken);
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res;
      })
      .catch(error => {
        console.error("Login error:", error);
        throw new Error('Utilizador Inválido');
      });
  }

  signup(primeiroNome, ultimoNome, telemovel, email, password) {
    const userData = {
      primeiroNome,
      ultimoNome,
      telemovel,
      email,
      password,
    };

    return axios.post('https://softinsa-web-app-carreiras01.onrender.com/auth/signup', userData)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Registo efetuado com sucesso!",
          text: "A sua conta foi criada com sucesso!",
          confirmButtonText: "OK",
        });
        return response.data;
      })
      .catch((error) => {
        let errorMessage = "Ocorreu um erro durante a criação da sua conta";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        Swal.fire({
          icon: "error",
          title: "Erro durante o registo!",
          text: errorMessage,
          confirmButtonText: "OK",
        });
        throw error;
      });
  }

  logout() {localStorage.clear()}

  getCurrentUser() { return JSON.parse(localStorage.getItem('user'));}
} 

export default new AuthService();