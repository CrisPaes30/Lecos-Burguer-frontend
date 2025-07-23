import { useEffect, useState } from "react";
import "./Cadastro.css";
import { cadastrarUsuario } from "../../services/CadastroService/CadastroService";
import ModalErro from "../ModalCadastro/ModalErro";
import ModalSucesso from "../ModalCadastro/ModalSucesso";

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
  const [showModalSucesso, setShowModalSucesso] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
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
  const [erros, setErros] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [mensagensErro, setMensagensErro] = useState([]);

  const generateUUID = () => crypto.randomUUID();
  const [itemId] = useState(generateUUID());

  const [senhaValida, setSenhaValida] = useState({
    numero: false,
    maiuscula: false,
    minuscula: false,
    simbolo: false,
    tamanho: false,
  });

  // Função para validar a senha
  const validarSenha = (senha) => {
    const regras = {
      numero: /\d/.test(senha),
      maiuscula: /[A-Z]/.test(senha),
      minuscula: /[a-z]/.test(senha),
      simbolo: /[!@#$%^&*(),.?":{}|<>]/.test(senha),
      tamanho: senha.length >= 6,
    };
    setSenhaValida(regras);
    return Object.values(regras).every(Boolean);
  };

  useEffect(() => {
    if (etapaTexto < frases.length) {
      const timer = setTimeout(() => setEtapaTexto(etapaTexto + 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setMostrarForm(true), 3000);
    }
  }, [etapaTexto]);

  const handleSubmitSenha = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (senha !== confirmarSenha) {
      setErros({ senha: "As senhas não coincidem!" });
      setLoading(false);
      return;
    }

    const payload = {
      items: [
        {
          cadastro: {
            nome: name,
            sobrenome: sobrenome,
            email: email,
            cpfCnpj: cpfCnpj,
            telefone: telefone,
            endereco: {
              cep,
              logradouro: rua,
              bairro,
              numero,
              complemento,
              uf,
            },
            usuario: usuario,
            senha: senha,
            indNotificacao: desejaWhatsApp,
          },
        },
      ],
    };

    try {
      const result = await cadastrarUsuario(payload);

      if (!result.success) {
        const mensagens = Object.values(result.errors);
        setMensagensErro(mensagens);
        setShowModal(true);
        setLoading(false); 
      } else {
        setLoading(false);
        setShowModalSucesso(true);
      }
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      setMensagensErro(["Erro inesperado. Tente novamente mais tarde."]);
      setShowModal(true);
      setLoading(false); 
    }
  };

  const handleSubmitPessoais = (e) => {
    e.preventDefault();
    if (!name || !sobrenome || !email) {
      setErros({ geral: "Preencha todos os campos obrigatórios." });
      return;
    }
    setErros({});
    setFormEtapa(2);
  };

  const handleSubmitCpfTelefone = (e) => {
    e.preventDefault();
    if (!cep || !rua || !bairro || !numero || !uf) {
      setErros({ geral: "Preencha todos os campos obrigatórios." });
      return;
    }
    setErros({});
    setFormEtapa(3);
  };

  const handleSubmitEndereco = (e) => {
    e.preventDefault();
    if (!cpfCnpj || !telefone) {
      setErros({ geral: "Preencha todos os campos obrigatórios." });
      return;
    }
    setErros({});
    setMostrarForm(false);
    setMostrarMensagemSenha(true);

    setTimeout(() => {
      setMostrarMensagemSenha(false);
      setMostrarFormSenha(true);
    }, 2000);
  };

  const handleBack = () => {
    if (mostrarFormSenha) {
      setMostrarFormSenha(false);
      setMostrarForm(true);
      setFormEtapa(3);
    } else if (formEtapa > 1) {
      setFormEtapa(formEtapa - 1);
    } else {
      setMostrarForm(false);
      setEtapaTexto(1);
    }
  };

  return (
    <div className="page-container-cadastro">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner-large"></div>
          <p className="loading-text">Aguarde, estamos finalizando seu cadastro...</p>
        </div>
      )}

      {!loading && (
        <>
          {showModalSucesso && (
            <ModalSucesso
              mensagem="Cadastro realizado com sucesso! \n Encaminhamos um email para validação!!"
              onConfirm={() => (window.location.href = "/pedidos")}
            />
          )}

          <div className="brand">
            <img src="./LogoNovo4.png" alt="Logo" className="logo-icon" />
            <div className="brand-text-cadastro">
              <span className="brand-title-cadastro">LECO´S</span>
              <span className="brand-subtitle-cadastro">BURGUER</span>
            </div>
          </div>
          <div className="background-logo"></div>
          <div className="Cadastro">
            {showModal && (
              <ModalErro
                mensagens={mensagensErro}
                onClose={() => setShowModal(false)}
              />
            )}
            {!mostrarForm && !mostrarMensagemSenha && !mostrarFormSenha && (
              <div
                className="intro-text"
                style={{ fontFamily: "Rock Salt, cursive" }}
              >
                <h1>{frases[etapaTexto - 1]}</h1>
              </div>
            )}

            {mostrarMensagemSenha && (
              <div
                className="intro-text"
                style={{ fontFamily: "Rock Salt, cursive" }}
              >
                <h2>
                  Antes de finalizar seu cadastro, vamos cadastrar sua senha!
                </h2>
              </div>
            )}

            {mostrarForm && (
              <div className="cadastro-form">
                {formEtapa === 1 && (
                  <form
                    className="cadastro-fields"
                    onSubmit={handleSubmitPessoais}
                  >
                    <input
                      type="text"
                      placeholder="Nome"
                      className="form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {erros.nome && <p className="erro-campos">{erros.nome}</p>}
                    <input
                      type="text"
                      placeholder="Sobrenome"
                      className="form-input"
                      value={sobrenome}
                      onChange={(e) => setSobrenome(e.target.value)}
                    />
                    <input
                      type="usuario"
                      placeholder="Usuário"
                      className="form-input"
                      value={usuario}
                      onChange={(e) => setUsuario(e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {erros.email && (
                      <p className="erro-campos">{erros.email}</p>
                    )}
                    {erros.geral && (
                      <p className="erro-campos">{erros.geral}</p>
                    )}
                    <button type="submit" className="form-button">
                      Próximo
                    </button>
                  </form>
                )}

                {formEtapa === 2 && (
                  <form
                    className="cadastro-fields"
                    onSubmit={handleSubmitCpfTelefone}
                  >
                    <input
                      type="text"
                      placeholder="Cep"
                      className="form-input"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                    />
                    {erros.cep && <p className="erro-campos">{erros.cep}</p>}
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
                    {erros.geral && (
                      <p className="erro-campos">{erros.geral}</p>
                    )}
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
                  <form
                    className="cadastro-fields"
                    onSubmit={handleSubmitEndereco}
                  >
                    <input
                      type="text"
                      placeholder="CPF/CNPJ"
                      className="form-input"
                      value={cpfCnpj}
                      onChange={(e) => setCpfCnpj(e.target.value)}
                    />
                    {erros.cpfCnpj && (
                      <p className="erro-campos">{erros.cpfCnpj}</p>
                    )}
                    <input
                      type="text"
                      placeholder="Telefone"
                      className="form-input"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                    />
                    {erros.telefone && (
                      <p className="erro-campos">{erros.telefone}</p>
                    )}
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
                    {erros.geral && (
                      <p className="erro-campos">{erros.geral}</p>
                    )}
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
                  <div className="senha-requisitos">
                    <p className={senhaValida.tamanho ? "valido" : "invalido"}>
                      {senhaValida.tamanho ? "✔" : "❌"} Mínimo 6 caracteres
                    </p>
                    <p className={senhaValida.numero ? "valido" : "invalido"}>
                      {senhaValida.numero ? "✔" : "❌"} Contém número
                    </p>
                    <p
                      className={senhaValida.maiuscula ? "valido" : "invalido"}
                    >
                      {senhaValida.maiuscula ? "✔" : "❌"} Letra maiúscula
                    </p>
                    <p
                      className={senhaValida.minuscula ? "valido" : "invalido"}
                    >
                      {senhaValida.minuscula ? "✔" : "❌"} Letra minúscula
                    </p>
                    <p className={senhaValida.simbolo ? "valido" : "invalido"}>
                      {senhaValida.simbolo ? "✔" : "❌"} Caractere especial
                      (!@#$)
                    </p>
                  </div>
                  <input
                    type="password"
                    placeholder="Senha"
                    className="form-input"
                    value={senha}
                    onChange={(e) => {
                      setSenha(e.target.value);
                      validarSenha(e.target.value);
                    }}
                  />
                  {erros.senha && <p className="erro-senha">{erros.senha}</p>}
                  <input
                    type="password"
                    placeholder="Confirmar Senha"
                    className="form-input"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                  />
                  <div className="barra-forca">
                    <div
                      className={`forca ${
                        Object.values(senhaValida).filter(Boolean).length <= 2
                          ? "fraca"
                          : Object.values(senhaValida).filter(Boolean).length <=
                            4
                          ? "media"
                          : "forte"
                      }`}
                      style={{
                        width: `${
                          Object.values(senhaValida).filter(Boolean).length * 20
                        }%`,
                      }}
                    ></div>
                  </div>
                  {erros.geral && <p className="erro-campos">{erros.geral}</p>}
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
        </>
      )}
    </div>
  );
};

export default Cadastro;
