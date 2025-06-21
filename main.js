// Reproducción de audio de fondo al primer clic
document.addEventListener('click', () => {
  const bgAudio = document.getElementById('audio-bg');
  if (bgAudio) bgAudio.play();
}, { once: true });

// Inicializar AOS
AOS.init({
  duration: 800,
  once: true
});

// === Tarjetas de tecnologías (sección tecnología) ===
const cardData = [
  {
    image: 'img/K-audio spatial engine.jpg',
    title: 'K-audio spatial engine',
    text: 'El K-Audio Spatial Engine permite experimentar un sonido envolvente con precisión de estudio, adaptándose al entorno físico para brindar una espacialidad natural.'
  },
  {
    image: 'img/DSPengine.jpg',
    title: 'Arquitectura DSP',
    text: 'Procesamiento de señal digital en tiempo real con ultra baja latencia, optimizado para una respuesta precisa y dinámica en cualquier entorno sonoro.'
  },
  {
    image: 'img/caja acustica.jpg',
    title: 'Caja Acústica',
    text: 'Estructura diseñada para aislar frecuencias no deseadas y potenciar la profundidad de los graves con máxima precisión.'
  }
];

const techContainer = document.getElementById('tech-cards-container');

if (techContainer) {
  cardData.forEach((card) => {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    const cardElement = `
      <div class="card-glass text-center p-3 h-100">
        <img src="${card.image}" alt="${card.title}" class="img-fluid rounded mb-3">
        <h5 class="mt-2 fw-bold">${card.title}</h5>
        <p class="mb-0">${card.text}</p>
      </div>
    `;

    col.innerHTML = cardElement;
    techContainer.appendChild(col);
  });
}

// === Testimonios (sección comunidad) ===
const testimonios = [
  {
    nombre: "Julián Ríos",
    profesion: "Productor de audio",
    texto: "Llevo más de 20 años metido en estudios, probando equipos de todo tipo, y te juro que esto me voló la cabeza...",
    imagen: "img/user1.jpg",
    estrellas: 5
  },
  {
    nombre: "Sofía Blanco",
    profesion: "Diseñadora UX",
    texto: "Trabajo muchas horas con música o videollamadas, así que necesito auriculares que me acompañen sin molestar...",
    imagen: "img/user2.jpg",
    estrellas: 5
  },
  {
    nombre: "Carlos Méndez",
    profesion: "Streamer",
    texto: "Lo que más valoro es que no tengo que pensar en los auriculares mientras trabajo. Son cómodos, suenan bien y no distraen...",
    imagen: "img/user3a.jpg",
    estrellas: 4
  },
  {
    nombre: "Lucía Álvarez",
    profesion: "Cantante",
    texto: "Como cantante soy muy sensible a los matices del audio. Los equipos de música de Audionova me permiten escuchar cada detalle...",
    imagen: "img/user4.jpg",
    estrellas: 5
  },
  {
    nombre: "Gabriela Rivas",
    profesion: "Ingeniera en tecnología",
    texto: "En mi trabajo necesito detectar cada detalle, cada capa de sonido. Con Audionova, siento que todo está donde debe estar...",
    imagen: "img/user5.jpg",
    estrellas: 5
  },
  {
    nombre: "Martina López",
    profesion: "Diseñadora multimedia",
    texto: "Paso horas diseñando con música de fondo. El sonido de Audionova tiene algo especial: me envuelve, me enfoca...",
    imagen: "img/user6.jpg",
    estrellas: 4
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const comunidadContainer = document.querySelector('.comunidad-container');
  if (!comunidadContainer) return;

  // Detecta si estás en index.html o raíz
  const pathname = window.location.pathname;
  const esIndex = pathname.includes('index.html') || pathname === '/' || pathname === '' || pathname.endsWith('/');

  const lista = esIndex ? testimonios.slice(0, 3) : testimonios;

  lista.forEach(t => {
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4';

    card.innerHTML = `
      <div class="community-card d-flex flex-column justify-content-between h-100 p-4 rounded-4 glass-effect text-white">
        <div>
          <div class="stars mb-2">${'★'.repeat(t.estrellas)}</div>
          <p class="mb-4 text-light">“${t.texto}”</p>
        </div>
        <div class="d-flex align-items-center gap-3 mt-auto">
          <img src="${t.imagen}" alt="${t.nombre}" class="rounded-circle filtro-audionova" width="100" height="100">
          <div>
            <div class="fw-semibold text-white">${t.nombre}</div>
            <div class="profesion">${t.profesion}</div>
          </div>
        </div>
      </div>
    `;

    comunidadContainer.appendChild(card);
  });
});



