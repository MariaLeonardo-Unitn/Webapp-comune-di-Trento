import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/index.css'; // Assuming your CSS file is named index.css

function TrentoCleanCity() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <header>
        <h1 className="fade-in">Trento Clean City</h1>
        <p>Making Trento greener, cleaner, and better.</p>
      </header>
      <main>
        <div className="card" onClick={() => navigate('/mappa')}>
          <img src="https://cdn-icons-png.flaticon.com/128/17938/17938494.png" alt="Segnalazioni" />
          <h2>Segnalazioni</h2>
        </div>
        <div className="card" onClick={() => navigate('/prenotazioni')}>
          <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" alt="Prenotazioni" />
          <h2>Prenotazioni</h2>
        </div>
        <div className="card">
          <img src="https://cdn-icons-png.flaticon.com/128/14601/14601199.png" alt="Informazioni Raccolta" />
          <h2>Informazioni Raccolta</h2>
        </div>
      </main>
      <footer>
        <p>&copy; 2025 Trento Clean City. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default TrentoCleanCity;
