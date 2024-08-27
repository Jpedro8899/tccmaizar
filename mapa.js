// Inicializando o mapa
var map = L.map('map').setView([-27.05, -49.57], 12);

// Adicionando o tile layer (camada de mapa)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Função para carregar pontos do arquivo JSON
function loadPoints() {
    fetch('pontos.json')
        .then(response => response.json())
        .then(data => {
            var points = data.points;
            points.forEach(function(point) {
                var marker = L.marker(point.coords).addTo(map);
                marker.bindPopup(
                    `<b>${point.location}</b><br>` +
                    `Qualidade do ar: ${point.quality}<br>` +
                    `CO2: ${point.co2}<br>` +
                    `Temperatura: ${point.temperature}<br>` +
                    `Humidade: ${point.humidity}<br>` +
                    `Óxido de enxofre (SO2): ${point.so2}<br>` +
                    `Óxidos de nitrogênio (NOx): ${point.nox}`
                );
            });
        })
        .catch(error => console.error('Erro ao carregar pontos:', error));
}

// Carregar os pontos de medição
loadPoints();
