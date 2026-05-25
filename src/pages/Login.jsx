import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Iniciando sesión:", { email: formData.email });
      alert("¡Bienvenido!");
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
      console.log("Registrando usuario:", { email: formData.email });
      alert("¡Registro exitoso! Por favor inicia sesión");
      setIsLogin(true);
    }
    navigate("/");
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

          <form onSubmit={handleSubmit} className="login-form">
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
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
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
              <div className="form-remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Recuerda mis datos</label>
                <a href="#" className="forgot-pwd">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}

            <button type="submit" className="btn-primary full">
              {isLogin ? "Ingresar" : "Registrarse"}
            </button>
          </form>

          <div className="login-divider">o</div>

          <div className="social-login">
            <button className="social-btn">
              <span>👤</span> Google
            </button>
            <button className="social-btn">
              <span>f</span> Facebook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
