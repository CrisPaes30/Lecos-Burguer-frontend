import { useEffect, useState } from "react";
import axios from "axios";
import "./Validar.css";

const ValidarCadastro = () => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const validarCadastro = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setStatus("error");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:8190/api/v1/usuarios/validar",
          { token }
        );
        if (response.status === 200) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Erro ao validar cadastro:", error);
        setStatus("error");
      }
    };

    validarCadastro();
  }, []);

  return (
    <div className="validar-container">
      {status === "loading" && (
        <p className="validar-msg">Validando seu cadastro...</p>
      )}
      {status === "success" && (
        <div className="validar-success">
          <h2>🎉 Cadastro confirmado!</h2>
          <p>Agora você já pode fazer login no Leco’s Burguer.</p>
          <a href="/pedidos" className="btn-login">Ir para login</a>
        </div>
      )}
      {status === "error" && (
        <div className="validar-error">
          <h2>❌ Link inválido ou expirado</h2>
          <p>Solicite um novo e-mail de validação e tente novamente.</p>
          <a href="/cadastro" className="btn-cadastro">Voltar para cadastro</a>
        </div>
      )}
    </div>
  );
};

export default ValidarCadastro;
