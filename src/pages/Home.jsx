import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import StatsBanner from "../components/StatsBanner";
import PropiedadCard from "../components/PropiedadCard";
import "../styles/home.css";

const propiedades = [
  {
    id: 1,
    titulo: "Apartamento El Poblado",
    ubicacion: "El Poblado, Medellín",
    tipo: "arriendo",
    precio: "$2.800.000",
    periodo: "/mes",
    habitaciones: 2,
    banos: 2,
    area: "85 m²",
    img: "IMG/Inmueble caro 1.PNG",
    badge: "Arriendo",
  },
  {
    id: 2,
    titulo: "Casa Laureles",
    ubicacion: "Laureles, Medellín",
    tipo: "venta",
    precio: "$480.000.000",
    periodo: "",
    habitaciones: 3,
    banos: 2,
    area: "140 m²",
    img: "IMG/Inmueble caro 2.PNG",
    badge: "Venta",
  },
  {
    id: 3,
    titulo: "Estudio Envigado",
    ubicacion: "Envigado, Antioquia",
    tipo: "arriendo",
    precio: "$1.200.000",
    periodo: "/mes",
    habitaciones: 1,
    banos: 1,
    area: "42 m²",
    img: "IMG/Inmueble barato 2.PNG",
    badge: "Económico",
  },
];

export default function Home() {
  const handlePropiedadAction = (propiedad) => {};

  return (
    <>
      <HeroSlider />
      <StatsBanner />

      {/* */}
      <section className="porque section-pad">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Nuestra diferencia</span>
            <h2>¿Por Qué Elegir Urban Homes?</h2>
          </div>
          <div className="porque-grid">
            <div className="porque-card">
              <div className="porque-img">
                <img src="IMG/Confianza.png" alt="Confianza" />
              </div>
              <div className="porque-text">
                <span className="porque-num">01</span>
                <h3>Confianza</h3>
                <p>
                  Más de 10 años facilitando relaciones justas y seguras entre
                  propietarios e inquilinos. Una década de transacciones
                  transparentes.
                </p>
              </div>
            </div>
            <div className="porque-card reverse">
              <div className="porque-img">
                <img src="IMG/Gestion-integral.png" alt="Gestión Integral" />
              </div>
              <div className="porque-text">
                <span className="porque-num">02</span>
                <h3>Gestión Integral</h3>
                <p>
                  Nos encargamos del proceso completo de arriendo. Desde la
                  promoción hasta la administración diaria, cubrimos cada paso.
                </p>
              </div>
            </div>
            <div className="porque-card">
              <div className="porque-img">
                <img src="IMG/Soprte.png" alt="Soporte" />
              </div>
              <div className="porque-text">
                <span className="porque-num">03</span>
                <h3>Soporte Personalizado</h3>
                <p>
                  Atención rápida y efectiva ante cualquier duda o
                  inconveniente. Nuestro equipo brinda respuestas claras y
                  soluciones precisas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* */}
      <section className="servicios section-pad">
        <div className="container">
          <div className="section-header centered">
            <span className="section-tag">Lo que ofrecemos</span>
            <h2>Nuestros Servicios</h2>
            <p className="section-desc">
              Todo lo que necesitas para administrar, arrendar o comprar una
              propiedad en un solo lugar.
            </p>
          </div>
          <div className="servicios-grid">
            <div className="servicio-card">
              <div className="servicio-icon">📄</div>
              <img src="IMG/Contratos.png" alt="Contratos" />
              <h3>Contratos</h3>
              <p>
                Formalización clara y segura de arrendamientos con respaldo
                legal garantizado.
              </p>
            </div>
            <div className="servicio-card featured">
              <div className="servicio-icon">💳</div>
              <img src="IMG/Pagos.png" alt="Pagos" />
              <h3>Pagos</h3>
              <p>
                Registro automático y seguimiento en línea de todos tus pagos en
                tiempo real.
              </p>
            </div>
            <div className="servicio-card">
              <div className="servicio-icon">🏠</div>
              <img src="IMG/Tipos.png" alt="Tipos de Propiedad" />
              <h3>Tipos de Propiedad</h3>
              <p>
                Administración especializada para cada tipo de inmueble según
                tus necesidades.
              </p>
            </div>
          </div>
          <div className="servicios-cta">
            <Link to="/propiedades" className="btn-primary">
              Ver todas las propiedades
            </Link>
          </div>
        </div>
      </section>

      {/* */}
      <section className="destacadas section-pad">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Lo mejor disponible</span>
            <h2>Propiedades Destacadas</h2>
          </div>
          <div className="prop-grid">
            {propiedades.map((prop) => (
              <PropiedadCard
                key={prop.id}
                propiedad={prop}
                onAction={handlePropiedadAction}
              />
            ))}
          </div>
          <div className="destacadas-cta">
            <Link to="/propiedades" className="btn-outline-dark">
              Ver todas las propiedades →
            </Link>
          </div>
        </div>
      </section>

      {/* */}
      <section className="testimonios section-pad">
        <div className="container">
          <div className="section-header centered">
            <span className="section-tag">Lo que dicen</span>
            <h2>Nuestros Clientes</h2>
          </div>
          <div className="testimonios-grid">
            <div className="testimonio-card">
              <p>
                "Urban Homes me ayudó a encontrar el apartamento perfecto en El
                Poblado. El proceso fue rápido y transparente."
              </p>
              <div className="testimonio-autor">
                <span className="avatar">CM</span>
                <div>
                  <strong>Carlos Mendoza</strong>
                  <small>Inquilino, Medellín</small>
                </div>
              </div>
            </div>
            <div className="testimonio-card featured">
              <p>
                "Como propietario, confío totalmente en Urban Homes para
                administrar mis inmuebles. El soporte es excepcional."
              </p>
              <div className="testimonio-autor">
                <span className="avatar">LR</span>
                <div>
                  <strong>Lucía Restrepo</strong>
                  <small>Propietaria, 3 inmuebles</small>
                </div>
              </div>
            </div>
            <div className="testimonio-card">
              <p>
                "La plataforma es intuitiva y el equipo siempre está disponible.
                Encontré mi hogar ideal en menos de una semana."
              </p>
              <div className="testimonio-autor">
                <span className="avatar">JH</span>
                <div>
                  <strong>Jorge Hernández</strong>
                  <small>Inquilino, Laureles</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* */}
      <section className="cta-final">
        <div className="cta-inner">
          <h2>
            ¿Listo para encontrar
            <br />
            tu próximo hogar?
          </h2>
          <p>Explora cientos de propiedades en Medellín con Urban Homes.</p>
          <div className="cta-btns">
            <Link to="/propiedades" className="btn-primary-lg">
              Ver Propiedades
            </Link>
            <Link to="/contacto" className="btn-ghost-lg">
              Hablar con un asesor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
