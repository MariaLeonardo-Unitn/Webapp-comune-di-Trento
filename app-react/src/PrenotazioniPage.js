import React from 'react';
import './styles/Prenotazioni_index.css'; // Importing the CSS file
function PrenotazioniPage() {
  return (
    <>
      <div> 
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
    </>
  );
}
export default PrenotazioniPage;