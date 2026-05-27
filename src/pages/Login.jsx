import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

// Usuarios de prueba disponibles
const USUARIOS_VALIDOS = [
  { usuario: "admin", clave: "admin", rol: "admin", nombre: "Administrador" },
  {
    usuario: "empleado1",
    clave: "emp123",
    rol: "empleado",
    nombre: "Juan Pérez",
  },
  {
    usuario: "empleado2",
    clave: "emp456",
    rol: "empleado",
    nombre: "María García",
  },
  {
    usuario: "propietario1",
    clave: "1234",
    rol: "propietario",
    nombre: "Carlos López",
  },
  {
    usuario: "propietario2",
    clave: "5678",
    rol: "propietario",
    nombre: "Ana Martínez",
  },
];

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    usuario: "",
    clave: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Verificar si ya existe sesión activa al cargar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("uh_usuario");
    const rol = localStorage.getItem("uh_rol");
    if (usuarioGuardado && rol) {
      // Redirigir al dashboard correspondiente
      const dashboards = {
        admin: "/dashboard-admin",
        empleado: "/dashboard-empleado",
        propietario: "/dashboard-propietario",
      };
      navigate(dashboards[rol] || "/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Limpiar error al escribir
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      setLoading(true);

      // Buscar usuario en la lista de válidos
      const usuarioValido = USUARIOS_VALIDOS.find(
        (u) =>
          u.usuario === formData.usuario.trim() &&
          u.clave === formData.clave.trim(),
      );

      if (usuarioValido) {
        // Guardar datos en localStorage
        localStorage.setItem("uh_usuario", formData.usuario.trim());
        localStorage.setItem("uh_rol", usuarioValido.rol);
        localStorage.setItem("uh_nombre", usuarioValido.nombre);

        // Redirigir al dashboard según el rol
        const dashboards = {
          admin: "/dashboard-admin",
          empleado: "/dashboard-empleado",
          propietario: "/dashboard-propietario",
        };

        setTimeout(() => {
          setLoading(false);
          navigate(dashboards[usuarioValido.rol]);
        }, 500);
      } else {
        setLoading(false);
        setError("Usuario o contraseña incorrectos");
        setFormData((prev) => ({ ...prev, clave: "" }));
      }
    } else {
      // Registro (placeholder - aquí irá la lógica de registro con backend)
      if (formData.clave !== formData.confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
      }
      setError("La funcionalidad de registro será habilitada pronto");
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <span className="brand-icon">⬡</span>
            <h1>Urban Homes</h1>
          </div>

          <div className="login-tabs">
            <button
              className={`tab ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Ingresar
            </button>
            <button
              className={`tab ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Registrarse
            </button>
          </div>

          {error && (
            <div
              style={{
                padding: "0.8rem",
                marginBottom: "1rem",
                background: "#fee",
                color: "#c33",
                borderRadius: "4px",
                fontSize: "0.9rem",
                border: "1px solid #fcc",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="usuario">Usuario</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                required
                placeholder="ej: propietario1, admin"
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="clave">Contraseña</label>
              <input
                type="password"
                id="clave"
                name="clave"
                value={formData.clave}
                onChange={handleChange}
                required
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                />
              </div>
            )}

            {isLogin && (
              <div
                className="login-hint"
                style={{
                  background: "#f9f",
                  padding: "1rem",
                  borderRadius: "6px",
                  marginBottom: "1rem",
                  fontSize: "0.85rem",
                  color: "#555",
                }}
              >
                <strong>Usuarios de prueba:</strong>
                <br />
                admin / admin
                <br />
                propietario1 / 1234
                <br />
                empleado1 / emp123
              </div>
            )}

            {isLogin && (
              <div className="form-remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Recuerda mis datos</label>
                <a href="#" className="forgot-pwd">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="btn-primary full"
              disabled={loading}
              style={{
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Cargando..." : isLogin ? "Ingresar" : "Registrarse"}
            </button>
          </form>

          <div className="login-divider">o</div>

          <div className="social-login">
            <button className="social-btn" disabled={loading}>
              <span>👤</span> Google
            </button>
            <button className="social-btn" disabled={loading}>
              <span>f</span> Facebook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
