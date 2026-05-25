import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-icon">⬡</span>
          <span className="brand-name">Urban Homes</span>
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">
            Inicio
          </Link>
          <Link to="/propiedades" className="nav-link">
            Propiedades
          </Link>
          <Link to="/nosotros" className="nav-link">
            Nosotros
          </Link>
          <Link to="/contacto" className="nav-link">
            Contacto
          </Link>
        </nav>
        <div className="nav-actions">
          <Link to="/login" className="btn-outline">
            Ingresar
          </Link>
          <Link to="/propiedades" className="btn-primary">
            Ver Inmuebles
          </Link>
        </div>
        <button
          className="hamburger"
          onClick={toggleMobileMenu}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/">Inicio</Link>
          <Link to="/propiedades">Propiedades</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/login">Ingresar</Link>
        </div>
      )}
    </header>
  );
}
