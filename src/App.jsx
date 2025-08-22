import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./components/Login/Login";
import Cadastro from "./components/Cadastro/Cadastro";
import Pedido from "./components/Pedido/Pedido";
import Finalizar from "./components/Finalizar/FinalizarCarrinho";
import { CarrinhoProvider } from "./components/Finalizar/CarrinhoContext";
import Validar from "./components/Validar/Validar";

function PrivateRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("access_token");
  return token
    ? children
    : <Navigate to="/login" replace state={{ from: location }} />;
}

// (opcional) evitar ir para /login se já estiver logado
function PublicOnly({ children }) {
  const token = localStorage.getItem("access_token");
  return token ? <Navigate to="/pedidos" replace /> : children;
}

function AppRoutes() {
  return (
    <CarrinhoProvider>
      <Routes>
        <Route path="/login" element={<PublicOnly><Login /></PublicOnly>} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/pedidos" element={<PrivateRoute><Pedido /></PrivateRoute>} />
        <Route path="/finalizarCompra" element={<PrivateRoute><Finalizar /></PrivateRoute>} />
        <Route path="/validar" element={<Validar />} />
        <Route path="*" element={<Navigate to="/pedidos" replace />} />
      </Routes>
    </CarrinhoProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