// === Carrusel de productos automático (horizontal) ===
const carrusel = document.querySelector('.productos-carrusel');
let scrollAmount = 0;
let autoScrollInterval;

if (carrusel) {
  function autoScrollCarrusel() {
    if (carrusel.scrollLeft + carrusel.clientWidth >= carrusel.scrollWidth) {
      scrollAmount = 0;
    } else {
      scrollAmount += 1;
    }
    carrusel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }

  autoScrollInterval = setInterval(autoScrollCarrusel, 30);

  carrusel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  carrusel.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(autoScrollCarrusel, 30);
  });
}

// === Resaltar sección activa en navbar ===
const sections = document.querySelectorAll("section[id], header[id], footer[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) navLink.classList.add("active");
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => observer.observe(section));

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();
  const navProductos = document.getElementById("nav-productos");

  if (currentPage === "productos.html") {
    // Agregamos la clase active al link de Productos
    navProductos.classList.add("active");

    // Resaltamos la sección #Productos si el usuario hace scroll
    const productosSection = document.getElementById("Productos");

    if (productosSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              navProductos.classList.add("active");
            } else {
              navProductos.classList.remove("active");
            }
          });
        },
        { threshold: 0.4 }
      );

      observer.observe(productosSection);
    }
  }
});


// Array de productos
const productos = [
  {
    nombre: "Audiculares Alpha",
    descripcion: "Sonido potente con bajos precisos y conectividad total.",
    precio: "$104.999",
    imagen: "img/Parlante Alpha.png"
  },
  {
    nombre: "Audiculares Orion",
    descripcion: "Diseño liviano y aislamiento de ruido para un enfoque total.",
    precio: "$51.999",
    imagen: "img/Audífonos VERO.png"
  },
  {
    nombre: "Speaker Luna X",
    descripcion: "Compacto, minimalista y con sonido envolvente 360º.",
    precio: "$77.999",
    imagen: "img/Speaker Luna Xa.png"
  },
  {
    nombre: "Double X",
    descripcion: "Diseño sutil con sonido potente y aislamiento enfocado.",
    precio: "$140.999",
    imagen: "img/Parlantes.png"
  },
  {
    nombre: "Audionova Studio Mic",
    descripcion: "Voz nítida y cálida. Captura solo lo esencial.",
    precio: "$180.999",
    imagen: "img/Microfono.png"
  },
  {
    nombre: "Audionova Vinyl Touch",
    descripcion: "Tocadiscos elegante y moderno con sonido puro.",
    precio: "$800.000",
    imagen: "img/Tocadiscos.png"
  },
  {
    nombre: "Speaker Luna X",
    descripcion: "Compacto, minimalista y con sonido envolvente 360º.",
    precio: "$77.999",
    imagen: "img/Audionova Echo Bar.png"
  },
  {
    nombre: "Air 1",
    descripcion: "Diseño sutil con sonido potente y aislamiento enfocado.",
    precio: "$90.999",
    imagen: "img/Audionova mezclador de auios.png"
  }
];

// Renderizado dinámico de productos
document.addEventListener("DOMContentLoaded", () => {
  const productosGrid = document.getElementById("productos-grid");

  productos.forEach(producto => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 d-flex";

    col.innerHTML = `
      <article class="producto-card flex-fill d-flex flex-column text-center mx-auto">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid mb-3">
        <div class="d-flex flex-column justify-content-between flex-grow-1">
          <h5 class="producto-nombre mt-2">${producto.nombre}</h5>
          <p>${producto.descripcion}</p>
          <p class="producto-precio">${producto.precio}</p>
        </div>
      </article>
    `;

    productosGrid.appendChild(col);
  });
});




