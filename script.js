document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. PRELOADER ANIMADO
    // ==========================================
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

    // ==========================================
    // 2. REVELADO AL HACER SCROLL (SCROLL REVEAL)
    // ==========================================
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
    revealOnScroll(); // Ejecutar al cargar para elementos visibles inicialmente

    // ==========================================
    // 3. CONTADORES ANIMADOS DE MÉTRICAS
    // ==========================================
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

    // ==========================================
    // 4. MODO NEÓN (BOTÓN INTERACTIVO FLOTANTE)
    // ==========================================
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

    // ==========================================
    // 5. CURSOR SEGUIDOR PERSONALIZADO
    // ==========================================
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.left = `${e.clientX}px`;
        cursorFollower.style.top = `${e.clientY}px`;
    });
});

// ==========================================
// 6. ENVÍO DE FORMULARIO A WHATSAPP
// ==========================================
function enviarWhatsApp(event) {
    event.preventDefault();

    const telefonoDestino = "595984278165";

    // Obtención de valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const auto = document.getElementById('auto').value.trim();
    const claseAuto = document.getElementById('claseAuto').value;
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    // Estructuración del mensaje
    let textoMensaje = `*¡Hola JR Accesorios! Deseo realizar una cotización.*\n\n`;
    textoMensaje += `👤 *Nombre:* ${nombre}\n`;
    textoMensaje += `📞 *Teléfono:* ${telefono}\n`;
    textoMensaje += `🚗 *Vehículo:* ${auto} (${claseAuto})\n`;
    textoMensaje += `🛠️ *Servicio de Interés:* ${servicio}\n`;
    
    if (mensaje !== "") {
        textoMensaje += `📝 *Detalles adicionales:* ${mensaje}\n`;
    }

    // Codificación para URL y redirección
    const url = `https://wa.me/${telefonoDestino}?text=${encodeURIComponent(textoMensaje)}`;
    window.open(url, '_blank');
}
