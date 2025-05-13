import { useEffect, useState } from "react";
import "./Cadastro.css";

const Cadastro = () => {
  const frases = [
    "Opa!! tu não tem cadastro Leco´s?",
    "Então bora se cadastrar.",
    "Segue os passos ai! É bem de boas,",
    "precisamos apenas de algumas informações.",
  ];

  const [etapaTexto, setEtapaTexto] = useState(0);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [formEtapa, setFormEtapa] = useState(1);

  const [mostrarMensagemSenha, setMostrarMensagemSenha] = useState(false);
  const [mostrarFormSenha, setMostrarFormSenha] = useState(false);

  const [name, setName] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");

  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [uf, setUf] = useState("");
  const [desejaWhatsApp, setDesejaWhatsApp] = useState(false);

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroCampos, setErroCampos] = useState(""); 

  useEffect(() => {
    if (etapaTexto < frases.length) {
      const timer = setTimeout(() => {
        setEtapaTexto(etapaTexto + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => {
        setMostrarForm(true);
      }, 3000);
    }
  }, [etapaTexto]);

  const handleSubmitPessoais = (e) => {
    e.preventDefault();
    setFormEtapa(2);
    console.log("chegou no 2")
  };

  const handleSubmitCpfTelefone = (e) => {
    e.preventDefault();
    setFormEtapa(3);
    console.log("Chegou aqui")
  }

  const handleSubmitEndereco = (e) => {
    e.preventDefault();

    // Validação dos campos obrigatórios
    if (
      !name ||
      !sobrenome ||
      !email ||
      !rua ||
      !bairro ||
      !numero ||
      !telefone||
      !cep
    ) {
      setErroCampos("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    setErroCampos(""); // Limpa a mensagem de erro

    setMostrarForm(false);
    setMostrarMensagemSenha(true);

    setTimeout(() => {
      setMostrarMensagemSenha(false);
      setMostrarFormSenha(true);
    }, 2000);
  };

  const handleSubmitSenha = (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      setErroSenha("As senhas não coincidem!");
      return;
    }
    setErroSenha("");

    console.log("Cadastro completo:");
    console.log("Nome:", name);
    console.log("Sobrenome:", sobrenome);
    console.log("Email:", email);
    console.log("Cep", cep)
    console.log("Rua:", rua);
    console.log("Bairro:", bairro);
    console.log("Número:", numero);
    console.log("Complemento:", complemento);
    console.log("Telefone:", telefone);
    console.log("Deseja receber via WhatsApp:", desejaWhatsApp);
    console.log("Senha:", senha);
  };

  // Função para voltar para a etapa anterior
  const handleBack = () => {
    if (mostrarFormSenha) {
      setMostrarFormSenha(false);
      setMostrarForm(true);
      setFormEtapa(2);
    } else if (mostrarForm && formEtapa === 2) {
      setFormEtapa(1);
    } else if (mostrarForm && formEtapa === 3) {
      setFormEtapa(2);
    } else if (mostrarForm && formEtapa === 1) {
      setMostrarForm(false);
      setEtapaTexto(1);
    }
  };

  return (
    <div className="page-container-cadastro">
      <div className="brand">
        <img src="./LogoNovo4.png" alt="Logo" className="logo-icon" />
        <div className="brand-text-cadastro">
          <span className="brand-title-cadastro">LECO´S</span>
          <span className="brand-subtitle-cadastro">BURGUER</span>
        </div>
      </div>
      <div className="background-logo"></div>
      <div className="Cadastro">
        {!mostrarForm && !mostrarMensagemSenha && !mostrarFormSenha && (
          <div className="intro-text">
            <h1>{frases[etapaTexto - 1]}</h1>
          </div>
        )}

        {mostrarMensagemSenha && (
          <div
            className="intro-text"
            style={{ fontFamily: "Rock Salt, cursive" }}
          >
            <h2>Antes de finalizar seu cadastro, vamos cadastrar sua senha!</h2>
          </div>
        )}

        {mostrarForm && (
          <div className="cadastro-form">
            {formEtapa === 1 && (
              <form className="cadastro-fields" onSubmit={handleSubmitPessoais}>
                <input
                  type="text"
                  placeholder="Nome"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Sobrenome"
                  className="form-input"
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="form-button">
                  Próximo
                </button>
              </form>
            )}

            {formEtapa === 2 && (
              <form className="cadastro-fields" onSubmit={handleSubmitCpfTelefone}>
                <input
                  type="text"
                  placeholder="Cep"
                  className="form-input"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Rua / Avenida"
                  className="form-input"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Bairro"
                  className="form-input"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Número"
                  className="form-input"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Complemento"
                  className="form-input"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="UF"
                  className="form-input"
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
                />
                <div className="buttons-container">
                  <button
                    type="button"
                    className="form-button"
                    onClick={handleBack}
                  >
                    Voltar
                  </button>
                  <button type="submit" className="form-button">
                    Próximo
                  </button>
                </div>
              </form>
            )}
            
            {formEtapa === 3 && (
              <form className="cadastro-fields" onSubmit={handleSubmitEndereco}>
                <input
                  type="text"
                  placeholder="CPF/CNPJ"
                  className="form-input"
                  value={cpfCnpj}
                  onChange={(e) => setCpfCnpj(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Telefone"
                  className="form-input"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
                <div className="form-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={desejaWhatsApp}
                      onChange={() => setDesejaWhatsApp(!desejaWhatsApp)}
                    />
                    Desejo receber informações via WhatsApp
                  </label>
                </div>
                {erroCampos && <p className="erro-campos">{erroCampos}</p>}
                <div className="buttons-container">
                  <button
                    type="button"
                    className="form-button"
                    onClick={handleBack}
                  >
                    Voltar
                  </button>
                  <button type="submit" className="form-button">
                    Próximo
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {mostrarFormSenha && (
          <div className="cadastro-form">
            <form className="cadastro-fields" onSubmit={handleSubmitSenha}>
              <input
                type="password"
                placeholder="Senha"
                className="form-input"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirmar Senha"
                className="form-input"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
              {erroSenha && <p className="erro-senha">{erroSenha}</p>}
              <div className="buttons-container">
                <button
                  type="button"
                  className="form-button"
                  onClick={handleBack}
                >
                  Voltar
                </button>
                <button type="submit" className="form-button">
                  Finalizar Cadastro
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cadastro;
