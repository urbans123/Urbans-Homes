// ========== SISTEMA DE GESTIÓN DE DASHBOARD ==========

// Inicializar datos en localStorage si no existen
function inicializarDatos() {
  if (!localStorage.getItem("usuarios")) {
    const usuariosIniciales = [
      {
        id: 1,
        nombre: "Kernz Marnuea",
        correo: "margo@media.com",
        estado: "Activo",
        fecha: "2024-03-31",
        telefono: "1234567890",
      },
      {
        id: 2,
        nombre: "Jorge Fereyra",
        correo: "jorge@rededal.com",
        estado: "Activo",
        fecha: "2024-03-29",
        telefono: "0987654321",
      },
      {
        id: 3,
        nombre: "Matth Wilgness",
        correo: "marth@wrligner.com",
        estado: "Activo",
        fecha: "2024-03-28",
        telefono: "1122334455",
      },
      {
        id: 4,
        nombre: "Emarius Naran",
        correo: "emglans@cne.com",
        estado: "Inactivo",
        fecha: "2024-03-26",
        telefono: "5566778899",
      },
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuariosIniciales));
  }

  if (!localStorage.getItem("reportes")) {
    const reportesIniciales = [];
    localStorage.setItem("reportes", JSON.stringify(reportesIniciales));
  }

  if (!localStorage.getItem("estadisticas")) {
    const estadisticasIniciales = {
      ventasTotal: 32984,
      usuariosActivos: 1200,
      productosDisponibles: 560,
      pedidosPendientes: 150,
    };
    localStorage.setItem("estadisticas", JSON.stringify(estadisticasIniciales));
  }
}

function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function obtenerReportes() {
  return JSON.parse(localStorage.getItem("reportes")) || [];
}

function obtenerEstadisticas() {
  return JSON.parse(localStorage.getItem("estadisticas")) || {};
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  actualizarEstadisticas();
}

function guardarReportes(reportes) {
  localStorage.setItem("reportes", JSON.stringify(reportes));
}

function guardarEstadisticas(estadisticas) {
  localStorage.setItem("estadisticas", JSON.stringify(estadisticas));
}

function actualizarEstadisticas() {
  const usuarios = obtenerUsuarios();
  const inmuebles = JSON.parse(localStorage.getItem("carrito")) || [];
  const estadisticas = obtenerEstadisticas();

  estadisticas.usuariosActivos = usuarios.filter(
    (u) => u.estado === "Activo",
  ).length;
  estadisticas.productosDisponibles = inmuebles.length;

  guardarEstadisticas(estadisticas);
  renderizarEstadisticas();
}

function renderizarEstadisticas() {
  const stats = document.querySelector(".stats");
  if (!stats) return;

  const estadisticas = obtenerEstadisticas();

  stats.innerHTML = `
    <div class="card">
      <h3>$${estadisticas.ventasTotal.toLocaleString()}</h3>
      <p>Ventas totales</p>
    </div>
    <div class="card">
      <h3>${estadisticas.usuariosActivos}</h3>
      <p>Usuarios activos</p>
    </div>
    <div class="card">
      <h3>${estadisticas.productosDisponibles}</h3>
      <p>Productos disponibles</p>
    </div>
    <div class="card">
      <h3>${estadisticas.pedidosPendientes}</h3>
      <p>Pedidos pendientes</p>
    </div>
  `;
}

function mostrarDashboard(tabla) {
  tabla.innerHTML = `
    <tr>
      <td colspan="5" style="text-align: center; padding: 40px;">
        <h3>Bienvenido al Dashboard</h3>
        <p>Usa el menú lateral para gestionar usuarios, productos y pedidos</p>
      </td>
    </tr>
  `;
}

// Mostrar usuarios en tabla
function mostrarUsuarios(tabla) {
  const usuarios = obtenerUsuarios();
  const searchTerm =
    document.querySelector(".search-input")?.value.toLowerCase() || "";

  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(searchTerm) ||
      u.correo.toLowerCase().includes(searchTerm),
  );

  if (usuariosFiltrados.length === 0) {
    tabla.innerHTML =
      "<tr><td colspan='5'>No hay usuarios registrados.</td></tr>";
    return;
  }

  tabla.innerHTML = usuariosFiltrados
    .map(
      (u) => `
    <tr>
      <td>${u.nombre}</td>
      <td>${u.correo}</td>
      <td><span class="estado ${u.estado.toLowerCase()}">${u.estado}</span></td>
      <td>${u.fecha}</td>
      <td>
        <button class="btn-accion" onclick="abrirModalEditar('usuario', ${u.id})">✏️</button>
        <button class="btn-accion" onclick="eliminarUsuario(${u.id})">🗑️</button>
      </td>
    </tr>
  `,
    )
    .join("");
}

