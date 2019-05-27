import axios from "axios";

//Este endereço nao funciona no React!
//http://127.0.0.1:3333
const api = axios.create({
  baseURL: "http://192.168.9.1:3333"
});

export default api;
