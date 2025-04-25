import "./App.css";
import FormLogin from "./components/FormLogin";

function App() {
  return (
    <div className="page-container">
      <div className="app-container">
        {/* Logo e nome da marca fora da right-side */}
        <div className="brand">
          <img src="./logo.png" alt="Logo" className="logo-icon" />
          <div className="brand-text">
            <span className="brand-title">LECO´S</span>
            <span className="brand-subtitle">BURGUER</span>
          </div>
        </div>

        <div className="left-side">
          <img
            src="./hamburguerLeco.png"
            alt="Hambúrguer"
            className="burger-img"
          />
        </div>

        <div className="right-side">
          <FormLogin />
        </div>
      </div>

      <footer className="footer">
        <p className="footer-text">Fique por dentro das novidades!</p>
        <div className="footer-icons">
          <a href="#">
            <img src="./whats2.png" alt="WhatsApp" className="footer-icon" />
          </a>
          <a href="#">
            <img src="./insta.png" alt="Instagram" className="footer-icon" />
          </a>
        </div>
      </footer>

      <footer className="footer-hora">
        <div className="marquee">
          <p className="footer-text-horario">
            Nosso horário e dias atendimentos — De quinta a Domingo das 19h00 às 00h00
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
