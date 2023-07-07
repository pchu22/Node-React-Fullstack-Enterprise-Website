import axios from "axios";

export default axios.create({
  baseURL: "https://softinsa-web-app-carreiras01.onrender.com",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});