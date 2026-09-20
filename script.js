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

    // Sticky Navbar transparency on scroll — passive:true elimina forced reflow
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = 'none';
        }
    }, { passive: true });
    // Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Burger Animation
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

    // Inyectar Chat Flotante Robologix Automation — diferido con requestIdleCallback
    // para evitar forced reflow durante la carga crítica
    function injectChatWidget() {
        if (document.getElementById('rbl-chat-widget')) return;

        // Batch: crear todo en un DocumentFragment antes de tocar el DOM real
        const frag = document.createDocumentFragment();

        const style = document.createElement('style');
        style.id = 'rbl-chat-style';
        style.textContent = `
          #rbl-chat-widget { position: fixed; bottom: 25px; right: 25px; z-index: 999999; font-family: sans-serif; }
          .rbl-chat-button { background: linear-gradient(135deg, #00E5FF, #0088FF); color: #0B132B; width: 65px; height: 65px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px rgba(0, 229, 255, 0.4); cursor: pointer; border: 2px solid #00E5FF; transition: all 0.3s; }
          .rbl-chat-button:hover { transform: scale(1.1); }
          .rbl-chat-badge { position: absolute; top: -2px; right: -2px; background-color: #FFB703; color: #0B132B; font-size: 11px; font-weight: 800; padding: 3px 7px; border-radius: 10px; }
          .rbl-chat-modal { display: none; position: fixed; bottom: 100px; right: 25px; width: 350px; background-color: #0B132B; border: 2px solid #00E5FF; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); overflow: hidden; z-index: 999999; }
          .rbl-chat-header { background: #1C2541; padding: 16px 20px; border-bottom: 1px solid rgba(0, 229, 255, 0.3); display: flex; justify-content: space-between; align-items: center; }
          .rbl-chat-title { color: #FFF; font-weight: 800; font-size: 16px; }
          .rbl-chat-body { padding: 20px; color: #E0E6ED; font-size: 14px; }
          .rbl-chat-msg { background: #1C2541; border-left: 3px solid #00E5FF; padding: 12px; border-radius: 8px; margin-bottom: 15px; }
          .rbl-chat-wa-btn { display: flex; align-items: center; justify-content: center; background: #25D366; color: #FFF; font-weight: 800; padding: 12px; border-radius: 10px; text-decoration: none; text-align: center; }
          .rbl-chat-opt-btn { width: 100%; background: rgba(0, 229, 255, 0.08); border: 1px solid rgba(0, 229, 255, 0.3); color: #00E5FF; padding: 9px 12px; border-radius: 8px; margin-bottom: 8px; text-align: left; cursor: pointer; font-size: 13px; }
          .rbl-chat-opt-btn:hover { background: rgba(0, 229, 255, 0.2); }
        `;
        frag.appendChild(style);

        const widget = document.createElement('div');
        widget.id = 'rbl-chat-widget';
        widget.innerHTML = `
          <div class="rbl-chat-button" onclick="toggleRblChat()">
            <span class="rbl-chat-badge">1</span>
            💬
          </div>
          <div class="rbl-chat-modal" id="rblChatModal">
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
        frag.appendChild(widget);

        // Una sola escritura al DOM real — cero reflows intermedios
        document.head.appendChild(frag.firstChild); // style
        document.body.appendChild(frag.lastChild);  // widget
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
