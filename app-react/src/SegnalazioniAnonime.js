import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './styles/Segnalazioni.css';

const SegnalazioniAnonime = () => {
  const location = useLocation();
  const coords = location.state?.coordinates;
  useEffect(() => {
    const h1Element = document.querySelector('h1');
    const formElement = document.querySelector('form');

    if (h1Element && formElement) {
      h1Element.classList.add('fade-in');
      formElement.classList.add('slide-in');
    }
  }, []);
  if (!coords || !coords.lat || !coords.lng) {
    return <div>Posizione non disponibile. Si prega di selezionare una posizione sulla mappa.</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const reason = event.target.reason.value;
    const photo = event.target.photo.files[0];
    if (!coords || !coords.lat || !coords.lng) {
      alert("Errore: Nessuna posizione selezionata.");
      return;
    }
    formData.append("reason", reason);
    formData.append("lat", coords.lat);
    formData.append("lng", coords.lng);
    if(!photo){
      alert("Foto mancante, inserisci foto");
      return;
    }
    formData.append("photo", photo);
    try {
      const response = await fetch("http://localhost:5000/api/segnalazioni", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        alert(`Segnalazione inviata con successo!`);
      } else {
        alert("Errore nell'invio della segnalazione.");
      }
    } catch (error) {
      console.error("Errore:", error);
      alert("Errore di connessione con il server.");
    }
  };

  return (
    <div className="segnalazioni-container">
      <h1>Segnalazioni</h1>
      <form id="reservation-form" onSubmit={handleSubmit}>
        <label htmlFor="reason">Motivo Segnalazione:</label>
        <input id="reason" name="reason" required/>

        <label htmlFor="photo">Carica una fotografia:</label>
        <input type="file" id="photo" name="photo" accept="image/*" required/>

        <button type="submit">Invia</button>
      </form>
    </div>
  );
};

export default SegnalazioniAnonime;