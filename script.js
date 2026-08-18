document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.getElementById('btnMenu');
const navMenu = document.getElementById('navMenu');

if (btnMenu && navMenu) {
    btnMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cierra el menú al tocar cualquier opción
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}
    
    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loaderBar');
    
    if (preloader && loaderBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 5;
            if (progress > 100) progress = 100;
            
            loaderBar.style.width = `${progress}%`;

            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    preloader.style.visibility = 'hidden';
                }, 300);
            }
        }, 100);
    }

    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 120;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    const numeros = document.querySelectorAll('.numero');
    let animatedMetrics = false;

    const animateMetrics = () => {
        const sectionMetricas = document.querySelector('.metricas');
        if (!sectionMetricas) return;

        const sectionPos = sectionMetricas.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionPos < windowHeight && !animatedMetrics) {
            animatedMetrics = true;

            numeros.forEach(num => {
                const target = +num.getAttribute('data-target');
                let count = 0;
                const increment = Math.ceil(target / 50);

                const updateCounter = () => {
                    count += increment;
                    if (count >= target) {
                        num.innerText = target;
                    } else {
                        num.innerText = count;
                        setTimeout(updateCounter, 30);
                    }
                };

                updateCounter();
            });
        }
    };

    window.addEventListener('scroll', animateMetrics);

    const toggleBtn = document.createElement('button');
    toggleBtn.classList.add('btn-neon-toggle');
    toggleBtn.setAttribute('aria-label', 'Alternar Modo Neón');
    toggleBtn.innerHTML = '<i class="fa-solid fa-bolt"></i>';
    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('neon-mode');
        const isNeon = document.body.classList.contains('neon-mode');
        toggleBtn.style.color = isNeon ? '#00f3ff' : 'var(--accent-color)';
        toggleBtn.style.borderColor = isNeon ? '#00f3ff' : 'var(--accent-color)';
    });

    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.left = `${e.clientX}px`;
        cursorFollower.style.top = `${e.clientY}px`;
    });
});

function enviarWhatsApp(event) {
    event.preventDefault();

    const telefonoDestino = "595984278165";

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const auto = document.getElementById('auto').value.trim();
    const claseAuto = document.getElementById('claseAuto').value;
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    let textoMensaje = `*¡Hola JR Accesorios! Deseo realizar una cotización.*\n\n`;
    textoMensaje += `👤 *Nombre:* ${nombre}\n`;
    textoMensaje += `📞 *Teléfono:* ${telefono}\n`;
    textoMensaje += `🚗 *Vehículo:* ${auto} (${claseAuto})\n`;
    textoMensaje += `🛠️ *Servicio de Interés:* ${servicio}\n`;
    
    if (mensaje !== "") {
        textoMensaje += `📝 *Detalles adicionales:* ${mensaje}\n`;
    }

    const url = `https://wa.me/${telefonoDestino}?text=${encodeURIComponent(textoMensaje)}`;
    window.open(url, '_blank');
}
