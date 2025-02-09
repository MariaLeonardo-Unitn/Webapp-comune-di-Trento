import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/Homepage.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerIconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function Homepage() {
  const navigate = useNavigate();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  useEffect(() => {
    const map = L.map('map').setView([46.0667, 11.1333], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

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

    centriDiRaccolta.forEach((centro) => {
      L.marker(centro.coord)
        .addTo(map)
        .bindPopup(`<b>Centro di Raccolta</b><br><b>${centro.nome}</b><br>${centro.indirizzo}`);
    });

    map.on('click', function (e) {
      const button = document.createElement('button');
      button.textContent = 'Segnala';
      button.style.cursor = 'pointer'; 
    
      button.addEventListener('click', () => {
        navigate('/segnalazionianonime', { state: { coords: e.latlng } });
      });
    
      const container = document.createElement('div');
      container.appendChild(button);
    
      L.popup()
        .setLatLng(e.latlng)
        .setContent(container)
        .openOn(map);
    });

    return () => {
      map.remove();
    };
  }, [navigate]);

  const handleVerdeClick = () => {
    navigate('/register');
  };

  const handleLanguageClick = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLanguageSelect = (language) => {
    setShowLanguageDropdown(false);
    alert(`Language changed to ${language}`);
  };

  return (
    <div className="container">
      <div className="page-title">
        <h1 className="fade-in">Trento Clean City Homepage</h1>
      </div>

      <div id="map"></div>

      <div className="top-left-icons">
        <img
          src="https://cdn-icons-png.flaticon.com/128/1672/1672225.png"
          alt="Menu"
          id="verdeButton"
          onClick={handleVerdeClick}
          style={{ width: '40px', height: '40px' }}
        />
        <p>Registrati</p>
      </div>

      <div className="top-right-icons">
        <div className="icon-container">
          <img
            src="https://cdn-icons-png.flaticon.com/128/2014/2014826.png"
            alt="Language"
            id="languageIcon"
            onClick={handleLanguageClick}
            style={{ width: '40px', height: '40px' }}
          />
          <p>Seleziona Lingua</p>
          {showLanguageDropdown && (
            <div className="language-dropdown">
              <button onClick={() => handleLanguageSelect('Italiano')}>Italiano</button>
              <button onClick={() => handleLanguageSelect('English')}>English</button>
            </div>
          )}
        </div>
        <div className="icon-container">
          <img
            src="https://cdn-icons-png.flaticon.com/128/1077/1077012.png"
            alt="Login"
            id="loginIcon"
            onClick={handleLoginClick}
            style={{ width: '40px', height: '40px' }}
          />
          <p>Login</p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;