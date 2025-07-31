import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Cadastro from "./components/Cadastro/Cadastro";
import Pedido from "./components/Pedido/Pedido";
import Finalizar from "./components/Finalizar/FinalizarCarrinho";
import { CarrinhoProvider } from "./components/Finalizar/CarrinhoContext";
import Validar from "./components/Validar/Validar";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <CarrinhoProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/pedidos"
          element={
            <PrivateRoute>
              <Pedido />
            </PrivateRoute>
          }
        />
        <Route
          path="/finalizarCompra"
          element={
            <PrivateRoute>
              <Finalizar />
            </PrivateRoute>
          }
        />
        <Route path="/validar" element={<Validar />} />
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
