import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/Homepage.css'; // Import the CSS file

// Fix for Leaflet marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default Leaflet marker icons
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
  shadowSize: [41, 41], // Size of the shadow
});

L.Marker.prototype.options.icon = DefaultIcon; // Set default icon

function Homepage() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Initialize the map when the component mounts
  useEffect(() => {
    const map = L.map('map').setView([46.0667, 11.1333], 12); // Coordinates for Trento, Italy

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Define the centriDiRaccolta data
    const centriDiRaccolta = [
      {
        nome: "Argentario",
        coord: [46.0897, 11.1212],
        indirizzo: "Via Pradiscola, 22",
      },
      {
        nome: "Mattarello",
        coord: [46.0023, 11.1361],
        indirizzo: "Via della Gotarda",
      },
      {
        nome: "Meano",
        coord: [46.1112, 11.1556],
        indirizzo: "Via Bellaria, 44/B",
      },
      {
        nome: "Povo",
        coord: [46.0605, 11.1508],
        indirizzo: "Via Castel di Pietrapiana, 8",
      },
      {
        nome: "Sopramonte",
        coord: [46.0811, 11.0974],
        indirizzo: "Via Strada di Campedél",
      },
    ];

    // Add markers for each centro di raccolta
    centriDiRaccolta.forEach((centro) => {
      L.marker(centro.coord)
        .addTo(map)
        .bindPopup(`<b>Centro di Raccolta</b><br><b>${centro.nome}</b><br>${centro.indirizzo}`);
    });

    // Handle map clicks to show a popup with a button
    map.on('click', function (e) {
      L.popup()
        .setLatLng(e.latlng)
        .setContent('<button onclick="window.location.href=\'/report\'">Segnala</button>')
        .openOn(map);
    });

    // Cleanup the map when the component unmounts
    return () => {
      map.remove();
    };
  }, []);

  // Event handlers for the icons
  const handleVerdeClick = () => {
    navigate('/menu'); // Redirect to the menu page
  };

  const handleLanguageClick = () => {
    alert('Change language');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div>
      {/* Title */}
      <div className="page-title">
        <h1 className="page-title">Trento Clean City</h1>
      </div>

      {/* Map */}
      <div id="map"></div>

      {/* Top-left icons */}
      <div className="top-left-icons">
        <img
          src="https://cdn-icons-png.flaticon.com/128/6015/6015685.png"
          alt="Menu"
          id="verdeButton"
          onClick={handleVerdeClick}
        />
      </div>

      {/* Top-right icons */}
      <div className="top-right-icons">
        <img
          src="https://cdn-icons-png.flaticon.com/128/2014/2014826.png"
          alt="Language"
          id="languageIcon"
          onClick={handleLanguageClick}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/128/1077/1077012.png"
          alt="Login"
          id="loginIcon"
          onClick={handleLoginClick}
        />
      </div>

      {/* Footer */}
      <footer>
        <p>Footer content</p>
      </footer>
    </div>
  );
}

export default Homepage;