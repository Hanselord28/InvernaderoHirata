document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('mailStatus');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    status.classList.remove('hidden');
    status.textContent = 'Enviando…';

    // IDs de tu cuenta de EmailJS:
    const serviceID = 'service_zyheldd';   // <-- reemplaza
    const templateID = 'template_rp1svs4'; // <-- reemplazaservice_zyheldd

    // Deben coincidir con las variables del Template en EmailJS
    const params = {
      from_name: form.elements['from_name'].value,
      reply_to: form.elements['reply_to'].value,
      message: form.elements['message'].value,
    };

    try {
      await emailjs.send(serviceID, templateID, params);
      status.textContent = '¡Enviado con éxito!';
      form.reset();
    } catch (err) {
      console.error('[EmailJS] Error:', err);
      status.textContent = 'Ocurrió un error al enviar. Intenta de nuevo.';
    }
  });
});
