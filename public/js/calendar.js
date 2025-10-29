// public/js/calendar.js
document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.calendar-container');
  if (!el) return;

  const calendar = new FullCalendar.Calendar(el, {
    initialView: 'dayGridMonth',
    locale: 'es', // idioma
    expandRows: true,        // Ajusta el contenido verticalmente
    height: '100%',          // Usa todo el alto del contenedor
    contentHeight: 'auto',   // Ajusta el contenido interno
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek'
    },
    selectable: true,
    events: [
      { id: '1', title: 'Recordatorio de prueba', start: '2025-10-29', end: '2025-10-30' }
    ],
    eventClick(info) {
      console.log('Evento:', info.event.title);
    },
    select(info) {
      console.log('Selección:', info.startStr, '→', info.endStr);
    }
  });

  calendar.render();
});
