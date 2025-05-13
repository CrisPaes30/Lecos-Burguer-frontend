import { FaShoppingCart } from "react-icons/fa";

const CardapioItem = ({ imagem, nome, descricao, preco, onAbrirModal }) => {
  return (
    <div className="cardapio-item">
      <img src={imagem} alt={nome} className="cardapio-img" />
      <div className="cardapio-info">
        <h3 className="cardapio-nome">{nome}</h3>
        <p className="cardapio-descricao">{descricao}</p>
        <div className="cardapio-preco">
          <span>R$ {preco}</span>
          <button className="botao-carrinho" onClick={() => onAbrirModal(nome)}>
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardapioItem;
