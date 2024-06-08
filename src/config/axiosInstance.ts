import { msalInstance } from "@/main";
import axios from "axios";

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_GATEWAY_URL,
  timeout: 4000000,
  headers: { "Content-Type": "application/json" }
});

// Agregar un interceptor de solicitud
axiosInstance.interceptors.request.use(
  async function(config) {
    // Hacer algo antes de que la solicitud sea enviada
    // console.log("Request Interceptor", config);
    // const token = await msalInstance.acquireTokenSilent([`${process.env.VUE_APP_CLIENT_ID}/.default`]);

    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  function(error) {
    // Hacer algo con el error de la solicitud
    return Promise.reject(error);
  }
);

export default axiosInstance;
