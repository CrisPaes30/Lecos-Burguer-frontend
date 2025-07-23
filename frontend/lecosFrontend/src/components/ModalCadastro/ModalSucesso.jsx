import React from "react";
import "./ModalSucesso.css";

const ModalSucesso = ({ mensagem, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <span className="modal-icone">✅</span>
        <h2>Sucesso!</h2>
        <p>{mensagem}</p>
        <button className="modal-botao" onClick={onConfirm}>
          Ok
        </button>
      </div>
    </div>
  );
};

export default ModalSucesso;
