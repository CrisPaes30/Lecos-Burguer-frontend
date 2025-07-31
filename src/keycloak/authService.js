import axios from "axios";

const API_URL = "http://localhost:8100/api/v1/usuario/auth";

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao autenticar usuário.");
  }
};
