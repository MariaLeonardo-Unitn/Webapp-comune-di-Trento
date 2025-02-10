import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/index.css';

function TrentoCleanCity() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);


  const DownloadDisposizioni = async (e) => {
    e.preventDefault(); 
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/rifiuti/disposizioni/", {
        method: "GET",
        headers: {
          "access-token": token,
        },
      });

      if (response.ok) {
        const contentDisposition = response.headers.get('Content-Disposition');
        const filename = contentDisposition && contentDisposition.split('filename=')[1];

        const blob = await response.blob();
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename || "disposzione.pdf"; 
        link.click();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Errore durante il download del calendario.");
      }
    } catch (error) {
      alert("Errore durante il download.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="fade-in">Trento Clean City</h1>
      <p>Making Trento greener, cleaner, and better.</p>

      <div className="card-container"> 
        <div className="card" onClick={() => navigate('/mappa')}>
          <img src="https://cdn-icons-png.flaticon.com/128/17938/17938494.png" alt="Segnalazioni" />
          <h2>Segnalazioni</h2>
        </div>
        <div className="card" onClick={() => navigate('/prenotazioni')}>
          <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" alt="Prenotazioni" />
          <h2>Prenotazioni</h2>
        </div>
        <div className="card" onClick={() => navigate('/calendariutente')}>
          <img src="https://cdn-icons-png.flaticon.com/128/3634/3634595.png" alt="Informazioni Raccolta" />
          <h2>Calendari</h2>
        </div>
        <div className="card" onClick={(e) => DownloadDisposizioni(e)}>
          <img src="https://cdn-icons-png.flaticon.com/128/14601/14601199.png" alt="Informazioni Raccolta" />
          <h2>Disposizioni</h2>
        </div>
      </div> 

      <p>&copy; 2025 Trento Clean City. All rights reserved.</p>

    </div>
  );
}

export default TrentoCleanCity;