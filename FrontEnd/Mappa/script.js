var map = L.map('map').setView([46.0679, 11.1217], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.on('click', function(e) {
  var popup = L.popup()
    .setLatLng(e.latlng)
    .setContent('<button onclick="linkPage()">Segnala</button>')
    .openOn(map);
});

function linkPage() {
  window.location.href = 'https://u87fwu.mimo.run/index.html';
}
