import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-icon">⬡</span>
          <span className="brand-name">Urban Homes</span>
          <p>
            Tu aliado en arrendamientos inmobiliarios en Medellín, Colombia.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Instagram">
              <img src="IMG/insta.PNG" alt="Instagram" />
            </a>
            <a href="#" aria-label="Facebook">
              <img src="IMG/facebook.PNG" alt="Facebook" />
            </a>
            <a href="#" aria-label="Twitter">
              <img src="IMG/twiter.PNG" alt="Twitter" />
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Empresa</h4>
          <ul>
            <li>
              <a href="#">Nuestra Compañía</a>
            </li>
            <li>
              <a href="#">Sala de Prensa</a>
            </li>
            <li>
              <a href="#">Nuestra Historia</a>
            </li>
            <li>
              <a href="#">Trabaja con Nosotros</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Ayuda</h4>
          <ul>
            <li>
              <a href="#">Mapa del sitio</a>
            </li>
            <li>
              <Link to="/contacto">Contáctanos</Link>
            </li>
            <li>
              <a href="#">Preguntas frecuentes</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="#">Términos de uso</a>
            </li>
            <li>
              <a href="#">Política de privacidad</a>
            </li>
            <li>
              <a href="#">Cookies</a>
            </li>
            <li>
              <a href="#">Términos y condiciones</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Urban Homes. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
