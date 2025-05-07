// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Pedido from './components/Pedido';

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
