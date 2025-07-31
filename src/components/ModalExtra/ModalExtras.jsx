
const ModalExtras = ({ itemSelecionado, itens, onClose, onSelecionarExtra }) => {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
          <span className="modal-fechar" onClick={onClose}>×</span>
          <h3>Adicionais para: {itemSelecionado?.nome}</h3>
          <ul className="extras-lista">
            {itens.extras.map((extra) => (
              <li key={extra.nome} onClick={() => onSelecionarExtra(extra.nome)}>
                + {extra.nome} — R$ {extra.preco}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default ModalExtras;
  