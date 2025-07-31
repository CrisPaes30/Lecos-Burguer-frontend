import api from "../../keycloak/api";

const getServiceToken = async () => {
  const KEYCLOAK_URL = import.meta.env.VITE_KEYCLOAK_URL;
  const REALM = import.meta.env.VITE_KEYCLOAK_REALM;
  const CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;
  const CLIENT_SECRET = import.meta.env.VITE_KEYCLOAK_SECRET;
  const USERNAME = import.meta.env.VITE_KEYCLOAK_USER;
  const PASSWORD = import.meta.env.VITE_KEYCLOAK_PASSWORD;

  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("username", USERNAME);
  params.append("password", PASSWORD);

  const response = await fetch(
    `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao obter token do Keycloak");
  }

  const data = await response.json();
  return data.access_token;
};

const mapErrorCodeToField = (code) => {
  const fieldMapping = {
    "CP-0003": "nome",
    "CP-0004": "email",
    "CP-0005": "cpfCnpj",
    "CP-0006": "cpfCnpj",
    "CP-0007": "telefone",
    "CP-0008": "cep",
    "CP-0009": "rua",
    "CP-0010": "bairro",
    "CP-0011": "numero",
    "CP-0012": "uf",
    "CP-0013": "usuario",
    "CP-0016": "cpfCnpj",
    "CP-0017": "senha",
    "CP-0019": "email",
    "CP-0020": "email",
    "CP-0022": "senha",
    "CP-0027": "usuario",
  };

  return fieldMapping[code] || "geral";
};

export const cadastrarUsuario = async (payload) => {
  try {
    const token = await getServiceToken();

    const response = await api.post("/v1/user-registration", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const errorsFromAPI =
      response.data?.data?.items?.[0]?.error || [];

    if (response.status === 207 || errorsFromAPI.length > 0) {
      const mappedErrors = {};

      errorsFromAPI.forEach((err) => {
        const field = mapErrorCodeToField(err.code);
        mappedErrors[field] = err.message;
      });

      return { success: false, errors: mappedErrors };
    }

    return { success: true };
  } catch (error) {
    console.error("Erro no cadastro:", error);

    const mappedErrors = {};
    if (error.response?.data?.data?.items?.[0]?.error) {
      error.response.data.data.items[0].error.forEach((err) => {
        const field = mapErrorCodeToField(err.code);
        mappedErrors[field] = err.message;
      });
    } else {
      mappedErrors.geral = "Erro inesperado. Tente novamente.";
    }

    return { success: false, errors: mappedErrors };
  }
};
