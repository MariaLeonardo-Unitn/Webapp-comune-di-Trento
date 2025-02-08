import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useSegnalazioni } from './SegnalazioniContext';
import './styles/Segnalazioni.css';

const SegnalazioniAnonime = () => {
  const location = useLocation();
  const { addSegnalazione } = useSegnalazioni();
  const coordinates = location.state?.coordinates;

  useEffect(() => {
    const h1Element = document.querySelector('h1');
    const formElement = document.querySelector('form');

    if (h1Element && formElement) {
      h1Element.classList.add('fade-in');
      formElement.classList.add('slide-in');
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const reason = event.target.reason.value;
    const visibility = event.target.visibility.value;
    const photo = event.target.photo.files[0];

    const newSegnalazione = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      reason,
      location: coordinates ? `Lat: ${coordinates.lat}, Lng: ${coordinates.lng}` : 'N/A',
      status: 'In attesa',
      image: photo ? URL.createObjectURL(photo) : null,
    };

    addSegnalazione(newSegnalazione);
    alert('Segnalazione inviata con successo!');
  };

  return (
    <div className="segnalazioni-container">
      <h1>Segnalazioni</h1>
      <form id="reservation-form" onSubmit={handleSubmit}>
        <label htmlFor="reason">Motivo Segnalazione:</label>
        <textarea id="reason" name="reason" required></textarea>

        <label htmlFor="visibility">Pubblica o Privata:</label>
        <select id="visibility" name="visibility" required>
          <option value="pubblica">Pubblica</option>
          <option value="privata">Privata</option>
        </select>

        <label htmlFor="photo">Carica una fotografia:</label>
        <input type="file" id="photo" name="photo" accept="image/*" />

        <button type="submit">Invia</button>
      </form>
    </div>
  );
};

export default SegnalazioniAnonime;