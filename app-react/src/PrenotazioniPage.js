import React from 'react';
import './styles/Prenotazioni_index.css'; 
import { useNavigate } from 'react-router-dom';

function PrenotazioniPage() {

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/menu');
  };

  return (
      <div> 
      <button onClick={handleRedirect} class="back-button">
        <img
          src="https://cdn-icons-png.flaticon.com/128/507/507257.png"
          alt="Back to Interfaccia DA"
          style={{ width: '30px', height: '30px' }}
        />
      </button>
        <h1 className="fade-in">Prenotazioni</h1>
        <form id="reservation-form" className="fade-in">
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="date">Data Prenotazione:</label>
          <input type="date" id="date" name="date" required />
          <label htmlFor="quantity">Numero di sacchetti:</label>
          <input type="number" id="quantity" name="quantity" required />
          <label htmlFor="bag-type">Tipo:</label>
          <select id="bag-type" name="bag-type" required>
            <option value="secco">Secco</option>
            <option value="umido">Umido</option>
            <option value="plastica">Plastica</option>
          </select>
          <button type="submit">Prenota</button>
        </form>
      </div>
  );
}
export default PrenotazioniPage;