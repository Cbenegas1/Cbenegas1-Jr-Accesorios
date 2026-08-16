document.addEventListener("DOMContentLoaded", () => {

    // 1. PRELOADER
    const preloader = document.getElementById("preloader");
    const loaderBar = document.getElementById("loaderBar");

    if (preloader && loaderBar) {
        let progreso = 0;
        const intervaloCarga = setInterval(() => {
            progreso += Math.floor(Math.random() * 12) + 8;
            
            if (progreso >= 100) {
                progreso = 100;
                loaderBar.style.width = "100%";
                clearInterval(intervaloCarga);
                
                setTimeout(() => {
                    preloader.classList.add("oculto");
                }, 300);
            } else {
                loaderBar.style.width = `${progreso}%`;
            }
        }, 60);
    }

    // 2. HEADER CON SCROLL EFECTO
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header.classList.add("abajo");
        } else {
            header.classList.remove("abajo");
        }
    });

    // 3. ANIMACIÓN 'SCROLL REVEAL'
    const elementosReveal = document.querySelectorAll(".reveal");

    const observerOption = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                
                // Disparar contador de números si está en la sección de métricas
                if(entry.target.classList.contains("item-metrica")) {
                    animarContadores();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOption);

    elementosReveal.forEach(el => revealObserver.observe(el));

    // 4. ANIMACIÓN DE NÚMEROS (CONTADORES)
    let contadoresEjecutados = false;
    function animarContadores() {
        if (contadoresEjecutados) return;
        contadoresEjecutados = true;

        const numeros = document.querySelectorAll(".numero");
        numeros.forEach(num => {
            const objetivo = +num.getAttribute("data-target");
            let inicio = 0;
            const incremento = objetivo / 40;

            const actualizarConteo = () => {
                inicio += incremento;
                if (inicio < objetivo) {
                    num.innerText = Math.ceil(inicio);
                    setTimeout(actualizarConteo, 40);
                } else {
                    num.innerText = objetivo;
                }
            };
            actualizarConteo();
        });
    }

    // 5. NAVEGACIÓN SUAVE
    const enlacesNav = document.querySelectorAll('a[href^="#"]');
    enlacesNav.forEach(enlace => {
        enlace.addEventListener("click", function (e) {
            e.preventDefault();
            const objetivoId = this.getAttribute("href");
            const objetivoSeccion = document.querySelector(objetivoId);

            if (objetivoSeccion) {
                const headerOffset = 80;
                const elementoPosicion = objetivoSeccion.getBoundingClientRect().top;
                const offsetPosicion = elementoPosicion + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosicion,
                    behavior: "smooth"
                });
            }
        });
    });
});

// 6. FUNCIONES DE INTERACCIÓN EXTERNAS
function mensaje() {
    const seccionServicios = document.getElementById("servicios");
    if (seccionServicios) {
        const headerOffset = 80;
        const elementoPosicion = seccionServicios.getBoundingClientRect().top;
        const offsetPosicion = elementoPosicion + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosicion,
            behavior: "smooth"
        });
    }
}

function enviarWhatsApp(event) {
    event.preventDefault();

    const numeroTelefono = "595984278165";
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servicio = document.getElementById("servicio").value;
    const consulta = document.getElementById("mensaje").value.trim();

    const textoMensaje = `*¡Hola JR Motor! Nueva consulta desde la web:*%0A%0A` +
        `👤 *Nombre:* ${encodeURIComponent(nombre)}%0A` +
        `📞 *Contacto:* ${encodeURIComponent(telefono)}%0A` +
        `🛠️ *Servicio de Interés:* ${encodeURIComponent(servicio)}%0A` +
        `💬 *Consulta:* ${encodeURIComponent(consulta)}`;

    window.open(`https://wa.me/${numeroTelefono}?text=${textoMensaje}`, "_blank");
}
