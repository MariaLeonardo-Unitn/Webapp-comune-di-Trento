import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/Mappa.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "./config";


const Mappa = () => {
  const navigate = useNavigate();
  const [coords, setCoords] = useState(null);

  useEffect(() => {
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

    map.on('click', function (e) {
      const button = document.createElement('button');
      button.textContent = 'Segnala';
      button.style.cursor = 'pointer'; 
    
      button.addEventListener('click', () => {
        navigate('/segnalazioni', { state: { coords: e.latlng } });
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

  const handleRedirect = () => {
    navigate('/menu');
  };

  return (
    <div className>
      <button onClick={handleRedirect} class="back-button">
        <img
          src="https://cdn-icons-png.flaticon.com/128/507/507257.png"
          alt="Back to Interfaccia DA"
          style={{ width: '30px', height: '30px' }}
        />
      </button>
      <h1 className="fade-in">Mappa per Segnalazioni Utente</h1>
      <div id="map"></div>
    </div>
  );
};

export default Mappa;