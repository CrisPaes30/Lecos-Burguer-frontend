import React, { useState } from "react";
import "./FormLogin.css";

const FormLogin = () => {
  const [name, setName] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(""); // estado para mensagem de erro

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!name) {
      setError("O campo e-mail é obrigatório.");
      return;
    }

    if (!senha) {
      setError("O campo senha é obrigatório.");
      return;
    }

    setError(""); // Limpa o erro se tudo estiver preenchido
    console.log("Login enviado:", { name, senha });

    // Limpa os campos
    setName("");
    setSenha("");
  };

  return (
    <div className="login-form">
      <h2 className="form-title">LECO LOGIN</h2>
      <form className="form-fields" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          className="form-input"
          value={name}
          onChange={handleName}
        />
        <input
          type="password"
          placeholder="Senha"
          className="form-input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {/* Mensagem de erro, se existir */}
        {error && <p className="form-error">{error}</p>}

        <div className="form-links">
          <a href="#" className="form-link">
            Cadastre-se
          </a>
          <a href="#" className="form-link">
            Esqueci a senha
          </a>
        </div>

        <button type="submit" className="form-button">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
