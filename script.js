document.addEventListener('DOMContentLoaded', function() {
  fetch('cabañas.xlsx')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.arrayBuffer();
    })
    .then(data => {
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
    })
    .catch(error => {
      console.error('Error al cargar el archivo Excel:', error);
      const contenedor = document.getElementById('contenedor-fichas');
      contenedor.innerHTML = '<p style="color: red;">No se pudo cargar la información de las cabañas. Asegúrate de que "cabañas.xlsx" esté en la misma carpeta.</p>';
    });
});