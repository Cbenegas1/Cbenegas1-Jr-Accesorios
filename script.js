document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       PRELOADER
    ========================================================= */

    const preloader = document.getElementById('preloader');
    const loaderBar = document.getElementById('loaderBar');

    if (preloader && loaderBar) {

        let progress = 0;

        const interval = setInterval(() => {

            progress += Math.floor(Math.random() * 15) + 5;

            if (progress > 100) {
                progress = 100;
            }

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


    /* =========================================================
       MENÚ MÓVIL
    ========================================================= */

    const menuToggle = document.querySelector(
        '.menu-toggle, .menu-btn, #menu-toggle, #menuBtn, .hamburger'
    );

    const navMenu = document.querySelector(
        '.nav-menu, .menu, #nav-menu, #menu, nav ul'
    );

    if (menuToggle && navMenu) {

        menuToggle.setAttribute('aria-expanded', 'false');

        menuToggle.addEventListener('click', (event) => {

            event.preventDefault();
            event.stopPropagation();

            navMenu.classList.toggle('active');

            const abierto = navMenu.classList.contains('active');

            menuToggle.setAttribute(
                'aria-expanded',
                abierto ? 'true' : 'false'
            );

            menuToggle.classList.toggle('active', abierto);

            document.body.classList.toggle(
                'menu-abierto',
                abierto
            );

        });


        /* Cerrar menú al tocar un enlace */

        const enlacesMenu = navMenu.querySelectorAll('a');

        enlacesMenu.forEach(enlace => {

            enlace.addEventListener('click', () => {

                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');

                menuToggle.setAttribute(
                    'aria-expanded',
                    'false'
                );

                document.body.classList.remove(
                    'menu-abierto'
                );

            });

        });


        /* Cerrar al tocar fuera del menú */

        document.addEventListener('click', (event) => {

            const clickDentroMenu =
                navMenu.contains(event.target);

            const clickBoton =
                menuToggle.contains(event.target);

            if (
                !clickDentroMenu &&
                !clickBoton &&
                navMenu.classList.contains('active')
            ) {

                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');

                menuToggle.setAttribute(
                    'aria-expanded',
                    'false'
                );

                document.body.classList.remove(
                    'menu-abierto'
                );

            }

        });


        /* Cerrar menú con ESC */

        document.addEventListener('keydown', (event) => {

            if (
                event.key === 'Escape' &&
                navMenu.classList.contains('active')
            ) {

                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');

                menuToggle.setAttribute(
                    'aria-expanded',
                    'false'
                );

                document.body.classList.remove(
                    'menu-abierto'
                );

                menuToggle.focus();

            }

        });

    }


    /* =========================================================
       ANIMACIONES REVEAL
    ========================================================= */

    const revealElements =
        document.querySelectorAll('.reveal');

    const revealOnScroll = () => {

        const windowHeight = window.innerHeight;
        const elementVisible = 120;

        revealElements.forEach(element => {

            const elementTop =
                element.getBoundingClientRect().top;

            if (
                elementTop <
                windowHeight - elementVisible
            ) {

                element.classList.add('active');

            }

        });

    };

    window.addEventListener(
        'scroll',
        revealOnScroll,
        { passive: true }
    );

    revealOnScroll();


    /* =========================================================
       CONTADORES DE MÉTRICAS
    ========================================================= */

    const numeros =
        document.querySelectorAll('.numero');

    let animatedMetrics = false;

    const animateMetrics = () => {

        const sectionMetricas =
            document.querySelector('.metricas');

        if (!sectionMetricas) {
            return;
        }

        const sectionPos =
            sectionMetricas.getBoundingClientRect().top;

        const windowHeight =
            window.innerHeight;

        if (
            sectionPos < windowHeight &&
            !animatedMetrics
        ) {

            animatedMetrics = true;

            numeros.forEach(num => {

                const target =
                    Number(num.getAttribute('data-target'));

                if (!Number.isFinite(target)) {
                    return;
                }

                let count = 0;

                const increment =
                    Math.max(1, Math.ceil(target / 50));

                const updateCounter = () => {

                    count += increment;

                    if (count >= target) {

                        num.innerText = target;

                    } else {

                        num.innerText = count;

                        setTimeout(
                            updateCounter,
                            30
                        );

                    }

                };

                updateCounter();

            });

        }

    };

    window.addEventListener(
        'scroll',
        animateMetrics,
        { passive: true }
    );

    animateMetrics();


    /* =========================================================
       MODO NEÓN
    ========================================================= */

    const toggleBtn =
        document.createElement('button');

    toggleBtn.classList.add(
        'btn-neon-toggle'
    );

    toggleBtn.setAttribute(
        'aria-label',
        'Alternar Modo Neón'
    );

    toggleBtn.setAttribute(
        'type',
        'button'
    );

    toggleBtn.innerHTML =
        '<i class="fa-solid fa-bolt"></i>';

    document.body.appendChild(toggleBtn);


    toggleBtn.addEventListener('click', () => {

        document.body.classList.toggle(
            'neon-mode'
        );

        const isNeon =
            document.body.classList.contains(
                'neon-mode'
            );

        toggleBtn.style.color =
            isNeon
                ? '#00f3ff'
                : 'var(--accent-color)';

        toggleBtn.style.borderColor =
            isNeon
                ? '#00f3ff'
                : 'var(--accent-color)';

    });


    /* =========================================================
       CURSOR PERSONALIZADO
    ========================================================= */

    const cursorFollower =
        document.createElement('div');

    cursorFollower.classList.add(
        'cursor-follower'
    );

    document.body.appendChild(
        cursorFollower
    );


    document.addEventListener(
        'mousemove',
        (event) => {

            cursorFollower.style.left =
                `${event.clientX}px`;

            cursorFollower.style.top =
                `${event.clientY}px`;

        }
    );


    /* =========================================================
       EVITAR SCROLL CUANDO EL MENÚ ESTÁ ABIERTO
    ========================================================= */

    const controlarScroll = () => {

        if (
            document.body.classList.contains(
                'menu-abierto'
            )
        ) {

            document.body.style.overflow =
                'hidden';

        } else {

            document.body.style.overflow =
                '';

        }

    };

    const observerMenu =
        new MutationObserver(controlarScroll);

    observerMenu.observe(
        document.body,
        {
            attributes: true,
            attributeFilter: ['class']
        }
    );

});


/* =========================================================
   FORMULARIO → WHATSAPP
========================================================= */

function enviarWhatsApp(event) {

    event.preventDefault();

    const telefonoDestino =
        "595984278165";

    const nombreElement =
        document.getElementById('nombre');

    const telefonoElement =
        document.getElementById('telefono');

    const autoElement =
        document.getElementById('auto');

    const claseAutoElement =
        document.getElementById('claseAuto');

    const servicioElement =
        document.getElementById('servicio');

    const mensajeElement =
        document.getElementById('mensaje');


    const nombre =
        nombreElement
            ? nombreElement.value.trim()
            : '';

    const telefono =
        telefonoElement
            ? telefonoElement.value.trim()
            : '';

    const auto =
        autoElement
            ? autoElement.value.trim()
            : '';

    const claseAuto =
        claseAutoElement
            ? claseAutoElement.value
            : '';

    const servicio =
        servicioElement
            ? servicioElement.value
            : '';

    const mensaje =
        mensajeElement
            ? mensajeElement.value.trim()
            : '';


    let textoMensaje =
        `*¡Hola JR Accesorios! Deseo realizar una cotización.*\n\n`;

    textoMensaje +=
        `👤 *Nombre:* ${nombre}\n`;

    textoMensaje +=
        `📞 *Teléfono:* ${telefono}\n`;

    textoMensaje +=
        `🚗 *Vehículo:* ${auto} (${claseAuto})\n`;

    textoMensaje +=
        `🛠️ *Servicio de Interés:* ${servicio}\n`;


    if (mensaje !== '') {

        textoMensaje +=
            `📝 *Detalles adicionales:* ${mensaje}\n`;

    }


    const url =
        `https://wa.me/${telefonoDestino}?text=${encodeURIComponent(textoMensaje)}`;


    window.open(
        url,
        '_blank',
        'noopener,noreferrer'
    );

}