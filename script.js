document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle Contact Form Submission to Email (aibarra.cepeda@gmail.com)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            const messageInput = document.getElementById('message');

            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            if (name && phone && message) {
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.innerText;

                // Si se está probando abriendo el archivo HTML localmente (file://)
                if (window.location.protocol === 'file:') {
                    const mailtoUrl = `mailto:aibarra.cepeda@gmail.com?subject=${encodeURIComponent('Nuevo Mensaje - Robologix Automation')}&body=${encodeURIComponent('Nombre: ' + name + '\nTeléfono: ' + phone + '\nMensaje: ' + message)}`;
                    alert(`Prueba local en archivo HTML (file://):\n\nServicios de envío directo como FormSubmit requieren estar publicados en un servidor web (http:// / https://).\n\nA continuación se abrirá tu correo para enviar el mensaje a aibarra.cepeda@gmail.com.`);
                    window.location.href = mailtoUrl;
                    return;
                }

                submitBtn.innerText = 'Enviando correo...';
                submitBtn.disabled = true;

                fetch('https://formsubmit.co/ajax/aibarra.cepeda@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        'Nombre Completo': name,
                        'Teléfono / WhatsApp': phone,
                        'Mensaje / Alcance': message,
                        '_subject': 'Nuevo Mensaje de Contacto - Robologix Automation',
                        '_template': 'table'
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success === 'true' || data.success === true) {
                        alert(`¡Gracias ${name}! Hemos recibido tus datos correctamente. Nos pondremos en contacto contigo al ${phone} en breve.`);
                        contactForm.reset();
                        submitBtn.innerText = 'Mensaje Enviado ✓';
                        submitBtn.style.backgroundColor = '#25d366';
                        submitBtn.style.borderColor = '#25d366';
                    } else {
                        // FormSubmit envía un aviso la primera vez para activar el correo
                        alert(`FormSubmit: ${data.message || 'Por favor revisa aibarra.cepeda@gmail.com para confirmar la activación.'}`);
                        contactForm.submit();
                    }

                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.style.borderColor = '';
                    }, 4000);
                })
                .catch(error => {
                    console.error('Error al enviar formulario:', error);
                    contactForm.submit();
                });
            }
        });
    }

    // Sticky Navbar con toggle class para eliminar forced reflow
    const header = document.querySelector('header');
    if (header) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    header.classList.toggle('header-scrolled', window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            });
        });
    }

    // Inyectar Chat Flotante Robologix Automation — estilos servidos directamente en styles.css
    function injectChatWidget() {
        if (document.getElementById('rbl-chat-widget')) return;

        const widget = document.createElement('div');
        widget.id = 'rbl-chat-widget';
        widget.innerHTML = `
          <div class="rbl-chat-button" onclick="toggleRblChat()">
            <span class="rbl-chat-badge">1</span>
            💬
          </div>
          <div class="rbl-chat-modal" id="rblChatModal" style="display: none;">
            <div class="rbl-chat-header">
              <div class="rbl-chat-title"><span style="color:#00E5FF;">⚡ Robologix</span> Automation</div>
              <span style="cursor:pointer;color:#8D99AE;font-size:20px;" onclick="toggleRblChat()">&times;</span>
            </div>
            <div class="rbl-chat-body">
              <div class="rbl-chat-msg">
                👋 <strong>¡Hola! Bienvenido a Robologix Automation.</strong><br>
                Integradora de automatización industrial y PLC en Saltillo y Coahuila. ¿En qué proyecto te apoyamos?
              </div>
              <button class="rbl-chat-opt-btn" onclick="openWaWithMsg('Cotización de Programación de PLC Allen-Bradley / Siemens')">💻 Cotizar Programación de PLC</button>
              <button class="rbl-chat-opt-btn" onclick="openWaWithMsg('Información de Cursos de PLC en Saltillo (DC-3 STPS)')">🎓 Cursos de PLC en Saltillo (DC-3)</button>
              <button class="rbl-chat-opt-btn" onclick="openWaWithMsg('Información de Curso Robot FANUC en Saltillo')">🤖 Curso Robot FANUC en Saltillo</button>
              <button class="rbl-chat-opt-btn" onclick="openWaWithMsg('Soporte de Emergencia 24/7 en Planta')">🚨 Soporte de Emergencia 24/7</button>
              <div style="margin-top: 12px;">
                <a href="https://wa.me/528444551869?text=Hola%20Robologix%20Automation%2C%20me%20interesa%20cotizar%20un%20proyecto%20en%20Saltillo." target="_blank" class="rbl-chat-wa-btn">💬 WhatsApp Directo</a>
              </div>
            </div>
          </div>
        `;
        document.body.appendChild(widget);
    }

    // requestIdleCallback: corre cuando el navegador está idle (no bloquea LCP/FCP)
    if ('requestIdleCallback' in window) {
        requestIdleCallback(injectChatWidget, { timeout: 3000 });
    } else {
        setTimeout(injectChatWidget, 2000);
    }

}); // fin DOMContentLoaded

// Funciones globales para interacción del chat
window.toggleRblChat = function() {
    var modal = document.getElementById('rblChatModal');
    if (modal) {
        modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
    }
};

window.openWaWithMsg = function(optionText) {
    var text = encodeURIComponent("Hola Robologix Automation, solicito información sobre: " + optionText + " en Saltillo.");
    window.open("https://wa.me/528444551869?text=" + text, "_blank");
};
