import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./Pagamento.css";

const Pagamento = ({ onBack, totalGeral = 0 }) => {
  console.log("💸 Total Geral recebido no Pagamento:", totalGeral);

  const [metodoSelecionado, setMetodoSelecionado] = useState("pix"); // Default: Pix

  const handleSelecionarMetodo = (metodo) => {
    setMetodoSelecionado(metodo);
  };

  // Geração do Payload Pix dinâmico
  const chavePix = "chave-pix@lecosburguer.com";
  const nomeRecebedor = "LECO'S BURGUER";
  const cidade = "SAO PAULO";
  const valor = totalGeral.toFixed(2); // Subtotal + taxa
  const txid = "LECOS" + Date.now();

  // Construção do payload sem quebras de linha
  const payloadPix =
    "000201" +
    "26580014BR.GOV.BCB.PIX0136" +
    chavePix +
    "5204000053039865405" +
    valor +
    "5802BR5920" +
    nomeRecebedor.substring(0, 25) +
    "6009" +
    cidade.substring(0, 15) +
    "62100515" +
    txid +
    "6304";

  return (
    <div>
      <h3>Formas de Pagamento</h3>

      {/* Seleção de métodos */}
      <div className="metodos-pagamento">
        <div
          className={`card-metodo ${
            metodoSelecionado === "cartao" ? "selecionado" : ""
          }`}
          onClick={() => handleSelecionarMetodo("cartao")}
        >
          💳 Cartão de Crédito/Débito
        </div>

        <div
          className={`card-metodo ${
            metodoSelecionado === "pix" ? "selecionado" : ""
          }`}
          onClick={() => handleSelecionarMetodo("pix")}
        >
          🔗 Pix
        </div>
      </div>

      {/* Conteúdo Dinâmico */}
      <div className="detalhe-pagamento">
        {metodoSelecionado === "cartao" && (
          <p className="observacao">
            💳 Pagamento somente na entrega com máquina de cartão.
          </p>
        )}

        {metodoSelecionado === "pix" && (
          <div className="pix-content">
            <p>Escaneie o QR Code ou copie o código Pix abaixo:</p>

            {/* QRCode só aparece se valor for > 0 */}
            {valor > 0 ? (
              <>
                <QRCodeCanvas value={payloadPix} size={220} />
                <textarea
                  readOnly
                  value={payloadPix}
                  className="copia-cola"
                ></textarea>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(payloadPix)
                  }
                  className="btn-secundario"
                >
                  📋 Copiar código Pix
                </button>
              </>
            ) : (
              <p style={{ color: "red" }}>
                ⚠️ Erro: Valor do pedido não informado.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Botões */}
      <div className="buttons">
        <button onClick={onBack} className="btn-secundario">
          Voltar
        </button>
        <button className="btn-finalizar">Finalizar Pedido</button>
      </div>
    </div>
  );
};

export default Pagamento;
