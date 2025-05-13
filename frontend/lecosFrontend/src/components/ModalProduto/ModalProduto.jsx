import { useState } from "react";

const ModalProduto = ({ produto, onClose, onAdicionarAoCarrinho }) => {
  if (!produto) return null;

  const [opcaoExtras, setOpcaoExtras] = useState("nenhum");
  const [observacao, setObservacao] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [precoExtra, setPrecoExtra] = useState(0);

  const [precoBase] = useState(() => {
    const valor = parseFloat(produto?.preco?.replace(",", "."));
    return isNaN(valor) ? 0 : valor;
  });

  const handleAdicionar = () => {
    const itemCarrinho = {
      nome: produto.nome,
      imagem: produto.imagem,
      precoUnitario: precoBase + precoExtra,
      quantidade,
      total: (precoBase + precoExtra) * quantidade,
      extra: opcaoExtras,
      observacao,
    };

    if (typeof onAdicionarAoCarrinho === "function") {
      onAdicionarAoCarrinho(itemCarrinho);
    } else {
      console.warn("onAdicionarAoCarrinho não foi passado como função");
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
        <span className="modal-fechar" onClick={onClose}>×</span>
        <h2>{produto.nome}</h2>
        <div className="modal-divisor"></div>
        <img src={produto.imagem} alt={produto.nome} className="modal-imagem-produto" />
        <p className="modal-descricao">{produto.descricao}</p>

        {produto.isCombo && (
          <div className="combo-opcoes">
            <fieldset className="combo-bloco">
              <legend>Ponto da Carne <span className="obrigatorio">Obrigatório</span></legend>
              <label><input type="radio" name="pontoCarne" value="Mal passada" /> Mal passada</label>
              <label><input type="radio" name="pontoCarne" value="Ao ponto" /> Ao ponto</label>
              <label><input type="radio" name="pontoCarne" value="Bem passada" /> Bem passada</label>
            </fieldset>

            <fieldset className="combo-bloco">
              <legend>Escolha seu Refrí <span className="obrigatorio">Obrigatório</span></legend>
              <label><input type="radio" name="refri" value="Guarana" /> Guarana Antarctica 350 ml</label>
              <label><input type="radio" name="refri" value="Coca" /> Coca Cola 350 ml</label>
            </fieldset>

            <fieldset className="combo-bloco">
              <legend>Batata Pires <span className="obrigatorio">Obrigatório</span></legend>
              <label><input type="radio" name="batata" value="Batata Pires" /> Batata Pires</label>
            </fieldset>

            <fieldset className="combo-bloco">
              <legend>Deseja ketchup e mostarda?</legend>
              <label><input type="radio" name="ketchup" value="Sim" /> Sim quero Ketchup e Mostarda</label>
            </fieldset>

            <fieldset className="combo-bloco combo-bloco-extras">
              <legend>Extras<span className="obrigatorio">Obrigatório</span></legend>
              <label className="label-extra">
                <input
                  type="radio"
                  name="extras"
                  value="maionese"
                  checked={opcaoExtras === "maionese"}
                  onChange={() => {
                    setOpcaoExtras("maionese");
                    setPrecoExtra(6);
                  }}
                />
                <div className="info-extra">
                  <span className="descricao-extra">Maionese Extra</span>
                  <span className="opcao-valor">R$ 6,00</span>
                </div>
              </label>
              <label className="label-extra">
                <input
                  type="radio"
                  name="extras"
                  value="bacon"
                  checked={opcaoExtras === "bacon"}
                  onChange={() => {
                    setOpcaoExtras("bacon");
                    setPrecoExtra(6);
                  }}
                />
                <div className="info-extra">
                  <span className="descricao-extra">Bacon Extra</span>
                  <span className="opcao-valor">R$ 6,00</span>
                </div>
              </label>
              <label className="label-extra">
                <input
                  type="radio"
                  name="extras"
                  value="nenhum"
                  checked={opcaoExtras === "nenhum"}
                  onChange={() => {
                    setOpcaoExtras("nenhum");
                    setPrecoExtra(0);
                  }}
                />
                <div className="info-extra">
                  <span className="descricao-extra">Não quero extras</span>
                </div>
              </label>
            </fieldset>

            <fieldset className="combo-bloco">
              <legend>Alguma observação?</legend>
              <textarea
                className="campo-observacao"
                maxLength="140"
                rows="3"
                placeholder="Ex: sem cebola, tenho alergia a pimenta."
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              />
              <div className="contador-caracteres">
                {observacao.length}/140 caracteres
              </div>
            </fieldset>
          </div>
        )}

        <div className="quantidade-e-finalizar">
          <div className="controle-quantidade">
            <button onClick={() => setQuantidade((q) => Math.max(1, q - 1))}>-</button>
            <span>{quantidade}</span>
            <button onClick={() => setQuantidade((q) => q + 1)}>+</button>
          </div>
          <button className="botao-adicionar-final" onClick={handleAdicionar}>
            Adicionar
            <br />
            R$ {(precoBase + precoExtra) * quantidade},00
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalProduto;
