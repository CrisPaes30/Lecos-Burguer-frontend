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

const itens = {
  "combo-promo": [
    {
      imagem: PromoFininho,
      nome: "PROMO Combo Fininho Queijudo",
      descricao: "Fininho Queijudo + 1 refri + batata 100g",
      preco: "37,00",
    },
    {
      imagem: PromoFinhinhoAcebolado,
      nome: "PROMO Combo Fininho Acebolado",
      descricao: "Fininho Acebolado + 1 refri + batata 100g",
      preco: "37,00",
    },
  ],
  lanches: [
    {
      imagem: Queijudo,
      nome: "Queijudo",
      descricao: "Burger 160g com catupiry empanado e couve crispy",
      preco: "35,00",
    },
    {
      imagem: Baconzin,
      nome: "Baconzin",
      descricao: "Burger 160g com cheddar, bacon e molho coronel",
      preco: "33,00",
    },
    {
      imagem: FininQueijudo,
      nome: "Fininho Queijudo",
      descricao: "Dois burgers 100g com cheddar e maionese verde",
      preco: "33,00",
    },
    {
      imagem: FininAcebolado,
      nome: "Fininho Acebolado",
      descricao: "Dois burgers 100g com cebola e cheddar",
      preco: "33,00",
    },
    {
      imagem: ChickenCebolinha,
      nome: "Chicken Cebolinha",
      descricao: "Frango prensado com cebola e cheddar",
      preco: "25,00",
    },
  ],
  combos: [
    {
      imagem: ComboQueijudo,
      nome: "Combo Queijudo",
      descricao: "Queijudo + refri + batata",
      preco: "47,00",
    },
    {
      imagem: ComboBaconzin,
      nome: "Combo Baconzin",
      descricao: "Baconzin + refri + batata",
      preco: "46,00",
    },
    {
      imagem: ComboChickenCebolinha,
      nome: "Combo Chicken Cebolinha",
      descricao: "Chicken Cebolinha + refri + batata",
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
      descricao: "Pote de maionese",
      preco: "6,00",
    },
    {
      imagem: BanconExtra,
      nome: "Bacon Extra",
      descricao: "50g de bacon crocante",
      preco: "6,00",
    },
  ],
};

export default itens;
