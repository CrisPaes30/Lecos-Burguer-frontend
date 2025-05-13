// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Cadastro from './components/Cadastro/Cadastro';
import Pedido from './components/Pedido/Pedido';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path='/pedidos' element={<Pedido/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
