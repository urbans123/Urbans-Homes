import { Link } from "react-router-dom";
import "../styles/carrito.css";

export default function Carrito() {
  return (
    <>
      <section className="carrito-hero">
        <div className="hero-content">
          <h1>Mis Reservas</h1>
          <p>Gestiona tus reservas de propiedades</p>
        </div>
      </section>

      <section className="carrito-section section-pad">
        <div className="container">
          <div className="carrito-empty">
            <h2>No tienes reservas aún</h2>
            <p>
              Explora nuestras propiedades disponibles y realiza tus primeras
              reservas.
            </p>
            <Link to="/propiedades" className="btn-primary">
              Ver Propiedades
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
