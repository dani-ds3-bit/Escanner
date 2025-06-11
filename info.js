// Obtener parámetro ?data=...
const params = new URLSearchParams(window.location.search);
const data = params.get('data') || 'Descripción no disponible';

// 1) Mostrar texto estático o desde un archivo TXT
fetch('descripcion.txt')
  .then(resp => resp.text())
  .then(texto => {
    document.getElementById('descripcion').textContent = texto;
    window._textoADecir = texto;
  })
  .catch(_ => {
    document.getElementById('descripcion').textContent = data;
    window._textoADecir = data;
  });

// 2) Configurar enlace oficial dinámico (opcional)
//    Aquí podrías derivar la URL oficial según el parámetro `data`
document.getElementById('link-oficial').href = 'https://institucion.example.org';

// 3) Función para leer en voz alta
function leerDescripcion() {
  if (!window._textoADecir) return;
  const utter = new SpeechSynthesisUtterance(window._textoADecir);
  utter.lang = 'es-MX';
  speechSynthesis.speak(utter);
}
