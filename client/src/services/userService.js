import axios from 'axios';
import authHeader from './authHeader';

const header = { headers: authHeader() };
const baseURL = 'https://softinsa-web-app-carreiras01.onrender.com/user';

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = authHeader();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class UserService {
  getAllUsers() {
    return axiosInstance.get('/list');
  }

  getUserById(userId) {
    return axiosInstance.get(`/get/${userId}`);
  }

  getUsersByFilial(filialId) {
    return axiosInstance.get(`/utilizador/filial/${filialId}`);
  }
  
  getUsersByDepartmento(departmentoId) {
    return axiosInstance.get(`/utilizador/departamento/${departmentoId}`);
  }

  createUser(data) {
    return axiosInstance.post('/create', data, header);
  }

  editUser(userId, data) {
    return axiosInstance.put(`update/${userId}`, data, header);
  }

  updateUserPassword(userId, data) {
    return axiosInstance.put(`/updatePassword/${userId}`, data);
  }

  deleteUser(userId) {
    return axiosInstance.post('/delete', { userId });
  }

  deactivateUser(userId) {
    return axiosInstance.put(`/deactivate/${userId}`);
  }

  activateUser(userId) {
    return axiosInstance.put(`/activate/${userId}`);
  }
}

export default new UserService();
