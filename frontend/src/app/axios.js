import axios from "axios";

const API = axios.create({
  baseURL: "https://t-1-3vkj.onrender.com/api",
  withCredentials: true, // 🔥 MOST IMPORTANT (cookie send karega)
});

export default API;