import axios from "axios";
import keycloak from "./keycloak.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    if (keycloak?.token) {
      try {
        await keycloak.updateToken(30);
        config.headers.Authorization = `Bearer ${keycloak.token}`;
      } catch (error) {
        console.error("Erro ao atualizar token:", error);
        keycloak.logout();
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
