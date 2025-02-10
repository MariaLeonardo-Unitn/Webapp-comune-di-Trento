import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './styles/Login.css';

function CalendariUtente() {
  const [zona, setZona] = useState('');
  const navigate = useNavigate(); 

  const handleRedirect = () => {
    navigate('/menu');
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const DownloadCalendari = async (e) => {
    e.preventDefault(); 
    try {
      const token = localStorage.getItem("token");
      if (!zona) {
        alert("Inserisci una zona");
        return;
      }

      const response = await fetch("http://localhost:5000/api/rifiuti/calendari/" + zona, {
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
        link.download = filename || `calendario-${zona}.pdf`; 
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
    <div>
      <button onClick={handleRedirect} className="back-button">
        <img
          src="https://cdn-icons-png.flaticon.com/128/507/507257.png"
          alt="Back to menu"
          style={{ width: '30px', height: '30px' }}
        />
      </button>

      <h1 className="fade-in">Calendari</h1>
      <form id="reservation-form" className="slide-in" onSubmit={DownloadCalendari}>
        <label htmlFor="zona">Zona:</label>
        <textarea
          id="zona"
          name="zona"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          required
        />

        <button type="submit">Invia</button>
      </form>
    </div>
  );
}

export default CalendariUtente;