// navbar.js
const navbarHTML = `
<nav class="navbar navbar-expand-lg navbar-dark py-3 fixed-top" data-aos="fade-down">
  <div class="container">
   <a class="navbar-brand logoaudionova" href="index.html" style="margin-right: 90px;">
  <img src="img/Logo-AudioNova-2.png" alt="Logo" style="max-height: 40px;">
</a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav">

        <li class="nav-item"><a class="nav-link" href="index.html#Nosotros" id="nav-nosotros">Nosotros</a></li>
        <li class="nav-item"><a class="nav-link" href="index.html#tecnologia" id="nav-tecnologia">Tecnología</a></li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="nav-productos-main" data-bs-toggle="dropdown">Productos</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="index.html#productos-destacados">Destacados</a></li>
            <li><a class="dropdown-item" href="productos.html">Todos los productos</a></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="nav-comunidad-main" data-bs-toggle="dropdown">Comunidad</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="index.html#comunidad">Testimonios</a></li>
            <li><a class="dropdown-item" href="comunidad.html">Ver comunidad</a></li>
            <li><a class="dropdown-item" href="comunidad.html#beneficios">Beneficios</a></li>
            <li><a class="dropdown-item" href="comunidad.html#registro-comunidad">Crear cuenta</a></li>
          </ul>
        </li>

        <li class="nav-item"><a class="nav-link" href="index.html#contacto" id="nav-contacto">Contacto</a></li>

        <!-- Ícono de cuenta -->
        <li class="nav-item">
          <a class="nav-link" href="crearcuenta.html" id="nav-login" title="Crear cuenta">
            <i class="fas fa-user"></i>
          </a>
        </li>

      </ul>
    </div>
  </div>
</nav>
`;



document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("navbar");
  if (!container) return;

  // Insertar navbar en el DOM
  container.innerHTML = navbarHTML;

  // Activar ítems del navbar según la URL
  const path = window.location.pathname;

  if (path.includes("crearcuenta.html")) {
    document.getElementById("nav-login")?.classList.add("active");
  }

  if (path.includes("productos.html")) {
    document.getElementById("nav-productos-main")?.classList.add("active");
    // No activamos nav-productos-todos para evitar estilo azul en el dropdown-item
  }

  if (path.includes("comunidad.html")) {
    document.getElementById("nav-comunidad-main")?.classList.add("active");
  }

  // Activación basada en scroll solo en páginas con secciones relevantes
  const sectionToNavMap = {
    Nosotros: "nav-nosotros",
    tecnologia: "nav-tecnologia",
    "productos-destacados": "nav-productos-main",
    comunidad: "nav-comunidad-main",
    beneficios: "nav-comunidad-main",
    "registro-comunidad": "nav-login",
    contacto: "nav-contacto",
    productos:"productos-hero", 
  };

  const hasSections = Object.keys(sectionToNavMap).some(id =>
    document.getElementById(id)
  );

  if (hasSections) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute("id");
          const navId = sectionToNavMap[id];

          if (navId && entry.isIntersecting) {
            Object.values(sectionToNavMap).forEach(nav =>
              document.getElementById(nav)?.classList.remove("active")
            );
            document.getElementById(navId)?.classList.add("active");
          }
        });
      },
      { threshold: 0.4 }
    );

    Object.keys(sectionToNavMap).forEach(id => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
});



