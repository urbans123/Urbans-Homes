document.addEventListener('DOMContentLoaded', () => {


  class FiltroInmuebles {
    constructor() {
      this.buttons = document.querySelectorAll('.filter-btn');
      this.cards = document.querySelectorAll('.inmuebles .card');
      this.init();
    }

    init() {
      this.buttons.forEach(button => {
        button.addEventListener('click', () => this.filtrar(button));
      });
    }

    filtrar(button) {
      this.buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filtro = button.getAttribute('data-filter');

      this.cards.forEach(card => {
        if (filtro === 'all' || card.getAttribute('data-type') === filtro) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
  }

  class ModalReserva {
    constructor() {
      this.reservarBtns = document.querySelectorAll('.inmuebles .precio button');
      this.modal = document.getElementById('loginModal');
      this.overlay = document.getElementById('modalOverlay');
      this.btnCerrar = document.getElementById('btnCerrar');
      this.btnEnviar = document.getElementById('btnEnviar');
      this.inputTelefono = document.getElementById('telefono');
      this.init();
    }

    init() {
      this.reservarBtns.forEach(btn =>
        btn.addEventListener('click', (e) => this.mostrarModal(e))
      );
      if (this.btnCerrar) this.btnCerrar.addEventListener('click', () => this.ocultarModal());
      if (this.overlay) this.overlay.addEventListener('click', () => this.ocultarModal());
      if (this.btnEnviar) this.btnEnviar.addEventListener('click', () => this.enviarNumero());
    }

    mostrarModal(e) {
      const card = e.target.closest('.card');
      const titulo = card.querySelector('p').innerText;
      this.modal.dataset.inmueble = titulo;
      this.modal.style.display = 'block';
      if (this.overlay) this.overlay.style.display = 'block';
      this.inputTelefono.value = '';
      this.inputTelefono.focus();
    }

    ocultarModal() {
      this.modal.style.display = 'none';
      if (this.overlay) this.overlay.style.display = 'none';
    }

    enviarNumero() {
    const numero = this.inputTelefono.value.trim();
    if (numero === '' || isNaN(numero)) {
    alert('Por favor ingrese un número válido');
    return;
    }

    const inmueble = this.modal.dataset.inmueble;

    const cardEl = Array.from(document.querySelectorAll('.card'))
      .find(c => c.querySelector('p').innerText === inmueble);

    const precio = cardEl.querySelector('.precio h2').innerText;
    const imagen = cardEl.querySelector('img').src;

    agregarAlCarrito(inmueble, precio, imagen);
    alert(`Número enviado: ${numero}\n${inmueble} añadido a tus reservas.`);
    this.ocultarModal();
    }



  }

  class App {
    constructor() {
      this.filtros = new FiltroInmuebles();
      this.modal = new ModalReserva();
      this.iniciarCarrito();
      this.mostrarUsuario();
    }

    iniciarCarrito() {
      const carritoIcono = document.getElementById("carritoIcono");
      const carritoCount = document.getElementById("carritoCount");

      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      const actualizarCarrito = () => {
        if (carritoCount) carritoCount.textContent = carrito.length;
        localStorage.setItem("carrito", JSON.stringify(carrito));
      };

      actualizarCarrito();

 if (carritoIcono) {
  carritoIcono.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
    } else {
      let resumen = "🧾 Tus inmuebles reservados:\n\n";
      carrito.forEach((c, i) => {
        resumen += `${i + 1}. ${c}\n`;
      });
      alert(resumen);
    }
  });
}
const btnVerCarrito = document.getElementById("verCarrito");
if (btnVerCarrito) {
  btnVerCarrito.addEventListener("click", () => {
    window.location.href = "../HTML/carrito.html";
  });
}

    }

    mostrarUsuario() {
      const usuarioActivo = localStorage.getItem("usuarioActivo");
      const saludo = document.getElementById("bienvenida");
      const btnLogout = document.getElementById("cerrarSesion");

      if (usuarioActivo && saludo) {
        saludo.textContent = `Bienvenido, ${usuarioActivo}`;
      }

      if (btnLogout) {
        btnLogout.addEventListener("click", () => {
          localStorage.removeItem("usuarioActivo");
          localStorage.removeItem("carrito");
          window.location.href = "../HTML/Propietarios.html";
        });
      }
    }
  }

  new App();

});


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formLogin");
  const mensaje = document.getElementById("mensajeLogin");

  const usuarioActivo = localStorage.getItem("usuarioActivo");
  if (usuarioActivo && window.location.pathname.includes("Propietarios.html")) {
    window.location.href = "../HTML/inmueble2.html";
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const usuario = document.getElementById("usuario").value.trim();
      const clave = document.getElementById("clave").value.trim();

      const usuariosValidos = [
        { usuario: "propietario1", clave: "1234" },
        { usuario: "propietario2", clave: "5678" },
        { usuario: "admin", clave: "admin" }
      ];

      const valido = usuariosValidos.find(
        (u) => u.usuario === usuario && u.clave === clave
      );

      if (valido) {
        localStorage.setItem("usuarioActivo", usuario);
        window.location.href = "../HTML/inmueble2.html";
      } else {
        if (mensaje) mensaje.textContent = "Usuario o contraseña incorrectos.";
      }
    });
  }
});

function agregarAlCarrito(nombreInmueble, precio, imagen) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const nuevoInmueble = {
    titulo: nombreInmueble,
    precio: precio,
    imagen: imagen
  };

  carrito.push(nuevoInmueble);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  const contador = document.getElementById("carritoCount");
  if (contador) contador.textContent = carrito.length;

  alert(`${nombreInmueble} añadido al carrito.`);
}
document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaCarrito");
  const btnVaciar = document.getElementById("vaciarCarrito");

  if (lista) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
      lista.innerHTML = "<p style='text-align:center; color:#555;'>No tienes reservas aún.</p>";
    } else {
      lista.innerHTML = carrito.map((item, i) => `
        <li>
          <div style="display:flex; align-items:center; gap:15px;">
            <img src="${item.imagen}" alt="${item.titulo}"
                 style="width:120px; height:80px; object-fit:cover; border-radius:8px;">
            <div>
              <strong>${item.titulo}</strong><br>
              <span style="color:#f97316; font-weight:600;">${item.precio}</span>
            </div>
          </div>
          <button class="eliminar" data-index="${i}">Eliminar</button>
        </li>
      `).join("");

      lista.querySelectorAll(".eliminar").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const index = e.target.dataset.index;
          carrito.splice(index, 1);
          localStorage.setItem("carrito", JSON.stringify(carrito));
          window.location.reload();
        });
      });
    }
  }

  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      localStorage.removeItem("carrito");
      alert("Carrito vaciado.");
      window.location.reload();
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const contador = document.getElementById("carritoCount");
  if (contador) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    contador.textContent = carrito.length;
  }
});


