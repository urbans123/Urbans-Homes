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
} from "chart.js";
import { Bar } from "react-chartjs-2";
import api from "../api/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function DashboardEmpleado() {
  const navigate = useNavigate();
  const [contratos, setContratos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [stats, setStats] = useState({
    contratos: 0,
    pagos: 0,
    totalRecaudado: 0,
  });
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  const usuario =
    localStorage.getItem("uh_nombre") ||
    localStorage.getItem("uh_usuario") ||
    "Empleado";
  const rol = localStorage.getItem("uh_rol");

  useEffect(() => {
    if (rol !== "empleado") {
      alert("Acceso denegado. Solo empleados pueden acceder a este panel.");
      navigate("/");
      return;
    }

    const cargarDatos = async () => {
      try {
        const [cont, pag] = await Promise.all([
          api.listar("contratos"),
          api.listar("pagos"),
        ]);

        const totalRecaudado = pag.reduce(
          (acc, p) => acc + (p.valorPago || 0),
          0,
        );

        setStats({
          contratos: cont.length,
          pagos: pag.length,
          totalRecaudado,
        });
        setContratos(cont.slice(0, 6));
        setPagos(pag.slice(0, 6));

        // Agrupar pagos por mes
        const pagosPorMes = {};
        pag.forEach((p) => {
          const mes = p.mesArriendo || "N/A";
          pagosPorMes[mes] = (pagosPorMes[mes] || 0) + (p.valorPago || 0);
        });

        setChartData({
          pagosPorMes: {
            labels: Object.keys(pagosPorMes).slice(0, 10),
            datasets: [
              {
                label: "Valor Pagado (COP)",
                data: Object.values(pagosPorMes).slice(0, 10),
                backgroundColor: "#f5576c",
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

  const color = "#f5576c";

  return (
    <div style={{ background: "#f5f7fa", minHeight: "100vh", padding: "2rem" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          color: "white",
          padding: "2rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          position: "relative",
          boxShadow: "0 4px 15px rgba(245,87,108,0.4)",
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
          📊 Dashboard Empleado
        </h1>
        <p style={{ color: "rgba(255,255,255,0.8)", margin: 0 }}>
          Panel de seguimiento de contratos y pagos
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
            <strong>Usuario:</strong> {usuario} | <strong>Rol:</strong> Empleado
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
              { label: "Contratos Activos", valor: stats.contratos },
              { label: "Pagos Registrados", valor: stats.pagos },
              {
                label: "Total Recaudado",
                valor: `$${stats.totalRecaudado.toLocaleString("es-CO")}`,
              },
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
                      s.label === "Total Recaudado" ? "1.8rem" : "2.5rem",
                    fontWeight: "bold",
                    color,
                  }}
                >
                  {s.valor}
                </div>
              </div>
            ))}
          </div>

          {/* Gráfica */}
          {chartData && (
            <div
              style={{
                background: "white",
                padding: "2rem",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                marginBottom: "2rem",
              }}
            >
              <h3 style={{ marginTop: 0 }}>💰 Recaudación por Mes</h3>
              <Bar
                data={chartData.pagosPorMes}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  indexAxis: "x",
                }}
              />
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
                📄 Contratos de Arriendo
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

            {/* Pagos */}
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
                💳 Últimos Pagos
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
          </div>
        </>
      )}
    </div>
  );
}
