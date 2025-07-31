import "./FinalizarCarrinho.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrinho } from "./CarrinhoContext";
import Endereco from "./Endereco";
import Pagamento from "./Pagamento";

const FinalizarCarrinho = () => {
  const [step, setStep] = useState(1);
  const { carrinho } = useCarrinho(); // <- usa o carrinho global
  const navigate = useNavigate();

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Calcular total do carrinho
  const subtotal = carrinho.reduce((acc, item) => acc + item.total, 0);
  const taxaEntrega = 5.0;
  const totalGeral = subtotal + taxaEntrega;

  return (
    <div className="container">
      {/* Topo com imagem e logo */}
      <img
        src="./HamburguerMaoBacons.png"
        className="burguerTopo"
        alt="Hambúrguer"
      />
      <img src="./LogoNovo4.png" className="logoCentral" alt="Logo" />
      <div className="nomeLeco">
        <h1>LECO´S BURGUER</h1>
        <h2>Rua João Mendes Mesquita, 30, São Paulo, SP</h2>
      </div>

      {/* Stepper */}
      <div className="stepper">
        <div className="step">
          <div className={`circle ${step >= 1 ? "active" : ""}`}>1</div>
          <span className={step === 1 ? "active-text" : ""}>Pedido</span>
        </div>
        <div className={`line ${step >= 2 ? "active" : ""}`}></div>
        <div className="step">
          <div className={`circle ${step >= 2 ? "active" : ""}`}>2</div>
          <span className={step === 2 ? "active-text" : ""}>Endereço</span>
        </div>
        <div className={`line ${step >= 3 ? "active" : ""}`}></div>
        <div className="step">
          <div className={`circle ${step >= 3 ? "active" : ""}`}>3</div>
          <span className={step === 3 ? "active-text" : ""}>Pagamento</span>
        </div>
      </div>

      {/* Conteúdo dinâmico das Etapas */}
      <div className="stepContent">
        {step === 1 && (
          <ResumoPedido
            carrinho={carrinho}
            subtotal={subtotal}
            taxaEntrega={taxaEntrega}
            totalGeral={totalGeral}
            onNext={nextStep}
            onVoltar={() => navigate("/pedidos")}
          />
        )}
        {step === 2 && <Endereco onNext={nextStep} onBack={prevStep} />}
        {step === 3 && <Pagamento onBack={prevStep} totalGeral={totalGeral} />}
      </div>
    </div>
  );
};

// Componente: Resumo do Pedido
const ResumoPedido = ({
  carrinho,
  subtotal,
  taxaEntrega,
  totalGeral,
  onNext,
}) => {
  const navigate = useNavigate();

  const handleVoltarParaPedidos = () => {
    navigate("/pedidos");
  };

  return (
    <div>
      <h3>Resumo do Pedido</h3>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {carrinho.map((item, index) => (
            <div key={index} className="card-pedido">
              <p className="card-header">
                <strong>
                  {item.quantidade}x {item.nome}
                </strong>{" "}
                — R$ {item.total?.toFixed(2) || "0.00"}
              </p>

              <div className="detalhes-pedido">
                {/* Refrigerante */}
                {item.refri && (
                  <p>
                    + {item.refri} — R$ {(item.precoRefri ?? 0).toFixed(2)}
                  </p>
                )}

                {/* Extras */}
                {item.extras &&
                  item.extras.map((extra, i) => (
                    <p key={i}>
                      + {extra} — R$ {(item.precoExtras ?? 0).toFixed(2)}
                    </p>
                  ))}

                {/* Ponto da Carne */}
                {item.pontoCarne && <p>Ponto da carne: {item.pontoCarne}</p>}

                {/* Observação */}
                {item.observacao && (
                  <p>
                    <em>Obs:</em> {item.observacao}
                  </p>
                )}
              </div>
            </div>
          ))}

          <p>Subtotal: R$ {subtotal.toFixed(2)}</p>
          <p>Taxa de Entrega: R$ {taxaEntrega.toFixed(2)}</p>
          <p>
            <strong>Total: R$ {totalGeral.toFixed(2)}</strong>
          </p>
          <div className="buttons">
            <button onClick={handleVoltarParaPedidos}>
              ⬅️ Voltar para Pedidos
            </button>
            <button onClick={onNext}>Continuar para Endereço</button>
          </div>
        </>
      )}
    </div>
  );
};

export default FinalizarCarrinho;
