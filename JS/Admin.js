document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAdminLogin");
  const mensaje = document.getElementById("mensajeLogin");

  // LOGIN DEL ADMIN
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const usuario = document.getElementById("usuario").value.trim();
      const clave = document.getElementById("clave").value.trim();

      if (usuario === "admin@urbano.com" && clave === "1234") {
        localStorage.setItem("adminActivo", usuario);
        window.location.href = "../HTML/AdminPanel.html";
      } else {
        mensaje.textContent = "Credenciales inválidas.";
      }
    });
  }

  // PROTECCIÓN DE ACCESO EN PANEL
  const adminActivo = localStorage.getItem("adminActivo");
  if (!adminActivo && window.location.pathname.includes("AdminPanel.html")) {
    window.location.href = "../HTML/Admin.html";
  }

  // SALUDO Y LOGOUT EN PANEL
  const saludo = document.getElementById("saludoAdmin");
  const logout = document.getElementById("logoutAdmin");

  if (adminActivo && saludo) {
    saludo.textContent = `Bienvenido, ${adminActivo}`;
  }

  if (logout) {
    logout.addEventListener("click", () => {
      localStorage.removeItem("adminActivo");
      window.location.href = "../HTML/Admin.html";
    });
  }
});
