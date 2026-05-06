// Login demo para Propietarios
// Usuario: propietario
// Contraseña: 1234

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('usuario').value.trim();
    const pass = document.getElementById('clave').value.trim();

    if (user === 'propietario' && pass === '1234') {
      localStorage.setItem('propietarioLogueado', JSON.stringify({usuario: user}));
      const cont = document.querySelector('.contenedorMenu');
      if (cont) {
        cont.innerHTML = `<h2>Bienvenido, ${user}!</h2><p>Has iniciado sesión correctamente.</p>`;
      }
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  });
});
