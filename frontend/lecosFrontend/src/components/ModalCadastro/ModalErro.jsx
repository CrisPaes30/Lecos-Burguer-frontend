import React from "react";
import "./ModalErro.css";

const ModalErro = ({ mensagens, onClose }) => {
  return (
    <div className="modal-erro-overlay">
      <div className="modal-erro-content">
        <div className="modal-erro-header">
          <span className="modal-erro-icon">⚠️</span>
          <h2>Ops! Algo deu errado</h2>
        </div>
        <div className="modal-erro-body">
          <ul>
            {mensagens.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
        <div className="modal-erro-footer">
          <button className="modal-erro-btn" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalErro;
