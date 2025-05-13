import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CardapioItem from "../CardapioItem/CardapioItem";
import CarrinhoResumo from "../CarrinhoResumo/CarrinhoResumo";
import itens from "../../data/cardapio";
import ModalProduto from "../ModalProduto/ModalProduto";
import "./Pedido.css";

const Pedido = () => {
  const [aberto, setAberto] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
  const [mostrarResumo, setMostrarResumo] = useState(false);
  const [produtoModal, setProdutoModal] = useState(null);

  useEffect(() => {
    if (produtoModal) {
      document.body.classList.add("modal-aberto");
    } else {
      document.body.classList.remove("modal-aberto");
    }
  }, [produtoModal]);

  useEffect(() => {
    const verificarHorario = () => {
      const agora = new Date();
      const dia = agora.getDay(); // 0 = domingo
      const hora = agora.getHours();
      const minuto = agora.getMinutes();

      const diaValido = [0, 4, 5, 6].includes(dia); // dom, qui, sex, sab
      const horarioValido =
        (hora >= 19 && hora < 23) || (hora === 23 && minuto === 0);

      setAberto(diaValido && horarioValido);
    };

    verificarHorario();
    const intervalo = setInterval(verificarHorario, 60000);
    return () => clearInterval(intervalo);
  }, []);

  const abrirModalProduto = (nomeItem) => {
    const item = Object.values(itens).flat().find(i => i.nome === nomeItem);
    const isCombo = ["combo-promo", "combos"].some(cat =>
      itens[cat].some(prod => prod.nome === nomeItem)
    );
    if (item) {
      setProdutoModal({ ...item, isCombo });
    }
  };

  const incrementarItem = (item) => {
    setCarrinho((prev) => {
      const novo = { ...prev };
      if (!novo[item.nome]) novo[item.nome] = { ...item, quantidade: 0 };
      novo[item.nome].quantidade += 1;
      return novo;
    });
  };

  const decrementarItem = (item) => {
    setCarrinho((prev) => {
      const novo = { ...prev };
      if (novo[item.nome]) {
        novo[item.nome].quantidade -= 1;
        if (novo[item.nome].quantidade <= 0) delete novo[item.nome];
      }
      return novo;
    });
  };

  const adicionarAoCarrinho = (item) => {
    setCarrinho((prev) => [...prev, item]);
    setMostrarResumo(true);
    setProdutoModal(null);
  };
  

  const categorias = [
    { nome: "COMBO EM PROMO", id: "combo-promo" },
    { nome: "LANCHES", id: "lanches" },
    { nome: "COMBOS", id: "combos" },
    { nome: "PORÇÕES", id: "porcoes" },
    { nome: "REFRIGERANTES", id: "refrigerantes" },
    { nome: "EXTRAS", id: "extras" },
  ];

  const totalItens = Object.values(carrinho).reduce(
    (acc, item) => acc + item.quantidade,
    0
  );

  return (
    <div className="container">
      {/* Carrinho flutuante */}
      <div
        className="carrinho-topo"
        onClick={() => setMostrarResumo(!mostrarResumo)}
      >
        <FaShoppingCart size={24} />
        {totalItens > 0 && (
          <span className="carrinho-quantidade">{totalItens}</span>
        )}
      </div>

      {/* Topo com imagem e status */}
      <img
        src="./HamburguerMaoBacons.png"
        className="burguerTopo"
        alt="Hambúrguer"
      />
      <img src="./LogoNovo4.png" className="logoCentral" alt="Logo" />
      <div className="nomeLeco">
        <h1>LECO´S BURGUER</h1>
        <h2>Rua João Mendes Mesquita, 30, São Paulo, SP</h2>
        <div className={`status ${aberto ? "aberto" : "fechado"}`}>
          Aberto de Qui a Dom das 19h às 00h
        </div>
      </div>

      {/* Resumo do carrinho */}
      {mostrarResumo && (
        <CarrinhoResumo
          carrinho={carrinho}
          setCarrinho={setCarrinho}
          setMostrarResumo={setMostrarResumo}
        />
      )}

      {/* Modal de produto */}
      {produtoModal && (
        <ModalProduto
          produto={produtoModal}
          onClose={() => setProdutoModal(null)}
          onAdicionarAoCarrinho={adicionarAoCarrinho}
        />
      )}

      {/* Cardápio */}
      <div className="cardapio-container">
        <h2>Conheça nosso cardápio</h2>
        <nav className="menu-categorias">
          <ul>
            {categorias.map((cat) => (
              <li key={cat.id}>{cat.nome}</li>
            ))}
          </ul>
        </nav>

        {categorias.map((categoria) => (
          <div key={categoria.id} id={categoria.id} className="cardapio-secao">
            <h3>{categoria.nome}</h3>
            <div className="cardapio-grid">
              {itens[categoria.id]?.map((item, index) => (
                <CardapioItem
                  key={index}
                  imagem={item.imagem}
                  nome={item.nome}
                  descricao={item.descricao}
                  preco={item.preco}
                  quantidade={carrinho[item.nome]?.quantidade || 0}
                  incrementar={() => incrementarItem(item)}
                  decrementar={() => decrementarItem(item)}
                  onAbrirModal={abrirModalProduto}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pedido;
