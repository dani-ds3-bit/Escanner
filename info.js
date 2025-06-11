// Obtenencion de parámetros
const params = new URLSearchParams(window.location.search);
const data = params.get('data') || 'Descripción no disponible';

// muestra archivo TXT
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

//    URL del sitio historico etc
document.getElementById('link-oficial').href = 'https://institucion.example.org';

// leer en voz alta
function leerDescripcion() {
  if (!window._textoADecir) return;
  const utter = new SpeechSynthesisUtterance(window._textoADecir);
  utter.lang = 'es-MX';
  speechSynthesis.speak(utter);
}
