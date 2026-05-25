import { useState, useEffect } from "react";
import "../styles/hero.css";

const slides = [
  {
    id: 1,
    bg: "url(IMG/Slide-1.png)",
    tag: "Gestión eficiente",
    title: "Control total de\ntus arriendos y pagos",
    description:
      "Centraliza tus operaciones. Visión clara de propiedades, contratos y flujos financieros en un solo lugar.",
    cta: "Explorar Propiedades",
    to: "/propiedades",
  },
  {
    id: 2,
    bg: "url(IMG/Slide-2.png)",
    tag: "Medellín · El Poblado",
    title: "Inmuebles modernos\npara cada estilo",
    description:
      "Explora una amplia selección de apartamentos y casas, opciones para cada presupuesto y forma de vida.",
    cta: "Ver Disponibles",
    to: "/propiedades",
  },
  {
    id: 3,
    bg: "url(IMG/Slide-3.png)",
    tag: "Propietarios & Inquilinos",
    title: "Conexión directa,\nsin complicaciones",
    description:
      "Gestiona solicitudes y coordina mantenimientos de forma rápida. Comunicación fluida, resultados claros.",
    cta: "Contáctanos",
    to: "/contacto",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="hero">
      <div className="hero-slides">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ "--bg": slide.bg }}
          >
            <div className="hero-content">
              <span className="hero-tag">{slide.tag}</span>
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <a href={slide.to} className="btn-hero">
                {slide.cta}
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="hero-controls">
        <button className="hero-btn" onClick={prevSlide} aria-label="Anterior">
          &#8592;
        </button>
        <div className="hero-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              data-index={index}
            ></button>
          ))}
        </div>
        <button className="hero-btn" onClick={nextSlide} aria-label="Siguiente">
          &#8594;
        </button>
      </div>
    </section>
  );
}
