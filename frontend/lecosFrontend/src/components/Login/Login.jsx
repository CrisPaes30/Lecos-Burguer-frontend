import "./Login.css";
import { useRef, useEffect } from "react";
import FormLogin from "../FormLogin/FormLogin";
import Lottie from "lottie-react";
import animacao from "../../assets/Anim_burguer_v2.json";

function Login() {
  const lottieRef = useRef();

  useEffect(() => {
    if (lottieRef.current) {
      // Diminui a velocidade da animação
      lottieRef.current.setSpeed(0.5);
    }
  }, []);

  return (
    <div className="page-container">
      <div className="app-container">
        {/* Logo e nome da marca fora da right-side */}
        <div className="brand">
          <img src="./LogoNovo4.png" alt="Logo" className="logo-icon" />
          <div className="brand-text">
            <span className="brand-title">LECO´S</span>
            <span className="brand-subtitle">BURGUER</span>
          </div>
        </div>

        <div className="left-side">
          <Lottie
            lottieRef={lottieRef}
            animationData={animacao}
            loop={true}
            style={{ width: 450, height: 450 }}
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
            Nosso horário e dias atendimentos — De quinta a Domingo das 19h00 às
            00h00
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Login;
