import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Cadastro from "./components/Cadastro/Cadastro";
import Pedido from "./components/Pedido/Pedido";
import Finalizar from "./components/Finalizar/FinalizarCarrinho";
import { CarrinhoProvider } from "./components/Finalizar/CarrinhoContext";
import Validar from "./components/Validar/Validar"

import keycloak from "./keycloak/keycloak.js";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";

function PrivateRoute({ children }) {
  const { keycloak } = useKeycloak();
  return keycloak?.authenticated ? children : <Navigate to="/" />;
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
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{ onLoad: "check-sso" }}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

export default App;
