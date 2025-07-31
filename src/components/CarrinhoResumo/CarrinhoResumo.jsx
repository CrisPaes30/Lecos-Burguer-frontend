import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../Finalizar/CarrinhoContext";
import "./CarrinhoResumo.css"

const CarrinhoResumo = forwardRef((_, ref) => {
  const { carrinho, setCarrinho } = useCarrinho();
  const navigate = useNavigate();

  const total = carrinho.reduce((acc, item) => acc + item.total, 0);

  return (
    <div ref={ref} className="resumo-carrinho">
      <h3>Seu Carrinho:</h3>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <>
          <ul className="lista-carrinho itens-scrollaveis">
            {carrinho.map((item, index) => (
              <li key={index} className="item-carrinho">
                <div className="item-info">
                  <div className="item-principal">
                    <strong>{item.quantidade}x</strong> {item.nome}
                    <div className="item-valor">
                      R$ {item.total?.toFixed(2) || "0.00"}
                    </div>
                  </div>

                  {item.pontoCarne && (
                    <p className="item-detalhe">
                      Ponto da carne: {item.pontoCarne}
                    </p>
                  )}
                  {item.refri && (
                    <p className="item-detalhe">
                      + {item.refri} — R$ {(item.precoRefri ?? 0).toFixed(2)}
                    </p>
                  )}
                  {item.extras &&
                    item.extras.length > 0 &&
                    item.extras.map((extra, i) => (
                      <p className="item-detalhe" key={i}>
                        + {extra} — R$ {(item.precoExtras ?? 0).toFixed(2)}
                      </p>
                    ))}
                  {item.observacao && (
                    <p
                      className="item-detalhe"
                      style={{ fontStyle: "italic", color: "#666" }}
                    >
                      Obs: {item.observacao}
                    </p>
                  )}
                </div>

                {/* Botão para excluir item */}
                <button
                  className="botao-remover-item"
                  title="Remover este item"
                  onClick={() => {
                    const novoCarrinho = [...carrinho];
                    novoCarrinho.splice(index, 1);
                    setCarrinho(novoCarrinho);
                  }}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>

          <div className="acoes-carrinho">
            <button
              className="botao-finalizar"
              onClick={() => navigate("/finalizarCompra")}
            >
              Finalizar Pedido
            </button>
            <div
              className="botao-lixeira"
              title="Limpar Carrinho"
              onClick={() => setCarrinho([])}
            >
              🗑️
            </div>
          </div>
        </>
      )}
    </div>
  );
});

export default CarrinhoResumo;
