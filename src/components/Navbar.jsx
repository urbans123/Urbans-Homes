import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [rol, setRol] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detectar si hay usuario logueado
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("uh_usuario");
    const rolGuardado = localStorage.getItem("uh_rol");
    const nombreGuardado = localStorage.getItem("uh_nombre");

    if (usuarioGuardado && rolGuardado) {
      setUsuario(nombreGuardado || usuarioGuardado);
      setRol(rolGuardado);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("uh_usuario");
    localStorage.removeItem("uh_rol");
    localStorage.removeItem("uh_nombre");
    localStorage.removeItem("uh_carrito");
    setUsuario(null);
    setRol(null);
    navigate("/");
  };

  const getDashboardRoute = () => {
    const routes = {
      admin: "/dashboard-admin",
      empleado: "/dashboard-empleado",
      propietario: "/dashboard-propietario",
    };
    return routes[rol] || "/";
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
          {usuario ? (
            <>
              <Link
                to={getDashboardRoute()}
                className="btn-primary"
                style={{ textDecoration: "none" }}
              >
                📊 {usuario} ({rol})
              </Link>
              <button
                onClick={handleLogout}
                className="btn-outline"
                style={{
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline">
                Ingresar
              </Link>
              <Link to="/propiedades" className="btn-primary">
                Ver Inmuebles
              </Link>
            </>
          )}
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
          {usuario ? (
            <>
              <Link to={getDashboardRoute()}>Mi Dashboard</Link>
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "1rem",
                }}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/login">Ingresar</Link>
          )}
        </div>
      )}
    </header>
  );
}
