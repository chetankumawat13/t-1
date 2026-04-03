import API from "../../../app/axios.js";

export const getItems = async () => {
  const res = await API.get("/items");
  return res.data.items;
};