
// ----- Navegación entre vistas -----
const links = document.querySelectorAll('.nav a');
const views = document.querySelectorAll('section.view');
links.forEach(link=>{
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    links.forEach(l=>l.classList.remove('active'));
    link.classList.add('active');
    const id = link.getAttribute('data-view');
    views.forEach(v=>v.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  });
});

// ----- Última actualización (reloj) -----
const lastUpd = document.getElementById('lastUpd');
function setLastUpdate(){
  const d = new Date();
  const hh = String(d.getHours()).padStart(2,'0');
  const mm = String(d.getMinutes()).padStart(2,'0');
  lastUpd.textContent = `Última actualización: ${hh}:${mm}`;
}
setLastUpdate();
setInterval(setLastUpdate, 60000);

// ----- Chart.js configuración base -----
const palette = { c1:'#e3e8cd', c2:'#bcd8bf', c3:'#d3b9a3', c4:'#ee9c92', c5:'#fe857e' };
const gridColor = 'rgba(227,232,205,.15)';
const tickColor = '#e3e8cd';
function baseOpts(){
  return {
    responsive: true,
    plugins: { legend: { labels:{ color: tickColor } } },
    scales: {
      x: { grid: { color: gridColor }, ticks: { color: tickColor } },
      y: { grid: { color: gridColor }, ticks: { color: tickColor } }
    }
  };
}

// ----- Gráficos sección INICIO -----
const humData = [76,77,79,78,80,79];
const humChart = new Chart(document.getElementById('humChart'),{
  type:'line',
  data:{ labels:['06h','08h','10h','12h','14h','16h'],
    datasets:[{ label:'HR %', data: humData, borderColor: palette.c5, backgroundColor:'transparent', tension:.35, pointBackgroundColor: palette.c5 }] },
  options: baseOpts()
});

new Chart(document.getElementById('tempChart'),{
  type:'line',
  data:{ labels:['06h','08h','10h','12h','14h','16h'],
    datasets:[{ label:'°C', data:[19,20,21,22,22,21], borderColor: palette.c4, backgroundColor:'transparent', tension:.35, pointBackgroundColor: palette.c4 }] },
  options: baseOpts()
});

new Chart(document.getElementById('sensPie'),{
  type:'doughnut',
  data:{ labels:['Online','Latencia','Batería baja'], datasets:[{ data:[7,2,1], backgroundColor:[palette.c2,palette.c3,palette.c4], borderColor:'#14181f' }] },
  options:{ plugins:{ legend:{ labels:{ color: tickColor } } } }
});

// Alerta HR > 80%
function checkHumAlert(){
  const latest = humData[humData.length-1];
  const alert = document.getElementById('alertHum');
  const kpi = document.getElementById('kpiHum');
  if(latest > 80){ alert.classList.remove('hidden'); kpi.style.color = palette.c4; }
  else { alert.classList.add('hidden'); kpi.style.color = palette.c5; }
}
checkHumAlert();

// ----- Calendario (mock visual) -----
const chips = document.querySelectorAll('#dias .chip');
chips.forEach(c=> c.addEventListener('click', ()=> c.classList.toggle('active')));

document.getElementById('simNoti').addEventListener('click', ()=>{
  const bell = document.getElementById('bell');
  bell.classList.remove('shake'); void bell.offsetWidth; bell.classList.add('shake');
  const tbody = document.getElementById('tablaNotis');
  const tr = document.createElement('tr');
  const d = new Date();
  const dd = String(d.getDate()).padStart(2,'0');
  const mm = String(d.getMonth()+1).padStart(2,'0');
  tr.innerHTML = `<td>${dd}/${mm}/${d.getFullYear()}</td><td>+2 min</td><td>Riego</td><td><span class="pill warn">Disparada</span></td>`;
  tbody.prepend(tr);
});

// ----- Sensores: minigráficos -----
function miniLine(canvasId, color){
  return new Chart(document.getElementById(canvasId),{
    type:'line',
    data:{ labels:['10','11','12','13','14','15'],
      datasets:[{ data:[78,79,80,79,81,80], borderColor:color, backgroundColor:'transparent', tension:.35, pointRadius:0 }] },
    options:{ scales:{ x:{ display:false }, y:{ display:false } }, plugins:{ legend:{ display:false } } }
  });
}
miniLine('a1line', palette.c5);
miniLine('b2line', palette.c4);
miniLine('c3line', palette.c3);

// ----- Historial: selector de frecuencia (mock) -----
let histChart = new Chart(document.getElementById('histArea'),{
  type:'line',
  data:{ labels:['00','02','04','06','08','10','12','14','16','18','20','22'],
    datasets:[{ label:'HR %', data:[80,79,78,77,76,77,78,79,80,79,78,77],
      borderColor:palette.c2, backgroundColor:'rgba(188,216,191,.25)', fill:true, tension:.35 }] },
  options: baseOpts()
});

document.getElementById('freq').addEventListener('change', (e)=>{
  const v = e.target.value; // 60, 30, 1440
  const dense = v==='30' ? 24 : v==='60' ? 12 : 8;
  const labels = Array.from({length:dense}, (_,i)=> i%2===0? `${String(i).padStart(2,'0')}:00` : `${String(i).padStart(2,'0')}:30`);
  const data = Array.from({length:dense}, ()=> Math.round(76 + Math.sin(Math.random()*Math.PI)*4));
  histChart.data.labels = labels;
  histChart.data.datasets[0].data = data;
  histChart.update();
});


//-------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('mailStatus');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.classList.remove('hidden');
    status.textContent = 'Enviando…';

    // Mapea los campos del form con las variables del template
    const data = {
      from_name: form.elements['from_name'].value,
      reply_to: form.elements['reply_to'].value,
      message: form.elements['message'].value,
    };

    try {
      // Reemplaza con tus IDs
      const serviceID = 'service_zyheldd';
      const templateID = 'rFIFwdSbNBkCxkPBl';
      await emailjs.send(serviceID, templateID, data);
      status.textContent = '¡Enviado con éxito!';
      form.reset();
    } catch (err) {
      console.error(err);
      status.textContent = 'Ocurrió un error al enviar. Inténtalo de nuevo.';
    }
  });
});
//



const simBtn = document.getElementById('simNoti');
if (simBtn) {
  simBtn.addEventListener('click', async () => {
    try {
      await emailjs.send('service_zyheldd', 'rFIFwdSbNBkCxkPBl', {
        from_name: 'OrchidCare',
        message: 'Nueva alerta: el riego se disparó (+2 min).',
        reply_to: 'no-reply@orchidcare.local'
      });
      console.log('Notificación por correo enviada.');
    } catch (e) {
      console.error('Error enviando email', e);
    }
  });
}