const footerHTML = `
<footer id="contacto" class="audionova-footer-section py-5 text-white">
  <div class="container">

    <!-- Título y subtítulo -->
    <div class="row mb-5 justify-content-center">
      <div class="col-lg-8 text-center" data-aos="fade-up">
        <h2 class="audionova-title mb-3">Contactanos</h2>
        <p class="audionova-subheading">
          Para consultas o soporte sobre sonido, completá el formulario o escribinos directamente.
        </p>
      </div>
    </div>

    <!-- Contacto + Formulario -->
    <div class="row gy-5 mb-5">
      <!-- Info de contacto -->
      <div class="col-md-6" data-aos="fade-right" data-aos-delay="100">
        <div class="card-glass p-4 h-100 text-white">
          <h4 class="mb-3">Datos de contacto</h4>
          <p><strong>Email:</strong> contacto@audionova.com</p>
          <p><strong>Teléfono:</strong> +54 11 4444-5555</p>
          <p><strong>Ubicación:</strong> Av. Cabildo 2450, CABA</p>
          <p><strong>Horario:</strong> Lunes a viernes de 10 a 18 hs, Sábados de 11 a 17 hs</p>
          <img src="img/Logo-AudioNova-blanco.png" alt="logoblanco" class="logoblanco img-fluid mt-4">
        </div>
      </div>

 <!-- Formulario -->
<div class="col-md-6" data-aos="fade-left" data-aos-delay="200">
  <div class="card-glass p-4 h-100 text-white">
    <form>
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          placeholder="Tu nombre completo"
          required
        >
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="correo@ejemplo.com"
          required
        >
      </div>
      <div class="mb-3">
        <label for="mensaje" class="form-label">Mensaje</label>
        <textarea
          class="form-control"
          id="mensaje"
          rows="5"
          placeholder="Escribí tu consulta o comentario aquí"
          required
        ></textarea>
      </div>
      <button type="submit" class="audionova-btn mt-4 px-4 py-2 text-dark fw-semibold">
        Enviar mensaje
      </button>
    </form>
  </div>
</div>

    <!-- Footer navegacional -->
<div class="footer-hr-wrapper">
  <hr class="footer-general-divider">
</div>
  <div class="row">
  <!-- Audionova -->
  <div class="col-xl-3 col-lg-4 mb-4 audionova-footer-col" data-aos="fade-up" data-aos-delay="100">
    <hr class="footer-col-divider">
    <p class="audionova-footer-title fw-bold">Audionova</p>
    <ul class="list-unstyled">
      <li><a href="index.html#Nosotros">Sobre la marca</a></li>
      <li><a href="index.html#tecnologia">Tecnología</a></li>
      <li><a href="index.html#contacto">Contacto</a></li>
    </ul>
  </div>

  <!-- Productos -->
  <div class="col-xl-3 col-lg-4 mb-4 audionova-footer-col" data-aos="fade-up" data-aos-delay="150">
     <hr class="footer-col-divider">

    <p class="audionova-footer-title fw-bold">Productos</p>
    <ul class="list-unstyled">
      <li><a href="index.html#productos-destacados">Destacados</a></li>
      <li><a href="productos.html">Todos los productos</a></li>
    </ul>
  </div>

  <!-- Comunidad -->
  <div class="col-xl-3 col-lg-4 mb-4 audionova-footer-col" data-aos="fade-up" data-aos-delay="200">
      <hr class="footer-col-divider">

    <p class="audionova-footer-title fw-bold">Comunidad</p>
    <ul class="list-unstyled">
      <li><a href="index.html#comunidad">Testimonios</a></li>
      <li><a href="comunidad.html">Ver comunidad</a></li>
      <li><a href="comunidad.html#beneficios">Beneficios</a></li>
      <li><a href="comunidad.html#registro-comunidad">Crear cuenta</a></li>
    </ul>
  </div>

  <!-- Soporte -->
  <div class="col-xl-3 col-lg-4 mb-4 audionova-footer-col" data-aos="fade-up" data-aos-delay="250">
        <hr class="footer-col-divider">

    <p class="audionova-footer-title fw-bold">Soporte</p>
    <ul class="list-unstyled">
      <li><a href="mailto:contacto@audionova.com">Enviar email</a></li>
      <li><a href="crearcuenta.html">Crear cuenta</a></li>
    </ul>
  </div>
</div>

</footer>
`;

// Inserta sin romper clases o estilos activos
document.getElementById("footer-container").insertAdjacentHTML('beforeend', footerHTML);






