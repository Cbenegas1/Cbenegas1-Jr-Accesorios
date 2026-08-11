// Función para el botón "Conócenos" en la sección Hero
function mensaje() {
    alert("¡Bienvenido a JR MOTOR!");
}

// 1. Control de la Pantalla de Carga (Preloader Lento)
window.addEventListener('DOMContentLoaded', () => {
    const loaderBar = document.getElementById('loaderBar');
    const preloader = document.getElementById('preloader');

    let progreso = 0;
    const incremento = 1.5;     // Avance pausado (cuanto menor sea, más lento)
    const tiempoIntervalo = 40; // Se actualiza cada 40 milisegundos

    const intervalo = setInterval(() => {
        progreso += incremento;
        if (loaderBar) loaderBar.style.width = progreso + '%';

        if (progreso >= 100) {
            clearInterval(intervalo);
            
            // Pausa con la barra llena antes de desvanecerse
            setTimeout(() => {
                if (preloader) preloader.classList.add('oculto');
            }, 400);
        }
    }, tiempoIntervalo);

    // Inicializa la animación suave de las tarjetas
    const tarjetas = document.querySelectorAll(".card, .item-galeria");
    tarjetas.forEach(el => {
        el.style.transition = "all 0.6s ease-out";
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
    });

    mostrarElementos();
});

// 2. Animación al hacer Scroll para las tarjetas
function mostrarElementos() {
    const tarjetas = document.querySelectorAll(".card, .item-galeria");
    tarjetas.forEach(el => {
        const posicion = el.getBoundingClientRect().top;
        if (posicion < window.innerHeight - 100) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
}

// 3. Fondo oscuro en la barra superior al hacer Scroll
function cambiarHeader() {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("abajo");
    } else {
        header.classList.remove("abajo");
    }
}

// Escuchar evento Scroll
window.addEventListener("scroll", () => {
    mostrarElementos();
    cambiarHeader();
});

// 4. Función para procesar y enviar el formulario a WhatsApp
function enviarWhatsApp(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const servicio = document.getElementById('servicio').value;
    const mensajeTexto = document.getElementById('mensaje').value;

    const numeroWhatsApp = "595984278165";

    const texto = `Hola JR Motor, mi nombre es *${nombre}*.\n\n` +
                  `📱 *Teléfono:* ${telefono}\n` +
                  `🛠️ *Servicio de Interés:* ${servicio}\n` +
                  `💬 *Consulta:* ${mensajeTexto}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');
}
function mensaje() {
    // Redirige o desplaza la pantalla hasta la sección con id="servicios"
    document.getElementById("servicios").scrollIntoView({ behavior: "smooth" });
}