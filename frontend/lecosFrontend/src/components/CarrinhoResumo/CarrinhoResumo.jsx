const CarrinhoResumo = ({ carrinho, setCarrinho, setMostrarResumo }) => {
  const precoExtraFixo = 6;

  const total = carrinho.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="resumo-carrinho">
      <h3>Seu Carrinho:</h3>

      {Object.keys(carrinho).length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <>
          <ul className="lista-carrinho itens-scrollaveis">
            {carrinho.map((item, index) => (
              <li key={index} className="item-carrinho">
                <div>
                  {/* Produto principal */}
                  <div className="item-principal">
                    <strong>{item.quantidade}x</strong> {item.nome}
                    <div className="item-valor">
                      R$ {item.total?.toFixed(2) || "0.00"}
                    </div>
                  </div>

                  {/* Extras (se houver) */}
                  {item.extra && item.extra !== "nenhum" && (
                    <div className="item-extra">
                      + {item.quantidade}x {item.extra} — R${" "}
                      {(item.quantidade * precoExtraFixo).toFixed(2)}
                    </div>
                  )}

                  {/* Observações (se houver) */}
                  {item.observacao && item.observacao.trim() !== "" && (
                    <div
                      className="item-extra"
                      style={{ fontStyle: "italic", color: "#666" }}
                    >
                      Obs: {item.observacao}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Total geral */}
          <div className="total-carrinho">
            <strong>Total:</strong> R$ {total.toFixed(2)}
          </div>

          {/* Ações */}
          <div className="acoes-carrinho">
            <button
              className="botao-finalizar"
              // onClick={() => finalizarPedido()}
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
};

export default CarrinhoResumo;
