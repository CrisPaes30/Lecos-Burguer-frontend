import React, { useState } from "react";
import "./FormLogin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login as loginService } from "../../keycloak/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormLogin = () => {
  const [name, setName] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      setLoading(true);
      const data = await loginService(name, senha);

      if (!data?.access_token) {
        setError("Token inválido ou não retornado.");
        return;
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token ?? "");
      localStorage.setItem("token_type", data.token_type ?? "Bearer");
      localStorage.setItem("expires_in", String(data.expires_in ?? ""));
      axios.defaults.headers.common.Authorization = `${
        data.token_type ?? "Bearer"
      } ${data.access_token}`;

      navigate("/pedidos");
    } catch (err) {
      console.error("Erro ao autenticar:", err);
      setError("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2 className="form-title">MEU LECO´S LOGIN</h2>
      <form className="form-fields" onSubmit={handleSubmit}>
        <input
          placeholder="E-mail ou Usuário"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Campo de senha com ícone */}
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            className="form-input"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <p className="form-error">{error || "\u00A0"}</p>

        <div className="form-links">
          <Link to="/cadastro" className="form-link">Cadastre-se</Link>
          <Link to="/esqueci-senha" className="form-link">Esqueci a senha</Link>
        </div>

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? <span className="spinner"></span> : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
