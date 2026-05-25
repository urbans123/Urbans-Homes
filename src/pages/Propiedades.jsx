import { useState } from "react";
import PropiedadCard from "../components/PropiedadCard";
import "../styles/propiedades.css";

const allPropiedades = [
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
  {
    id: 4,
    titulo: "Penthouse Ciudad del Río",
    ubicacion: "Ciudad del Río, Medellín",
    tipo: "venta",
    precio: "$950.000.000",
    periodo: "",
    habitaciones: 4,
    banos: 3,
    area: "210 m²",
    img: "IMG/Inmueble caro 3.PNG",
    badge: "Premium",
  },
  {
    id: 5,
    titulo: "Apartamento Sabaneta",
    ubicacion: "Sabaneta, Antioquia",
    tipo: "arriendo",
    precio: "$1.600.000",
    periodo: "/mes",
    habitaciones: 2,
    banos: 1,
    area: "65 m²",
    img: "IMG/Inmueble barato 3.PNG",
    badge: "Arriendo",
  },
  {
    id: 6,
    titulo: "Casa Bello",
    ubicacion: "Bello, Antioquia",
    tipo: "venta",
    precio: "$220.000.000",
    periodo: "",
    habitaciones: 3,
    banos: 2,
    area: "110 m²",
    img: "IMG/Inmueble barato.jpg",
    badge: "Venta",
  },
];

export default function Propiedades() {
  const [filtro, setFiltro] = useState("todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPropiedad, setSelectedPropiedad] = useState(null);
  const [reservas, setReservas] = useState([]);

  const propiedadesFiltered =
    filtro === "todos"
      ? allPropiedades
      : allPropiedades.filter((p) => p.tipo === filtro);

  const handlePropiedadAction = (propiedad) => {
    setSelectedPropiedad(propiedad);
    setModalOpen(true);
  };

  const handleConfirmReserva = () => {
    if (selectedPropiedad) {
      setReservas([...reservas, selectedPropiedad]);
      setModalOpen(false);
      alert("¡Reserva confirmada!");
    }
  };

  return (
    <>
      <section className="propiedades-hero">
        <div className="hero-content">
          <h1>Todas Nuestras Propiedades</h1>
          <p>
            Explora la selección completa de inmuebles disponibles para
            arrendamiento y venta
          </p>
        </div>
      </section>

      <section className="propiedades-section section-pad">
        <div className="container">
          <div className="filtros">
            <button
              className={`filtro-btn ${filtro === "todos" ? "active" : ""}`}
              onClick={() => setFiltro("todos")}
            >
              Todos
            </button>
            <button
              className={`filtro-btn ${filtro === "arriendo" ? "active" : ""}`}
              onClick={() => setFiltro("arriendo")}
            >
              Arriendo
            </button>
            <button
              className={`filtro-btn ${filtro === "venta" ? "active" : ""}`}
              onClick={() => setFiltro("venta")}
            >
              Venta
            </button>
          </div>

          <div className="prop-grid">
            {propiedadesFiltered.map((prop) => (
              <PropiedadCard
                key={prop.id}
                propiedad={prop}
                onAction={handlePropiedadAction}
              />
            ))}
          </div>
        </div>
      </section>

      {/* */}
      {modalOpen && selectedPropiedad && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Reservar propiedad</h3>
            <p className="modal-sub">{selectedPropiedad.titulo}</p>
            <div className="form-group">
              <label htmlFor="modalTelefono">Tu número de contacto</label>
              <input
                type="tel"
                id="modalTelefono"
                placeholder="Ej: 3001234567"
              />
            </div>
            <div className="modal-actions">
              <button className="modal-btn-send" onClick={handleConfirmReserva}>
                Confirmar reserva
              </button>
              <button
                className="modal-btn-close"
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
