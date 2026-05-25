
'use strict';

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}


const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}


class HeroSlider {
  constructor() {
    this.slides = document.querySelectorAll('.hero-slide');
    this.dots   = document.querySelectorAll('.dot');
    this.prevBtn = document.getElementById('heroPrev');
    this.nextBtn = document.getElementById('heroNext');
    this.current = 0;
    this.timer   = null;
    if (!this.slides.length) return;
    this.init();
  }

  init() {
    this.prevBtn?.addEventListener('click', () => this.go(this.current - 1));
    this.nextBtn?.addEventListener('click', () => this.go(this.current + 1));
    this.dots.forEach(dot => {
      dot.addEventListener('click', () => this.go(+dot.dataset.index));
    });
    this.autoPlay();
  }

  go(index) {
    this.slides[this.current].classList.remove('active');
    this.dots[this.current]?.classList.remove('active');
    this.current = (index + this.slides.length) % this.slides.length;
    this.slides[this.current].classList.add('active');
    this.dots[this.current]?.classList.add('active');
    this.restartTimer();
  }

  autoPlay() {
    this.timer = setInterval(() => this.go(this.current + 1), 5500);
  }

  restartTimer() {
    clearInterval(this.timer);
    this.autoPlay();
  }
}

/* =============================================
   ANIMATED COUNTERS
   ============================================= */
function animateCounters() {
  const els = document.querySelectorAll('.stat-num[data-target]');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = +el.dataset.target;
      const duration = 1600;
      const step   = 16;
      const inc    = target / (duration / step);
      let current  = 0;
      const tick = () => {
        current = Math.min(current + inc, target);
        el.textContent = Math.floor(current);
        if (current < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });

  els.forEach(el => observer.observe(el));
}

/* =============================================
   PROPIEDADES DATA & RENDER
   ============================================= */
const PROPIEDADES = [
  {
    id: 1,
    titulo: 'Apartamento El Poblado',
    ubicacion: 'El Poblado, Medellín',
    tipo: 'arriendo',
    precio: '$2.800.000',
    periodo: '/mes',
    habitaciones: 2,
    banos: 2,
    area: '85 m²',
    img: 'IMG/Inmueble caro 1.PNG',
    badge: 'Arriendo',
  },
  {
    id: 2,
    titulo: 'Casa Laureles',
    ubicacion: 'Laureles, Medellín',
    tipo: 'venta',
    precio: '$480.000.000',
    periodo: '',
    habitaciones: 3,
    banos: 2,
    area: '140 m²',
    img: 'IMG/Inmueble caro 2.PNG',
    badge: 'Venta',
  },
  {
    id: 3,
    titulo: 'Estudio Envigado',
    ubicacion: 'Envigado, Antioquia',
    tipo: 'arriendo',
    precio: '$1.200.000',
    periodo: '/mes',
    habitaciones: 1,
    banos: 1,
    area: '42 m²',
    img: 'IMG/Inmueble barato 2.PNG',
    badge: 'Económico',
  },
  {
    id: 4,
    titulo: 'Penthouse Ciudad del Río',
    ubicacion: 'Ciudad del Río, Medellín',
    tipo: 'venta',
    precio: '$950.000.000',
    periodo: '',
    habitaciones: 4,
    banos: 3,
    area: '210 m²',
    img: 'IMG/Inmueble caro 3.PNG',
    badge: 'Premium',
  },
  {
    id: 5,
    titulo: 'Apartamento Sabaneta',
    ubicacion: 'Sabaneta, Antioquia',
    tipo: 'arriendo',
    precio: '$1.600.000',
    periodo: '/mes',
    habitaciones: 2,
    banos: 1,
    area: '65 m²',
    img: 'IMG/Inmueble barato 3.PNG',
    badge: 'Arriendo',
  },
  {
    id: 6,
    titulo: 'Casa Bello',
    ubicacion: 'Bello, Antioquia',
    tipo: 'venta',
    precio: '$220.000.000',
    periodo: '',
    habitaciones: 3,
    banos: 2,
    area: '110 m²',
    img: 'IMG/Inmueble barato.jpg',
    badge: 'Venta',
  },
];

