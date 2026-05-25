import "../styles/nosotros.css";

export default function Nosotros() {
  return (
    <>
      <section className="nosotros-hero">
        <div className="hero-content">
          <h1>Sobre Urban Homes</h1>
          <p>
            Más de 10 años transformando el mercado inmobiliario en Medellín
          </p>
        </div>
      </section>

      <section className="nosotros-section section-pad">
        <div className="container">
          <div className="nosotros-intro">
            <div className="intro-text">
              <h2>Nuestra Historia</h2>
              <p>
                Fundada en 2015, Urban Homes nace con la misión de simplificar
                el proceso de arrendamiento y compra de inmuebles en Medellín.
                Lo que comenzó como un pequeño equipo apasionado, hoy es una
                plataforma líder que ha transformado la forma en que
                propietarios e inquilinos se conectan.
              </p>
              <p>
                Creemos en la transparencia, la eficiencia y el servicio
                personalizado. Cada transacción que facilitamos es un paso más
                hacia crear comunidades más conectadas y espacios de vida de
                calidad.
              </p>
            </div>
            <div className="intro-img">
              <img src="IMG/Gestion-integral.png" alt="Nuestra Historia" />
            </div>
          </div>

          <div className="valores-grid">
            <div className="valor-card">
              <h3>Transparencia</h3>
              <p>
                Operamos con total honestidad en cada interacción. Nuestros
                clientes siempre saben en qué paso del proceso se encuentran.
              </p>
            </div>
            <div className="valor-card">
              <h3>Eficiencia</h3>
              <p>
                Optimizamos cada proceso para que tu experiencia sea rápida y
                sin complicaciones, desde el inicio hasta la finalización.
              </p>
            </div>
            <div className="valor-card">
              <h3>Excelencia</h3>
              <p>
                Nuestro equipo se dedica a ofrecer un servicio de calidad
                superior, superando expectativas en cada detalle.
              </p>
            </div>
            <div className="valor-card">
              <h3>Comunidad</h3>
              <p>
                Creemos en la importancia de construir relaciones sólidas y
                duraderas con propietarios, inquilinos y colaboradores.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="equipo-section section-pad">
        <div className="container">
          <div className="section-header centered">
            <span className="section-tag">Nuestro Equipo</span>
            <h2>Expertos Dedicados a Ti</h2>
          </div>
          <div className="equipo-grid">
            <div className="equipo-card">
              <div className="equipo-img"></div>
              <h3>Juan García</h3>
              <p>Fundador y CEO</p>
            </div>
            <div className="equipo-card">
              <div className="equipo-img"></div>
              <h3>María López</h3>
              <p>Directora Comercial</p>
            </div>
            <div className="equipo-card">
              <div className="equipo-img"></div>
              <h3>Carlos Martínez</h3>
              <p>Jefe de Operaciones</p>
            </div>
            <div className="equipo-card">
              <div className="equipo-img"></div>
              <h3>Ana Rodríguez</h3>
              <p>Especialista en Atención al Cliente</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