function mostrarInmuebles(tabla) {
  const inmuebles = JSON.parse(localStorage.getItem("carrito")) || [];
  const searchTerm =
    document.querySelector(".search-input")?.value.toLowerCase() || "";

  const inmueblesFiltrados = inmuebles.filter((i) =>
    i.titulo.toLowerCase().includes(searchTerm),
  );

  if (inmueblesFiltrados.length === 0) {
    tabla.innerHTML =
      "<tr><td colspan='5'>No hay inmuebles registrados.</td></tr>";
    return;
  }

  tabla.innerHTML = inmueblesFiltrados
    .map(
      (i, idx) => `
    <tr>
      <td>${i.titulo}</td>
      <td>$${i.precio}</td>
      <td><img src="${i.imagen}" alt="" style="width:60px;height:40px;object-fit:cover;border-radius:6px;"></td>
      <td>${i.ubicacion || "No especificada"}</td>
      <td>
        <button class="btn-accion" onclick="abrirModalEditar('inmueble', ${idx})">✏️</button>
        <button class="btn-accion" onclick="eliminarInmueble(${idx})">🗑️</button>
      </td>
    </tr>
  `,
    )
    .join("");
}

function mostrarReservas(tabla) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const searchTerm =
    document.querySelector(".search-input")?.value.toLowerCase() || "";

  const carritoFiltrado = carrito.filter((r) =>
    r.titulo.toLowerCase().includes(searchTerm),
  );

  if (carritoFiltrado.length === 0) {
    tabla.innerHTML = "<tr><td colspan='5'>No hay reservas aún.</td></tr>";
    return;
  }

  tabla.innerHTML = carritoFiltrado
    .map(
      (r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${r.titulo}</td>
      <td>$${r.precio}</td>
      <td><span class="estado confirmada">Confirmada</span></td>
      <td>
        <button class="btn-accion" onclick="eliminarReserva(${i})">🗑️</button>
      </td>
    </tr>
  `,
    )
    .join("");
}

// Eliminar usuario
function eliminarUsuario(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
    let usuarios = obtenerUsuarios();
    usuarios = usuarios.filter((u) => u.id !== id);
    guardarUsuarios(usuarios);
    mostrarUsuarios(document.querySelector(".table-section tbody"));
    mostrarNotificacion("✅ Usuario eliminado exitosamente");
  }
}

function eliminarInmueble(index) {
  if (confirm("¿Estás seguro de que deseas eliminar este inmueble?")) {
    let inmuebles = JSON.parse(localStorage.getItem("carrito")) || [];
    inmuebles.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(inmuebles));
    actualizarEstadisticas();
    mostrarInmuebles(document.querySelector(".table-section tbody"));
    mostrarNotificacion("✅ Inmueble eliminado exitosamente");
  }
}
function eliminarReserva(index) {
  if (confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarReservas(document.querySelector(".table-section tbody"));
    mostrarNotificacion("✅ Reserva eliminada exitosamente");
  }
}

function agregarUsuario() {
  const modal = document.getElementById("modalAgregarUsuario");
  if (modal) {
    modal.classList.add("show");
  }
}

function cerrarModal() {
  const modal = document.getElementById("modalAgregarUsuario");
  if (modal) {
    modal.classList.remove("show");
    document.getElementById("formAgregarUsuario").reset();
  }
}

function cerrarModalEditar() {
  const modal = document.getElementById("modalEditarUsuario");
  if (modal) {
    modal.classList.remove("show");
    document.getElementById("formEditarUsuario").reset();
  }
}

// Variable para almacenar el usuario siendo editado
let usuarioEditandoId = null;

function abrirModalEditar(tipo, id) {
  if (tipo === "usuario") {
    const usuarios = obtenerUsuarios();
    const usuario = usuarios.find((u) => u.id === id);
    if (usuario) {
      usuarioEditandoId = id;
      document.getElementById("editNombre").value = usuario.nombre;
      document.getElementById("editCorreo").value = usuario.correo;
      document.getElementById("editTelefono").value = usuario.telefono;
      document.getElementById("editEstado").value = usuario.estado;

      const modal = document.getElementById("modalEditarUsuario");
      if (modal) {
        modal.classList.add("show");
      }
    }
  }
}

function mostrarNotificacion(mensaje, tipo = "success") {
  const notification = document.createElement("div");
  notification.className = "notification " + (tipo === "error" ? "error" : "");
  notification.textContent = mensaje;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function confirmarAccion(mensaje, callback) {
  const respuesta = confirm(mensaje);
  if (respuesta) {
    callback();
  }
}

function generarReporte() {
  const usuarios = obtenerUsuarios();
  const inmuebles = JSON.parse(localStorage.getItem("carrito")) || [];
  const estadisticas = obtenerEstadisticas();

  const reporte = {
    fecha: new Date().toISOString(),
    usuariosActivos: usuarios.filter((u) => u.estado === "Activo").length,
    usuariosInactivos: usuarios.filter((u) => u.estado === "Inactivo").length,
    totalUsuarios: usuarios.length,
    totalInmuebles: inmuebles.length,
    ventasTotal: estadisticas.ventasTotal,
    pedidosPendientes: estadisticas.pedidosPendientes,
  };

  const reportes = obtenerReportes();
  reportes.push(reporte);
  guardarReportes(reportes);

  mostrarNotificacion(
    `✅ Reporte generado exitosamente!\n\n📊 Total de usuarios: ${reporte.totalUsuarios}\n✅ Activos: ${reporte.usuariosActivos}\n❌ Inactivos: ${reporte.usuariosInactivos}\n🏠 Total inmuebles: ${reporte.totalInmuebles}\n💰 Ventas: $${reporte.ventasTotal}`,
  );
}

// Buscar en tiempo real
function configurarBusqueda() {
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const activeItem = document.querySelector(".sidebar ul li.active");
      if (activeItem) {
        activeItem.click();
      }
    });
  }
}

// Event Listeners principales
document.addEventListener("DOMContentLoaded", () => {
  inicializarDatos();
  actualizarEstadisticas();
  renderizarEstadisticas();
  configurarBusqueda();

  const logoutBtn = document.querySelector(".logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("¿Deseas cerrar sesión?")) {
        localStorage.removeItem("adminActivo");
        window.location.href = "../HTML/Admin.html";
      }
    });
  }

  const items = document.querySelectorAll(".sidebar ul li");
  const tableSection = document.querySelector(".table-section tbody");
  const btnAgregarUsuario = document.querySelector(".btn-primary");
  const btnGenerarReporte = document.querySelector(".btn-secondary");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      const seccion = item.textContent.trim();
      switch (seccion) {
        case "🏠 Dashboard":
          mostrarDashboard(tableSection);
          break;
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
          tableSection.innerHTML =
            "<tr><td colspan='5'>Selecciona una opción del menú.</td></tr>";
      }
    });
  });

  if (btnAgregarUsuario) {
    btnAgregarUsuario.addEventListener("click", agregarUsuario);
  }

  if (btnGenerarReporte) {
    btnGenerarReporte.addEventListener("click", generarReporte);
  }

  // Event listeners para modales
  const modalAgregarUsuario = document.getElementById("modalAgregarUsuario");
  const formAgregarUsuario = document.getElementById("formAgregarUsuario");
  const closeBtn = document.querySelector(".close");

  if (closeBtn) {
    closeBtn.addEventListener("click", cerrarModal);
  }

  if (modalAgregarUsuario) {
    modalAgregarUsuario.addEventListener("click", (e) => {
      if (e.target === modalAgregarUsuario) {
        cerrarModal();
      }
    });
  }

  if (formAgregarUsuario) {
    formAgregarUsuario.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("inputNombre").value;
      const correo = document.getElementById("inputCorreo").value;
      const telefono = document.getElementById("inputTelefono").value;

      if (!nombre || !correo || !telefono) {
        mostrarNotificacion("Por favor completa todos los campos", "error");
        return;
      }

      const usuarios = obtenerUsuarios();
      const nuevoUsuario = {
        id: Math.max(0, ...usuarios.map((u) => u.id)) + 1,
        nombre,
        correo,
        estado: "Activo",
        fecha: new Date().toISOString().split("T")[0],
        telefono,
      };

      usuarios.push(nuevoUsuario);
      guardarUsuarios(usuarios);
      mostrarUsuarios(document.querySelector(".table-section tbody"));
      mostrarNotificacion("✅ Usuario agregado exitosamente");
      cerrarModal();
    });
  }

  // Event listener para formulario de editar
  const formEditarUsuario = document.getElementById("formEditarUsuario");
  const modalEditarUsuario = document.getElementById("modalEditarUsuario");

  if (modalEditarUsuario) {
    const closeBtnEditar = modalEditarUsuario.querySelector(".close");
    if (closeBtnEditar) {
      closeBtnEditar.addEventListener("click", cerrarModalEditar);
    }

    modalEditarUsuario.addEventListener("click", (e) => {
      if (e.target === modalEditarUsuario) {
        cerrarModalEditar();
      }
    });
  }

  if (formEditarUsuario) {
    formEditarUsuario.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("editNombre").value;
      const correo = document.getElementById("editCorreo").value;
      const telefono = document.getElementById("editTelefono").value;
      const estado = document.getElementById("editEstado").value;

      if (!nombre || !correo || !telefono) {
        mostrarNotificacion("Por favor completa todos los campos", "error");
        return;
      }

      const usuarios = obtenerUsuarios();
      const usuarioIndex = usuarios.findIndex(
        (u) => u.id === usuarioEditandoId,
      );

      if (usuarioIndex !== -1) {
        usuarios[usuarioIndex] = {
          ...usuarios[usuarioIndex],
          nombre,
          correo,
          telefono,
          estado,
        };
        guardarUsuarios(usuarios);
        mostrarUsuarios(document.querySelector(".table-section tbody"));
        mostrarNotificacion("✅ Usuario actualizado exitosamente");
        cerrarModalEditar();
      }
    });
  }

  // Mostrar dashboard por defecto
  mostrarDashboard(tableSection);
});
