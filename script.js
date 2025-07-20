
document.getElementById('excelFile').addEventListener('change', function(e) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    const contenedor = document.getElementById('contenedor-fichas');
    contenedor.innerHTML = '';

    json.forEach(item => {
      const ficha = document.createElement('div');
      ficha.className = 'ficha-hotel';
      ficha.innerHTML = `
        <h2>${item.titulo}</h2>
        <div class="estrellas">${item.estrellas}</div>
        <a class="mapa" href="${item.mapa}" target="_blank">Mostrar en el mapa</a>
        <a class="sitio-web" href="${item['sitio web']}" target="_blank">Visitar sitio web</a>
        <p class="descripcion">${item.descripcion}</p>
        <div class="puntuacion">Puntuación: ${item.puntuacion}</div>
      `;
      contenedor.appendChild(ficha);
    });
  };
  reader.readAsArrayBuffer(e.target.files[0]);
});
