import { useState } from "react";

const ModalProduto = ({ produto, onClose, onAdicionarAoCarrinho }) => {
  if (!produto) return null;

  const [pontoCarne, setPontoCarne] = useState("");
  const [refri, setRefri] = useState("");
  const [opcaoExtras, setOpcaoExtras] = useState("nenhum");
  const [observacao, setObservacao] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [precoExtra, setPrecoExtra] = useState(0);
  const [precoRefri, setPrecoRefri] = useState(0);
  const [showErrors, setShowErrors] = useState(false); // 🚨 Mostrar erros?

  const precoBase = parseFloat(produto?.preco?.replace(",", ".")) || 0;

  const podeAdicionar = () => {
    if (produto.isCombo) {
      return pontoCarne !== "" && refri !== "";
    }
    if (produto.isLanche) {
      return pontoCarne !== "";
    }
    return true; // Porções, refrigerantes, extras não precisam validação
  };

  const handleAdicionar = () => {
    if (!podeAdicionar()) {
      setShowErrors(true); // 👉 Ativa mensagens de erro
      return;
    }

    const itemCarrinho = {
      nome: produto.nome,
      imagem: produto.imagem,
      precoUnitario: precoBase + precoExtra + precoRefri,
      quantidade,
      total: (precoBase + precoExtra + precoRefri) * quantidade,
      pontoCarne: produto.isCombo || produto.isLanche ? pontoCarne : null,
      refri: produto.isCombo ? refri : null,
      precoRefri: produto.isCombo ? precoRefri : 0,
      extras: produto.isCombo || produto.isLanche ? (opcaoExtras !== "nenhum" ? [opcaoExtras] : []) : [],
      precoExtras: produto.isCombo || produto.isLanche ? precoExtra : 0,
      observacao: produto.isCombo || produto.isLanche ? observacao.trim() : "",
    };

    if (typeof onAdicionarAoCarrinho === "function") {
      onAdicionarAoCarrinho(itemCarrinho);
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
        <span className="modal-fechar" onClick={onClose}>×</span>
        <h2>{produto.nome}</h2>
        <div className="modal-divisor"></div>
        <img
          src={produto.imagem}
          alt={produto.nome}
          className="modal-produto-imagem"
        />
        <p className="modal-descricao">{produto.descricao}</p>

        {/* === Mostrar opções só para combos/lanches === */}
        {(produto.isCombo || produto.isLanche) && (
          <div className="combo-opcoes">
            {/* Ponto da carne obrigatório */}
            <fieldset className="combo-bloco">
              <legend>Ponto da Carne <span className="obrigatorio">Obrigatório</span></legend>
              {["Mal passada", "Ao ponto", "Bem passada"].map((opcao) => (
                <label key={opcao} className="label-extra">
                  <input
                    type="radio"
                    name="pontoCarne"
                    value={opcao}
                    checked={pontoCarne === opcao}
                    onChange={() => {
                      setPontoCarne(opcao);
                      setShowErrors(false); // limpa erro ao selecionar
                    }}
                  />
                  <div className="info-extra">
                    <span className="descricao-extra">{opcao}</span>
                  </div>
                </label>
              ))}
              {showErrors && pontoCarne === "" && (
                <p style={{ color: "red", marginTop: "5px" }}>
                  ⚠️ Selecione o ponto da carne.
                </p>
              )}
            </fieldset>

            {/* Refri obrigatório para Combo */}
            {produto.isCombo && (
              <fieldset className="combo-bloco">
                <legend>Escolha seu Refrí <span className="obrigatorio">Obrigatório</span></legend>
                {["Guaraná Antarctica 350ml", "Coca-Cola 350ml"].map((bebida) => (
                  <label key={bebida} className="label-extra">
                    <input
                      type="radio"
                      name="refri"
                      value={bebida}
                      checked={refri === bebida}
                      onChange={() => {
                        setRefri(bebida);
                        setPrecoRefri(0);
                        setShowErrors(false); // limpa erro ao selecionar
                      }}
                    />
                    <div className="info-extra">
                      <span className="descricao-extra">{bebida}</span>
                    </div>
                  </label>
                ))}
                {showErrors && refri === "" && (
                  <p style={{ color: "red", marginTop: "5px" }}>
                    ⚠️ Selecione um refrigerante.
                  </p>
                )}
              </fieldset>
            )}

            {/* Extras opcionais */}
            <fieldset className="combo-bloco combo-bloco-extras">
              <legend>Extras <span className="opcional">(opcional)</span></legend>
              {["Maionese Extra", "Bacon Extra", "nenhum"].map((extra, index) => (
                <label key={index} className="label-extra">
                  <input
                    type="radio"
                    name="extras"
                    value={extra.toLowerCase()}
                    checked={opcaoExtras === extra.toLowerCase()}
                    onChange={() => {
                      setOpcaoExtras(extra.toLowerCase());
                      setPrecoExtra(extra !== "nenhum" ? 6 : 0);
                    }}
                  />
                  <div className="info-extra">
                    <span className="descricao-extra">{extra}</span>
                    {extra !== "nenhum" && (
                      <span className="opcao-valor">R$ 6,00</span>
                    )}
                  </div>
                </label>
              ))}
            </fieldset>

            {/* Observação */}
            <fieldset className="combo-bloco">
              <legend>Alguma observação?</legend>
              <textarea
                className="campo-observacao"
                maxLength="140"
                rows="3"
                placeholder="Ex: sem cebola, bem passado, etc."
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              />
              <div className="contador-caracteres">
                {observacao.length}/140 caracteres
              </div>
            </fieldset>
          </div>
        )}

        {/* Quantidade e Finalizar */}
        <div className="quantidade-e-finalizar">
          <div className="controle-quantidade">
            <button onClick={() => setQuantidade((q) => Math.max(1, q - 1))}>-</button>
            <span>{quantidade}</span>
            <button onClick={() => setQuantidade((q) => q + 1)}>+</button>
          </div>
          <button
            className="botao-adicionar-final"
            onClick={handleAdicionar}
          >
            Adicionar<br />R$ {(precoBase + precoExtra + precoRefri) * quantidade},00
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalProduto;
