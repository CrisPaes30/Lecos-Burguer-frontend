import "./Endereco.css";
import { useState, useEffect } from "react";

const Endereco = ({ onNext, onBack }) => {
  const [endereco, setEndereco] = useState({
    nome: "",
    telefone: "",
    endereco: "",
    complemento: "",
    cidade: "",
    cep: "",
  });

  const [enderecoOriginal, setEnderecoOriginal] = useState(null); // para comparar alterações
  const [modoNovoEndereco, setModoNovoEndereco] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [enderecosSalvos, setEnderecosSalvos] = useState([]);

  // Carregar endereço do usuário ao abrir
  useEffect(() => {
    fetch("/api/usuario/endereco") // <-- ajuste a URL da sua API
      .then((res) => res.json())
      .then((data) => {
        setEndereco(data);
        setEnderecoOriginal(data); // salva o original para comparar depois
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEndereco((prev) => ({ ...prev, [name]: value }));
  };

  const handleNovoEndereco = () => {
    setEndereco({
      nome: "",
      telefone: "",
      endereco: "",
      complemento: "",
      cidade: "",
      cep: "",
    });
    setModoNovoEndereco(true);
  };

  const handleContinuar = () => {
    const houveMudanca =
      JSON.stringify(endereco) !== JSON.stringify(enderecoOriginal);

    if (houveMudanca && modoNovoEndereco) {
      if (
        window.confirm("Deseja salvar este novo endereço para futuras compras?")
      ) {
        fetch("/api/usuario/endereco", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(endereco),
        });
      }
    }
    onNext();
  };

 {/* const abrirModalEnderecos = () => {
    fetch("/api/usuario/enderecos") // <-- ajuste para a sua API
      .then((res) => res.json())
      .then((data) => {
        setEnderecosSalvos(data);
        setMostrarModal(true);
      });
  };*/}

  const mockEnderecos = [
    {
      nome: "Cristian Paes",
      telefone: "(11) 99999-9999",
      endereco: "Rua das Flores, 123",
      complemento: "Apto 45",
      cidade: "São Paulo",
      cep: "01000-000"
    },
    {
      nome: "Cristian Paes",
      telefone: "(11) 98888-8888",
      endereco: "Av. Paulista, 1578",
      complemento: "Conj. 101",
      cidade: "São Paulo",
      cep: "01310-200"
    }
  ];
  
  const abrirModalEnderecos = () => {
    setEnderecosSalvos(mockEnderecos);
    setMostrarModal(true);
  };

  const selecionarEndereco = (item) => {
    setEndereco(item);
    setMostrarModal(false);
  };

  return (
    <div>
      <h3>Confirmação de Endereço</h3>
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={endereco.nome}
        onChange={handleChange}
      />
      <input
        type="text"
        name="telefone"
        placeholder="Telefone"
        value={endereco.telefone}
        onChange={handleChange}
      />
      <input
        type="text"
        name="endereco"
        placeholder="Endereço"
        value={endereco.endereco}
        onChange={handleChange}
      />
      <input
        type="text"
        name="complemento"
        placeholder="Complemento"
        value={endereco.complemento}
        onChange={handleChange}
      />
      <input
        type="text"
        name="cidade"
        placeholder="Cidade"
        value={endereco.cidade}
        onChange={handleChange}
      />
      <input
        type="text"
        name="cep"
        placeholder="CEP"
        value={endereco.cep}
        onChange={handleChange}
      />

      <div className="buttons">
        <button onClick={onBack} className="btn-secundario">
          Voltar
        </button>
        <button onClick={handleNovoEndereco} className="btn-secundario">
          Novo Endereço
        </button>
        <button onClick={abrirModalEnderecos} className="btn-secundario">
          Meus Endereços
        </button>
        <button onClick={handleContinuar} className="btn-secundario">
          Continuar para Pagamento
        </button>
      </div>

      {/* Modal de endereços salvos */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Meus Endereços</h4>

            {enderecosSalvos.length > 0 ? (
              <ul>
                {enderecosSalvos.map((item, index) => (
                  <li key={index}>
                    <button
                      className="endereco-item"
                      onClick={() => selecionarEndereco(item)}
                    >
                      {item.endereco}, {item.cidade} - {item.cep}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">
                <p>🏠 Nenhum endereço salvo.</p>
                <p>Adicione um novo para continuar.</p>
                <button
                  onClick={() => {
                    setMostrarModal(false);
                    handleNovoEndereco();
                  }}
                  className="btn-secundario"
                >
                  + Adicionar Novo
                </button>
              </div>
            )}

            <button
              onClick={() => setMostrarModal(false)}
              className="fechar-modal"
              style={{ marginTop: "1rem" }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Endereco;
