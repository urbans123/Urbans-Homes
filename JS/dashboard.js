document.addEventListener("DOMContentLoaded", () => {
 
const logoutBtn = document.querySelector(".logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    const confirmar = confirm("¿Deseas cerrar sesión?");
    if (confirmar) {
      localStorage.removeItem("adminActivo");
      window.location.href = "../HTML/Admin.html";
    }
  });
}
  
  const items = document.querySelectorAll(".sidebar ul li");
  const tableSection = document.querySelector(".table-section tbody");

  items.forEach(item => {
    item.addEventListener("click", () => {
      items.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      switch (item.textContent.trim()) {
        case "👤 Usuarios":
          mostrarUsuarios(tableSection);
          break;
        case "📦 Productos":
          mostrarInmuebles(tableSection);
          break;
        case "🧾 Pedidos":
          mostrarReservas(tableSection);
          break;
        default:
          tableSection.innerHTML = "<tr><td colspan='5'>Selecciona una opción del menú.</td></tr>";
      }
    });
  });
});



function mostrarUsuarios(tabla) {
  const propietarios = [
    { nombre: "Propietario 1", correo: "prop1@hogar.com", estado: "Activo", fecha: "2024-05-12" },
    { nombre: "Propietario 2", correo: "prop2@hogar.com", estado: "Inactivo", fecha: "2024-04-22" }
  ];

  tabla.innerHTML = propietarios.map(p => `
    <tr>
      <td>${p.nombre}</td>
      <td>${p.correo}</td>
      <td><span class="estado ${p.estado.toLowerCase()}">${p.estado}</span></td>
      <td>${p.fecha}</td>
      <td>✏️ 🗑️</td>
    </tr>
  `).join("");
}

function mostrarInmuebles(tabla) {
  const inmuebles = JSON.parse(localStorage.getItem("carrito")) || [];

  if (inmuebles.length === 0) {
    tabla.innerHTML = "<tr><td colspan='5'>No hay inmuebles registrados.</td></tr>";
    return;
  }

  tabla.innerHTML = inmuebles.map(i => `
    <tr>
      <td>${i.titulo}</td>
      <td>${i.precio}</td>
      <td><img src="${i.imagen}" alt="" style="width:60px;height:40px;object-fit:cover;border-radius:6px;"></td>
      <td>-</td>
      <td>✏️ 🗑️</td>
    </tr>
  `).join("");
}

function mostrarReservas(tabla) {
  const reservas = JSON.parse(localStorage.getItem("carrito")) || [];
  if (reservas.length === 0) {
    tabla.innerHTML = "<tr><td colspan='5'>No hay reservas aún.</td></tr>";
    return;
  }

  tabla.innerHTML = reservas.map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${r.titulo}</td>
      <td>${r.precio}</td>
      <td>Confirmada</td>
      <td>🗑️</td>
    </tr>
  `).join("");
}
