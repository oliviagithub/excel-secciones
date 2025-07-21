document.addEventListener('DOMContentLoaded', function() {
    const contenedor = document.getElementById('contenedor-fichas');
    contenedor.innerHTML = '<p>Cargando información de las cabañas...</p>'; // Mensaje de carga inicial

    // Ruta del archivo Excel que se cargará automáticamente
    const excelFilePath = 'cabañas.xlsx';

    fetch(excelFilePath)
        .then(response => {
            if (!response.ok) {
                // Si la respuesta no es OK (ej. 404 Not Found, 500 Internal Server Error)
                throw new Error(`HTTP error! Estado: ${response.status}. No se pudo cargar el archivo.`);
            }
            return response.arrayBuffer(); // Lee el archivo como un ArrayBuffer
        })
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            // Asume que la primera hoja es la que contiene los datos
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet);

            // Limpia el mensaje de carga
            contenedor.innerHTML = '';

            if (json.length === 0) {
                contenedor.innerHTML = '<p style="color: orange;">El archivo Excel se cargó, pero no contiene datos o las columnas no son las esperadas.</p>';
                return;
            }

            json.forEach(item => {
                const ficha = document.createElement('div');
                ficha.className = 'ficha-hotel';
                ficha.innerHTML = `
                    <h2>${item.titulo || 'N/A'}</h2>
                    <div class="estrellas">${item.estrellas || 'N/A'}</div>
                    <a class="mapa" href="${item.mapa || '#'}" target="_blank">Mostrar en el mapa</a>
                    <a class="sitio-web" href="${item['sitio web'] || '#'}" target="_blank">Visitar sitio web</a>
                    <p class="descripcion">${item.descripcion || 'Sin descripción'}</p>
                    <div class="puntuacion">Puntuación: ${item.puntuacion || 'N/A'}</div>
                `;
                contenedor.appendChild(ficha);
            });
        })
        .catch(error => {
            console.error('Error al cargar o procesar el archivo Excel:', error);
            contenedor.innerHTML = `
                <p style="color: red;">
                    No se pudo cargar la información de las cabañas.
                    <br>Asegúrate de que "cabañas.xlsx" esté en la misma carpeta y que el servidor web esté funcionando.
                    <br>Detalles del error: ${error.message}
                </p>
            `;
        });
});