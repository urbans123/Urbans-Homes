import { useState } from "react";
import "../styles/contacto.css";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Gracias por tu mensaje! Nos pondremos en contacto pronto.");
    setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
  };

  return (
    <>
      <section className="contacto-hero">
        <div className="hero-content">
          <h1>Contáctanos</h1>
          <p>
            Estamos aquí para ayudarte. Envía un mensaje y nos comunicaremos
            pronto.
          </p>
        </div>
      </section>

      <section className="contacto-section section-pad">
        <div className="container">
          <div className="contacto-grid">
            <div className="contacto-info">
              <div className="info-card">
                <h3>📍 Ubicación</h3>
                <p>Medellín, Colombia</p>
              </div>
              <div className="info-card">
                <h3>📞 Teléfono</h3>
                <p>+57 (4) 123-4567</p>
              </div>
              <div className="info-card">
                <h3>📧 Email</h3>
                <p>info@urbanhomes.co</p>
              </div>
              <div className="info-card">
                <h3>🕐 Horario</h3>
                <p>
                  Lunes - Viernes: 9:00 - 18:00
                  <br />
                  Sábado: 10:00 - 14:00
                </p>
              </div>
            </div>

            <form className="contacto-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre completo"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="asunto">Asunto</label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              <div className="form-group full">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="5"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  placeholder="Cuéntanos detalles sobre tu consulta..."
                ></textarea>
              </div>
              <button type="submit" className="btn-primary">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
