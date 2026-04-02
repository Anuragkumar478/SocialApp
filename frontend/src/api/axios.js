import axios from "axios";

const API = axios.create({
  baseURL: "https://socialapp-vii1.onrender.com",
  withCredentials: true
});

export default API;