function crearTarjetaPropiedad(prop, pathPrefix = '') {
  return `
    <article class="prop-card" data-tipo="${prop.tipo}">
      <div class="prop-img">
        <img src="${pathPrefix}${prop.img}" alt="${prop.titulo}" loading="lazy" />
        <span class="prop-badge">${prop.badge}</span>
      </div>
      <div class="prop-body">
        <h3>${prop.titulo}</h3>
        <p class="prop-location">📍 ${prop.ubicacion}</p>
        <div class="prop-specs">
          <span>🛏 ${prop.habitaciones} hab.</span>
          <span>🚿 ${prop.banos} baños</span>
          <span>📐 ${prop.area}</span>
        </div>
        <div class="prop-footer">
          <div class="prop-price">
            ${prop.precio}
            <small>${prop.periodo}</small>
          </div>
          <button class="prop-btn" data-id="${prop.id}">
            ${prop.tipo === 'arriendo' ? 'Reservar' : 'Consultar'}
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderPropiedadesDestacadas() {
  const grid = document.getElementById('propGrid');
  if (!grid) return;
  // Mostrar las 3 primeras en index
  const destacadas = PROPIEDADES.slice(0, 3);
  grid.innerHTML = destacadas.map(p => crearTarjetaPropiedad(p)).join('');
  grid.querySelectorAll('.prop-btn').forEach(btn => {
    btn.addEventListener('click', () => abrirModal(+btn.dataset.id));
  });
}

function renderPropiedadesPage() {
  const grid = document.querySelector('.propiedades-grid');
  if (!grid) return;
  // Determine path prefix (we're in pages/)
  const prefix = '../';
  grid.innerHTML = PROPIEDADES.map(p => crearTarjetaPropiedad(p, prefix)).join('');
  grid.querySelectorAll('.prop-btn').forEach(btn => {
    btn.addEventListener('click', () => abrirModal(+btn.dataset.id, prefix));
  });
  initFiltros();
}

/* =============================================
   FILTROS (página propiedades)
   ============================================= */
function initFiltros() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.prop-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filtro = btn.dataset.filter;
      cards.forEach(card => {
        const match = filtro === 'all' || card.dataset.tipo === filtro;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}

/* =============================================
   MODAL RESERVA
   ============================================= */
let modalPropId = null;

function abrirModal(id, prefix = '') {
  const prop = PROPIEDADES.find(p => p.id === id);
  if (!prop) return;
  modalPropId = id;

  const overlay = document.getElementById('reservaOverlay');
  if (!overlay) return;

  overlay.querySelector('#modalTitulo').textContent = prop.titulo;
  overlay.querySelector('#modalSub').textContent    = prop.ubicacion + ' · ' + prop.precio + (prop.periodo || '');
  overlay.querySelector('#modalTelefono').value     = '';
  overlay.classList.add('open');
}

function cerrarModal() {
  const overlay = document.getElementById('reservaOverlay');
  overlay?.classList.remove('open');
  modalPropId = null;
}

function initModal() {
  const overlay = document.getElementById('reservaOverlay');
  if (!overlay) return;

  overlay.addEventListener('click', e => {
    if (e.target === overlay) cerrarModal();
  });

  document.getElementById('modalCerrar')?.addEventListener('click', cerrarModal);

  document.getElementById('modalEnviar')?.addEventListener('click', () => {
    const tel = document.getElementById('modalTelefono')?.value.trim();
    if (!tel || isNaN(tel) || tel.length < 7) {
      alert('Por favor ingresa un número de teléfono válido.');
      return;
    }
    const prop = PROPIEDADES.find(p => p.id === modalPropId);
    if (prop) agregarAlCarrito(prop);
    cerrarModal();
  });
}

/* =============================================
   CARRITO
   ============================================= */
function getCarrito() {
  try { return JSON.parse(localStorage.getItem('uh_carrito')) || []; }
  catch { return []; }
}

function setCarrito(carrito) {
  localStorage.setItem('uh_carrito', JSON.stringify(carrito));
  actualizarContador();
}

function actualizarContador() {
  const count = document.getElementById('carritoCount');
  if (count) count.textContent = getCarrito().length;
}

function agregarAlCarrito(prop) {
  const carrito = getCarrito();
  const yaExiste = carrito.some(i => i.id === prop.id);
  if (!yaExiste) {
    carrito.push(prop);
    setCarrito(carrito);
    mostrarToast(`"${prop.titulo}" añadido a tus reservas`);
  } else {
    mostrarToast('Esta propiedad ya está en tu lista');
  }
}

function mostrarToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position:fixed; bottom:2rem; right:2rem; z-index:9999;
      background:#1A1A1A; color:#fff; padding:.75rem 1.25rem;
      border-radius:8px; font-size:.875rem; font-weight:500;
      box-shadow:0 8px 24px rgba(0,0,0,.25);
      transform:translateY(20px); opacity:0;
      transition:all .3s ease; pointer-events:none;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity   = '1';
    setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity   = '0';
    }, 2800);
  });
}

/* =============================================
   CARRITO PAGE
   ============================================= */
function renderCarritoPage() {
  const lista   = document.getElementById('listaCarrito');
  const vaciar  = document.getElementById('vaciarCarrito');
  const prefix  = '../';
  if (!lista) return;

  const carrito = getCarrito();
  if (!carrito.length) {
    lista.innerHTML = `
      <div class="carrito-empty">
        <p style="font-size:3rem;">🏠</p>
        <p>No tienes propiedades en tu lista aún.</p>
        <a href="${prefix}pages/propiedades.html" class="btn-primary" style="margin-top:1rem;">
          Ver propiedades
        </a>
      </div>`;
    return;
  }

  lista.innerHTML = carrito.map((prop, i) => `
    <div class="carrito-item">
      <img src="${prefix}${prop.img}" alt="${prop.titulo}" />
      <div class="carrito-item-info">
        <strong>${prop.titulo}</strong>
        <p style="font-size:.8rem;color:#6B6B6B;">${prop.ubicacion}</p>
        <span class="carrito-item-price">${prop.precio}${prop.periodo || ''}</span>
      </div>
      <button class="carrito-remove" data-index="${i}">Eliminar</button>
    </div>
  `).join('');

  lista.querySelectorAll('.carrito-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = getCarrito();
      c.splice(+btn.dataset.index, 1);
      setCarrito(c);
      renderCarritoPage();
    });
  });

  if (vaciar) {
    vaciar.addEventListener('click', () => {
      if (confirm('¿Vaciar toda la lista de reservas?')) {
        setCarrito([]);
        renderCarritoPage();
      }
    });
  }
}

/* =============================================
   LOGIN / AUTH
   ============================================= */
const USUARIOS_VALIDOS = [
  { usuario: 'propietario1', clave: '1234' },
  { usuario: 'propietario2', clave: '5678' },
  { usuario: 'admin',        clave: 'admin' },
];

function initLogin() {
  const form    = document.getElementById('formLogin');
  const errMsg  = document.getElementById('loginError');
  if (!form) return;

  // Si ya está logueado, redirigir
  if (localStorage.getItem('uh_usuario')) {
    window.location.href = 'propiedades.html';
    return;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value.trim();
    const clave   = document.getElementById('clave').value.trim();
    const valido  = USUARIOS_VALIDOS.find(u => u.usuario === usuario && u.clave === clave);
    if (valido) {
      localStorage.setItem('uh_usuario', usuario);
      window.location.href = 'propiedades.html';
    } else {
      if (errMsg) errMsg.textContent = 'Usuario o contraseña incorrectos.';
    }
  });
}

function mostrarUsuarioActivo() {
  const usuario    = localStorage.getItem('uh_usuario');
  const saludoEl   = document.getElementById('usuarioSaludo');
  const logoutBtn  = document.getElementById('cerrarSesion');
  if (saludoEl && usuario) saludoEl.textContent = `Hola, ${usuario}`;
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('uh_usuario');
      localStorage.removeItem('uh_carrito');
      window.location.href = '../index.html';
    });
  }
}

/* =============================================
   FORMULARIO CONTACTO
   ============================================= */
function initFormContacto() {
  const form = document.getElementById('formContacto');
  const msg  = document.getElementById('formMsg');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (msg) {
      msg.textContent = '✓ ¡Gracias! Tu mensaje fue enviado. Te contactaremos pronto.';
      form.reset();
      setTimeout(() => { msg.textContent = ''; }, 4000);
    }
  });
}

/* =============================================
   INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  new HeroSlider();
  animateCounters();
  renderPropiedadesDestacadas();
  renderPropiedadesPage();
  renderCarritoPage();
  initModal();
  initLogin();
  initFormContacto();
  mostrarUsuarioActivo();
  actualizarContador();
});
