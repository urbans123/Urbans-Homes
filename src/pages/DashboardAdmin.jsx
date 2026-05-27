import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import api from "../api/api";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    inmuebles: 0,
    propietarios: 0,
    inquilinos: 0,
    contratos: 0,
  });
  const [inmuebles, setInmuebles] = useState([]);
  const [propietarios, setPropietarios] = useState([]);
  const [inquilinos, setInquilinos] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const usuario = localStorage.getItem("uh_nombre") || localStorage.getItem("uh_usuario") || "Admin";
  const rol = localStorage.getItem("uh_rol");

  useEffect(() => {
    if (rol !== "admin") {
      alert("Acceso denegado. Solo administradores pueden acceder.");
      navigate("/");
      return;
    }

    const cargarDatos = async () => {
      try {
        const [inm, prop, inq, cont] = await Promise.all([
          api.listar("inmuebles"),
          api.listar("propietarios"),
          api.listar("inquilinos"),
          api.listar("contratos"),
        ]);
        
        setStats({
          inmuebles: inm.length,
          propietarios: prop.length,
          inquilinos: inq.length,
          contratos: cont.length,
        });
        
        setInmuebles(inm.slice(0, 5));
        setPropietarios(prop.slice(0, 5));
        setInquilinos(inq.slice(0, 5));
        setContratos(cont.slice(0, 5));

        // Gráfica de tipos de propiedades
        const tiposInmuebles = {};
        inm.forEach((i) => {
          tiposInmuebles[i.tipoDePropiedad] = (tiposInmuebles[i.tipoDePropiedad] || 0) + 1;
        });

        setChartData({
          tiposPropiedad: {
            labels: Object.keys(tiposInmuebles),
            datasets: [
              {
                label: "Tipos de Propiedades",
                data: Object.values(tiposInmuebles),
                backgroundColor: ["#667eea", "#764ba2", "#f093fb", "#4facfe", "#00f2fe"],
                borderColor: "white",
                borderWidth: 2,
              },
            ],
          },
          estadoContratos: {
            labels: ["Activos", "Completados"],
            datasets: [
              {
                data: [cont.length, Math.floor(cont.length * 0.3)],
                backgroundColor: ["#4CAF50", "#FFC107"],
                borderColor: "white",
                borderWidth: 2,
              },
            ],
          },
        });
      } catch (err) {
        console.error("Error cargando datos:", err);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [rol, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("uh_usuario");
    localStorage.removeItem("uh_rol");
    localStorage.removeItem("uh_nombre");
    localStorage.removeItem("uh_carrito");
    navigate("/login");
  };

  const fecha = new Date().toLocaleDateString("es-ES", {
    weekday: "long", year: "numeric", month: "long",
    day: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div style={{ background: "#f5f7fa", minHeight: "100vh", padding: "2rem" }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white", padding: "2rem", borderRadius: "10px",
        marginBottom: "2rem", position: "relative",
        boxShadow: "0 4px 15px rgba(102,126,234,0.4)"
      }}>
        <button onClick={handleLogout} style={{
          position: "absolute", top: "2rem", right: "2rem",
          background: "#e74c3c", color: "white", border: "none",
          borderRadius: "5px", padding: "0.6rem 1.2rem", cursor: "pointer"
        }}>Cerrar Sesión</button>
        <h1 style={{ margin: "0 0 0.5rem 0", fontSize: "2rem" }}>📊 Dashboard Administrador</h1>
        <p style={{ color: "rgba(255,255,255,0.8)", margin: 0 }}>Panel de control del sistema</p>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "rgba(255,255,255,0.1)", padding: "1rem",
          borderRadius: "8px", marginTop: "1rem"
        }}>
          <div><strong>Usuario:</strong> {usuario} | <strong>Rol:</strong> Administrador</div>
          <small>{fecha}</small>
        </div>
      </div>

      {/* Stats */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#667eea" }}>Cargando datos del backend...</p>
      ) : (
        <>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem", marginBottom: "2rem"
          }}>
            {[
              { label: "Total Inmuebles", valor: stats.inmuebles },
              { label: "Propietarios", valor: stats.propietarios },
              { label: "Inquilinos Activos", valor: stats.inquilinos },
              { label: "Contratos Activos", valor: stats.contratos },
            ].map((s) => (
              <div key={s.label} style={{
                background: "white", padding: "1.5rem", borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderLeft: "4px solid #667eea"
              }}>
                <h3 style={{ margin: "0 0 1rem 0", color: "#333", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</h3>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#667eea" }}>{s.valor}</div>
              </div>
            ))}
          </div>

          {/* Gráficas */}
          {chartData && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
              <div style={{ background: "white", padding: "2rem", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <h3 style={{ marginTop: 0 }}>📊 Distribución de Tipos de Propiedades</h3>
                <Pie data={chartData.tiposPropiedad} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>
              <div style={{ background: "white", padding: "2rem", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                <h3 style={{ marginTop: 0 }}>📈 Estado de Contratos</h3>
                <Pie data={chartData.estadoContratos} options={{ responsive: true, maintainAspectRatio: true }} />
              </div>
            </div>
          )}

          {/* Tablas */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>

            {/* Inmuebles */}
            <div style={{ background: "white", padding: "2rem", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              <h2 style={{ marginTop: 0, borderBottom: "2px solid #667eea", paddingBottom: "1rem" }}>🏠 Últimos Inmuebles</h2>
              {inmuebles.length > 0 ? inmuebles.map((i) => (
                <div key={i.idInmueble} style={{ padding: "0.8rem 0", borderBottom: "1px solid #eee" }}>
                  <div style={{ fontWeight: "bold", color: "#333" }}>{i.tipoDePropiedad}</div>
                  <small style={{ color: "#666" }}>{i.direccion}</small>
                  <div style={{ fontSize: "0.8rem", color: "#999", marginTop: "0.3rem" }}>
                    {i.nroHabitacion} hab. • {i.nroBanios} baños • {i.areaM2} m²
                  </div>
                </div>
              )) : <p style={{ color: "#999" }}>Sin inmuebles registrados</p>}
            </div>

            {/* Propietarios */}
            <div style={{ background: "white", padding: "2rem", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              <h2 style={{ marginTop: 0, borderBottom: "2px solid #667eea", paddingBottom: "1rem" }}>👤 Propietarios</h2>
              {propietarios.length > 0 ? propietarios.map((p) => (
                <div key={p.idPropietarios} style={{ padding: "0.8rem 0", borderBottom: "1px solid #eee" }}>
                  <div style={{ fontWeight: "bold", color: "#333" }}>{p.nombreComp}</div>
                  <small style={{ color: "#666" }}>{p.correo}</small>
                  {p.notel && <div style={{ fontSize: "0.8rem", color: "#999" }}>📞 {p.notel}</div>}
                </div>
              )) : <p style={{ color: "#999" }}>Sin propietarios registrados</p>}
            </div>

            {/* Inquilinos */}
            <div style={{ background: "white", padding: "2rem", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              <h2 style={{ marginTop: 0, borderBottom: "2px solid #667eea", paddingBottom: "1rem" }}>🧑‍🤝‍🧑 Inquilinos</h2>
              {inquilinos.length > 0 ? inquilinos.map((i) => (
                <div key={i.idInquilinos} style={{ padding: "0.8rem 0", borderBottom: "1px solid #eee" }}>
                  <div style={{ fontWeight: "bold", color: "#333" }}>{i.nombreComple}</div>
                  <small style={{ color: "#666" }}>{i.correo}</small>
                  {i.nrotel && <div style={{ fontSize: "0.8rem", color: "#999" }}>📞 {i.nrotel}</div>}
                </div>
              )) : <p style={{ color: "#999" }}>Sin inquilinos registrados</p>}
            </div>

            {/* Últimos Contratos */}
            <div style={{ background: "white", padding: "2rem", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              <h2 style={{ marginTop: 0, borderBottom: "2px solid #667eea", paddingBottom: "1rem" }}>📋 Últimos Contratos</h2>
              {contratos.length > 0 ? contratos.map((c) => (
                <div key={c.idContratoArriendo} style={{ padding: "0.8rem 0", borderBottom: "1px solid #eee" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: "bold" }}>Contrato #{c.idContratoArriendo}</span>
                    <strong style={{ color: "#667eea" }}>${c.valorCanon?.toLocaleString("es-CO")}</strong>
                  </div>
                  <small style={{ color: "#666" }}>
                    {c.fechaInicio} → {c.fechaFin}
                  </small>
                </div>
              )) : <p style={{ color: "#999" }}>Sin contratos registrados</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
