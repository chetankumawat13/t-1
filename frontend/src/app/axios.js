import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // 🔥 MOST IMPORTANT (cookie send karega)
});

export default API;