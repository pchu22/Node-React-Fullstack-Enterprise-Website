import axios from "axios";

const http = axios.create({
  baseURL: "https://softinsa-web-app-carreiras01.onrender.com",
});

export default http;
