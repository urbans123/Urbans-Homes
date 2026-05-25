import "../styles/propiedades.css";

export default function PropiedadCard({ propiedad, onAction }) {
  return (
    <article className="prop-card" data-tipo={propiedad.tipo}>
      <div className="prop-img">
        <img src={propiedad.img} alt={propiedad.titulo} loading="lazy" />
        <span className="prop-badge">{propiedad.badge}</span>
      </div>
      <div className="prop-body">
        <h3>{propiedad.titulo}</h3>
        <p className="prop-location">📍 {propiedad.ubicacion}</p>
        <div className="prop-specs">
          <span>🛏 {propiedad.habitaciones} hab.</span>
          <span>🚿 {propiedad.banos} baños</span>
          <span>📐 {propiedad.area}</span>
        </div>
        <div className="prop-footer">
          <div className="prop-price">
            {propiedad.precio}
            <small>{propiedad.periodo}</small>
          </div>
          <button className="prop-btn" onClick={() => onAction(propiedad)}>
            {propiedad.tipo === "arriendo" ? "Reservar" : "Consultar"}
          </button>
        </div>
      </div>
    </article>
  );
}
