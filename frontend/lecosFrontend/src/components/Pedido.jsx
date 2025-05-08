import "./Pedido.css";
import PromoFininho from "../assets/comboPromo/promoFininho.jpg";
import PromoFinhinhoAcebolado from "../assets/comboPromo/promoFininhoAcebolado.jpg";
import Queijudo from "../assets/lanches/Queijudo.jpeg";
import Baconzin from "../assets/lanches/Baconzin.jpeg";
import FininQueijudo from "../assets/lanches/FininhoQueijudo.jpeg";
import FininAcebolado from "../assets/lanches/FininhoAcebolado.jpeg";
import ChickenCebolinha from "../assets/lanches/ChickenCebolinha.jpeg";
import ComboQueijudo from "../assets/combos/comboQueijudo2.jpg";
import ComboBaconzin from "../assets/combos/comboBaconzin2.jpg";
import ComboChickenCebolinha from "../assets/combos/ComboChickenCebolinha2.jpg";
import Fritas from "../assets/extras/fritas.jpg";
import BanconExtra from "../assets/extras/bacon2.webp";
import Maionese from "../assets/extras/maione.webp";
import CocaRefri from "../assets/refrigerantes/coca-cola.jpg";
import Guarana from "../assets/refrigerantes/guarana.jpg";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";

const CardapioItem = ({ imagem, nome, descricao, preco, quantidade, incrementar, decrementar }) => {
  const [mostraControles, setMostraControles] = useState(false);

  const toggleControles = () => {
    setMostraControles(true);
    // NÃO chame mais incrementar() aqui!
  };

  return (
    <div className="cardapio-item">
      <img src={imagem} alt={nome} className="cardapio-img" />
      <div className="cardapio-info">
        <h3 className="cardapio-nome">{nome}</h3>
        <p className="cardapio-descricao">{descricao}</p>
        <div className="cardapio-preco">
          <span>R$ {preco}</span>
          {quantidade > 0 ? (
  <div className="controle-quantidade">
    <button onClick={decrementar}>−</button>
    <span>{quantidade}</span>
    <button onClick={incrementar}>+</button>
  </div>
) : (
  <button className="botao-carrinho" onClick={incrementar}>
    <FaShoppingCart />
  </button>
)}
        </div>
      </div>
    </div>
  );
};


const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const itens = {
  "combo-promo": [
    {
      imagem: PromoFininho,
      nome: "PROMO Combo Fininho Queijudo",
      descricao: "Nosso saboroso Fininho Queijudo + 1 refri de sua preferencia + Batata Pires (100g) (Peso da carne pré preparo)",
      preco: "37,00",
    },
    {
      imagem: PromoFinhinhoAcebolado,
      nome: "PROMO Combo Fininho Acebolado",
      descricao: "Nosso saboroso Fininho Acebolado + 1 refri de sua preferencia + Batata Pires (100g) (Peso da carne pré preparo)",
      preco: "37,00",
    },
  ],
  lanches: [
    {
      imagem: Queijudo,
      nome: "Queijudo",
      descricao: "Burger de 160g com um disco delicioso de catupiry empanado e couve crispy com a base de maionese verde. (Peso da carne pré preparo)",
      preco: "35,00",
    },
    {
      imagem: Baconzin,
      nome: "Baconzin",
      descricao: "Burger de 160g coberto por fatias de queijo cheddar e fatias de bacon, com a base do nosso molho coronel e fatias de cebola branca. (Peso da carne pré preparo)",
      preco: "33,00",
    },
    {
      imagem: FininQueijudo,
      nome: "Fininho Queijudo",
      descricao: "Dois hamburgers prensados com 100g cada, cobertos por fatias de queijo cheddar e uma base da nossa maionese verde. (Peso da carne pré preparo)",
      preco: "33,00",
    },
    {
      imagem: FininAcebolado,
      nome: "Fininho Queijudo",
      descricao: "Dois hamburgers de 100g prensados com cebola branca e cobertos por fatias de queijo cheddar com a base de maionese verde. (Peso da carne pré preparo)",
      preco: "33,00",
    },
    {
      imagem: ChickenCebolinha,
      nome: "Chicken Cebolinha",
      descricao: "Dois hamburgers de 100g prensados com cebola branca e cobertos por fatias de queijo cheddar com a base de maionese verde. (Peso da carne pré preparo)",
      preco: "25,00",
    },
  ],
  combos: [
    {
      imagem: ComboQueijudo,
      nome: "Combo Queijudo",
      descricao: "O grande Queijudo + 1 refri de sua preferencia + Batata Pires (100g) (Peso da carne pré preparo)",
      preco: "47,00",
    },
    {
      imagem: ComboBaconzin,
      nome: "Combo Baconzin",
      descricao: "O nosso delicioso Baconzin + 1 refri de sua preferencia + Batata Pires (100g) (Peso da carne pré preparo)",
      preco: "46,00",
    },
    {
      imagem: ComboChickenCebolinha,
      nome: "Combo Chicken Cebolinha",
      descricao: "Nosso Chicken Cebolinha + Batata Pires + Refri a sua escolha",
      preco: "35,00",
    },
  ],
  porcoes: [
    {
      imagem: Fritas,
      nome: "Batata Pires",
      descricao: "Batata frita 100g",
      preco: "6,00",
    },
  ],
  refrigerantes: [
    {
      imagem: CocaRefri,
      nome: "Coca-Cola 350ml",
      descricao: "Refrigerante gelado",
      preco: "6,00",
    },
    {
      imagem: Guarana,
      nome: "Guaraná Antarctica 350ml",
      descricao: "Refrigerante gelado",
      preco: "6,00",
    },
  ],
  extras: [
    {
      imagem: Maionese,
      nome: "Maionese Extra",
      descricao: "Pote de maionese extra",
      preco: "6,00",
    },
    {
      imagem: BanconExtra,
      nome: "Bacon Extra",
      descricao: "Bacon Extra 50g",
      preco: "6,00",
    },
  ],
};

