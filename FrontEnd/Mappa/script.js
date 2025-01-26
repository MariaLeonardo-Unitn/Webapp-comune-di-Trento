const map = L.map('map').setView([46.0667, 11.1333], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const centriDiRaccolta = [
  {
    nome: "Argentario",
    coord: [46.0897, 11.1212],
    indirizzo: "Via Pradiscola, 22"
  },
  {
    nome: "Mattarello",
    coord: [46.0023, 11.1361],
    indirizzo: "Via della Gotarda"
  },
  {
    nome: "Meano",
    coord: [46.1112, 11.1556],
    indirizzo: "Via Bellaria, 44/B"
  },
  {
    nome: "Povo",
    coord: [46.0605, 11.1508],
    indirizzo: "Via Castel di Pietrapiana, 8"
  },
  {
    nome: "Sopramonte",
    coord: [46.0811, 11.0974],
    indirizzo: "Via Strada di Campedél"
  }
];

centriDiRaccolta.forEach(centro => {
  L.marker(centro.coord)
    .addTo(map)
    .bindPopup(`<b>Centro di Raccolta</b><br><b>${centro.nome}</b><br>${centro.indirizzo}`);
});

map.on('click', function(e) {
  L.popup()
    .setLatLng(e.latlng)
    .setContent('<button onclick="linkPage()">Segnala</button>')
    .openOn(map);
});

function linkPage() {
  window.location.href = 'https://u87fwu.mimo.run/index.html';
}
