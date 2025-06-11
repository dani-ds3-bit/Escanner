const searchInput = document.getElementById('search-input');
const scannerContainer = document.getElementById('scanner-container');
const resultContainer = document.getElementById('result');
let scanner;

function startScanner() {
  scannerContainer.style.display = 'flex';
  resultContainer.textContent = '';

  scanner = new Html5Qrcode('reader');
  scanner.start(
    { facingMode: 'environment' },
    { fps: 10, qrbox: { width: 250, height: 250 } },
    qrCodeMessage => {
      scanner.stop().then(() => {
        scanner.clear();
        scannerContainer.style.display = 'none';
        // abrir info.html pasando la URL escaneada como parámetro
        const encoded = encodeURIComponent(qrCodeMessage);
        window.open(`info.html?data=${encoded}`, '_blank');
      });
    },
    errorMessage => {
      // manejo de errores opcional
    }
  ).catch(err => {
    console.error('Error al iniciar escáner:', err);
    alert('No se pudo acceder a la cámara.');
  });
}

function goBack() {
  if (scanner) {
    scanner.stop().then(() => scanner.clear());
  }
  scannerContainer.style.display = 'none';
  resultContainer.textContent = '';
}
