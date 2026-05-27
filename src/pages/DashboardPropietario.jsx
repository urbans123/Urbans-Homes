import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import api from "../api/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

export default function DashboardPropietario() {
  const navigate = useNavigate();
  const [inmuebles, setInmuebles] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [inquilinos, setInquilinos] = useState([]);
  const [stats, setStats] = useState({
    inmuebles: 0,
    contratos: 0,
    totalIngresos: 0,
    inquilinos: 0,
  });
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const usuario =
    localStorage.getItem("uh_nombre") ||
    localStorage.getItem("uh_usuario") ||
    "Propietario";
  const rol = localStorage.getItem("uh_rol");

  useEffect(() => {
    if (rol !== "propietario") {
      alert("Acceso denegado. Solo propietarios pueden acceder a este panel.");
      navigate("/");
      return;
    }

    const cargarDatos = async () => {
      try {
        const [inm, cont, pag, inq] = await Promise.all([
          api.listar("inmuebles"),
          api.listar("contratos"),
          api.listar("pagos"),
          api.listar("inquilinos"),
        ]);

        const totalPagos = pag.reduce((acc, p) => acc + (p.valorPago || 0), 0);

        setStats({
          inmuebles: inm.length,
          contratos: cont.length,
          totalIngresos: totalPagos,
          inquilinos: inq.length,
        });
        setInmuebles(inm.slice(0, 5));
        setContratos(cont.slice(0, 5));
        setPagos(pag.slice(0, 5));
        setInquilinos(inq.slice(0, 5));

        // Gráfica de ingresos por contrato
        const ingresosPorContrato = {};
        cont.forEach((c) => {
          ingresosPorContrato[`Contrato ${c.idContratoArriendo}`] =
            c.valorCanon || 0;
        });

        // Gráfica de tipos de propiedades
        const tiposInmuebles = {};
        inm.forEach((i) => {
          tiposInmuebles[i.tipoDePropiedad] =
            (tiposInmuebles[i.tipoDePropiedad] || 0) + 1;
        });

        setChartData({
          ingresosPorContrato: {
            labels: Object.keys(ingresosPorContrato).slice(0, 5),
            datasets: [
              {
                label: "Valor Canon Mensual (COP)",
                data: Object.values(ingresosPorContrato).slice(0, 5),
                backgroundColor: "#4facfe",
                borderColor: "white",
                borderWidth: 2,
              },
            ],
          },
          tiposPropiedad: {
            labels: Object.keys(tiposInmuebles),
            datasets: [
              {
                label: "Cantidad",
                data: Object.values(tiposInmuebles),
                backgroundColor: [
                  "#4facfe",
                  "#00f2fe",
                  "#667eea",
                  "#764ba2",
                  "#f5576c",
                ],
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
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const color = "#4facfe";

  return (
    <div style={{ background: "#f5f7fa", minHeight: "100vh", padding: "2rem" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          color: "white",
          padding: "2rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          position: "relative",
          boxShadow: "0 4px 15px rgba(79,172,254,0.4)",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            position: "absolute",
            top: "2rem",
            right: "2rem",
            background: "#c0392b",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "0.6rem 1.2rem",
            cursor: "pointer",
          }}
        >
          Cerrar Sesión
        </button>
        <h1 style={{ margin: "0 0 0.5rem 0", fontSize: "2rem" }}>
          🏡 Dashboard Propietario
        </h1>
        <p style={{ color: "rgba(255,255,255,0.8)", margin: 0 }}>
          Tu centro de control de propiedades
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(255,255,255,0.1)",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "1rem",
          }}
        >
          <div>
            <strong>Usuario:</strong> {usuario} | <strong>Rol:</strong>{" "}
            Propietario
          </div>
          <small>{fecha}</small>
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", color }}>
          Cargando datos del backend...
        </p>
      ) : (
        <>
          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            {[
              { label: "Propiedades en Portafolio", valor: stats.inmuebles },
              { label: "Contratos Activos", valor: stats.contratos },
              {
                label: "Total Ingresos",
                valor: `$${stats.totalIngresos.toLocaleString("es-CO")}`,
              },
              { label: "Inquilinos Activos", valor: stats.inquilinos },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "white",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  borderLeft: `4px solid ${color}`,
                }}
              >
                <h3
                  style={{
                    margin: "0 0 1rem 0",
                    color: "#333",
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {s.label}
                </h3>
                <div
                  style={{
                    fontSize:
                      s.label === "Total Ingresos" ? "1.6rem" : "2.5rem",
                    fontWeight: "bold",
                    color,
                  }}
                >
                  {s.valor}
                </div>
              </div>
            ))}
          </div>

          {/* Gráficas */}
          {chartData && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <h3 style={{ marginTop: 0 }}>💰 Ingresos por Contrato</h3>
                <Bar
                  data={chartData.ingresosPorContrato}
                  options={{ responsive: true, maintainAspectRatio: true }}
                />
              </div>
              <div
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <h3 style={{ marginTop: 0 }}>🏠 Distribución de Propiedades</h3>
                <Pie
                  data={chartData.tiposPropiedad}
                  options={{ responsive: true, maintainAspectRatio: true }}
                />
              </div>
            </div>
          )}

          {/* Tablas */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {/* Mis Inmuebles */}
            <div
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  borderBottom: `2px solid ${color}`,
                  paddingBottom: "1rem",
                }}
              >
                🏠 Mis Inmuebles
              </h2>
              {inmuebles.length > 0 ? (
                inmuebles.map((i) => (
                  <div
                    key={i.idInmueble}
                    style={{
                      padding: "0.8rem 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div style={{ fontWeight: "bold", color: "#333" }}>
                      {i.tipoDePropiedad}
                    </div>
                    <small style={{ color: "#666" }}>{i.direccion}</small>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "#999",
                        marginTop: "0.3rem",
                      }}
                    >
                      {i.nroHabitacion} hab. • {i.nroBanios} baños • {i.areaM2}{" "}
                      m²
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#999" }}>Sin inmuebles registrados</p>
              )}
            </div>

            {/* Contratos */}
            <div
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  borderBottom: `2px solid ${color}`,
                  paddingBottom: "1rem",
                }}
              >
                📋 Contratos
              </h2>
              {contratos.length > 0 ? (
                contratos.map((c) => (
                  <div
                    key={c.idContratoArriendo}
                    style={{
                      padding: "0.8rem 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "bold",
                      }}
                    >
                      <span>Contrato #{c.idContratoArriendo}</span>
                      <strong style={{ color }}>
                        ${c.valorCanon?.toLocaleString("es-CO")}/mes
                      </strong>
                    </div>
                    <small style={{ color: "#666" }}>
                      📅 {c.fechaInicio} → {c.fechaFin}
                    </small>
                  </div>
                ))
              ) : (
                <p style={{ color: "#999" }}>Sin contratos registrados</p>
              )}
            </div>

            {/* Pagos recibidos */}
            <div
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  borderBottom: `2px solid ${color}`,
                  paddingBottom: "1rem",
                }}
              >
                💰 Pagos Recibidos
              </h2>
              {pagos.length > 0 ? (
                pagos.map((p) => (
                  <div
                    key={p.idPagoArriendo}
                    style={{
                      padding: "0.8rem 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "bold",
                      }}
                    >
                      <span>{p.mesArriendo}</span>
                      <strong style={{ color }}>
                        ${p.valorPago?.toLocaleString("es-CO")}
                      </strong>
                    </div>
                    <small style={{ color: "#666" }}>
                      📅 Fecha: {p.fechaPago}
                    </small>
                  </div>
                ))
              ) : (
                <p style={{ color: "#999" }}>Sin pagos registrados</p>
              )}
            </div>

            {/* Inquilinos */}
            <div
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  borderBottom: `2px solid ${color}`,
                  paddingBottom: "1rem",
                }}
              >
                👥 Inquilinos
              </h2>
              {inquilinos.length > 0 ? (
                inquilinos.map((i) => (
                  <div
                    key={i.idInquilinos}
                    style={{
                      padding: "0.8rem 0",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div style={{ fontWeight: "bold", color: "#333" }}>
                      {i.nombreComple}
                    </div>
                    <small style={{ color: "#666" }}>{i.correo}</small>
                    {i.nrotel && (
                      <div style={{ fontSize: "0.8rem", color: "#999" }}>
                        📞 {i.nrotel}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p style={{ color: "#999" }}>Sin inquilinos registrados</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
