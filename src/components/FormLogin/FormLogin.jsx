import React, { useState } from "react";
import "./FormLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { login as loginService } from "../../keycloak/authService";

const FormLogin = () => {
  const [name, setName] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("O campo e-mail é obrigatório.");
      return;
    }

    if (!senha) {
      setError("O campo senha é obrigatório.");
      return;
    }

    setError("");

    try {
      const data = await loginService(name, senha);

      if (!data?.access_token) {
        setError("Token inválido ou não retornado.");
        return;
      }

      localStorage.setItem("token", data.access_token);
      navigate("/pedidos");
    } catch (err) {
      console.error("Erro ao autenticar:", err);
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="login-form">
      <h2 className="form-title">MEU LECO´S LOGIN</h2>
      <form className="form-fields" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="form-input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <p className="form-error">{error || "\u00A0"}</p>

        <div className="form-links">
          <Link to="/cadastro" className="form-link">Cadastre-se</Link>
          <Link to="/esqueci-senha" className="form-link">Esqueci a senha</Link>
        </div>

        <button type="submit" className="form-button">Entrar</button>
      </form>
    </div>
  );
};

export default FormLogin;