const Pedido = () => {
  const [aberto, setAberto] = useState(false);
  const [carrinho, setCarrinho] = useState({});
  const [mostrarResumo, setMostrarResumo] = useState(false);

  useEffect(() => {
    const verificarHorario = () => {
      const agora = new Date();
      const diaSemana = agora.getDay();
      const horaAtual = agora.getHours();
      const minutosAtuais = agora.getMinutes();
      const diaValido =
        diaSemana === 4 || diaSemana === 5 || diaSemana === 6 || diaSemana === 0;
      const horarioValido =
        (horaAtual > 18 && horaAtual < 23) || (horaAtual === 23 && minutosAtuais === 0);
      setAberto(diaValido && horarioValido);
    };

    verificarHorario();
    const intervalo = setInterval(verificarHorario, 60000);
    return () => clearInterval(intervalo);
  }, []);

  const incrementarItem = (item) => {
    setCarrinho((prev) => {
      const novoCarrinho = { ...prev };
      if (!novoCarrinho[item.nome]) {
        novoCarrinho[item.nome] = { ...item, quantidade: 0 };
      }
      novoCarrinho[item.nome].quantidade += 1;
      return novoCarrinho;
    });
  };
  
  const decrementarItem = (item) => {
    setCarrinho((prev) => {
      const novoCarrinho = { ...prev };
      if (novoCarrinho[item.nome]) {
        novoCarrinho[item.nome].quantidade -= 1;
        if (novoCarrinho[item.nome].quantidade <= 0) {
          delete novoCarrinho[item.nome];
        }
      }
      return novoCarrinho;
    });
  };

  const totalItens = Object.values(carrinho).reduce((acc, item) => acc + item.quantidade, 0);

  const categorias = [
    { nome: "COMBO EM PROMO", id: "combo-promo" },
    { nome: "LANCHES", id: "lanches" },
    { nome: "COMBOS", id: "combos" },
    { nome: "PORÇÕES", id: "porcoes" },
    { nome: "REFRIGERANTES", id: "refrigerantes" },
    { nome: "EXTRAS", id: "extras" },
  ];

  return (
    <div className="container">
      {/* Carrinho fixo no topo direito */}
      <div className="carrinho-topo" onClick={() => setMostrarResumo(!mostrarResumo)}>
        <FaShoppingCart size={24} />
        {totalItens > 0 && <span className="carrinho-quantidade">{totalItens}</span>}
      </div>

      {/* Conteúdo normal da página */}
      <img
        src="./HamburguerMaoBacons.png"
        className="burguerTopo"
        alt="Hambúrguer de Fundo"
      />
      <img src="./LogoNovo4.png" className="logoCentral" alt="Logo" />
      <div className="nomeLeco">
        <h1>LECO´S BURGUER</h1>
        <h2>Rua João Mendes Mesquita, 30, São Paulo, SP</h2>
        <div className={`status ${aberto ? "aberto" : "fechado"}`}>
          Aberto de Qui a Dom das 19h às 00h
        </div>
      </div>

      {mostrarResumo && (
  <div className="resumo-carrinho">
    <h3>Seu Carrinho:</h3>
    {Object.keys(carrinho).length === 0 ? (
      <p>Seu carrinho está vazio</p>
    ) : (
      <>
        <ul className="lista-carrinho">
          {Object.entries(carrinho).map(([nome, item]) => (
            <li key={nome} className="item-carrinho">
              <span><strong>{item.quantidade}x</strong> {nome}</span>
              <span><strong>R$ {(item.quantidade * parseFloat(item.preco.replace(',', '.'))).toFixed(2)}</strong></span>
            </li>
          ))}
        </ul>
        <div className="total-carrinho">
          <strong>Total:</strong> R$ {Object.values(carrinho)
            .reduce((acc, item) => acc + item.quantidade * parseFloat(item.preco.replace(',', '.')), 0)
            .toFixed(2)}
        </div>
        <div className="acoes-carrinho">
          <button className="botao-finalizar">Finalizar Pedido</button>
          <div className="botao-lixeira" title="Limpar Carrinho" onClick={() => setCarrinho({})}>
            🗑️
          </div>
        </div>
      </>
    )}
  </div>
)}


      <div className="cardapio-container">
        <h2>Conheça nosso cardápio</h2>
        <nav className="menu-categorias">
          <ul>
            {categorias.map((categoria) => (
              <li key={categoria.id}>
                {categoria.nome}
              </li>
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