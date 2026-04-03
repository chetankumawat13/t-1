import API from "../../../app/axios";

// 🔥 LOGIN
export const loginApi = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

// 🔥 REGISTER
export const registerApi = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};