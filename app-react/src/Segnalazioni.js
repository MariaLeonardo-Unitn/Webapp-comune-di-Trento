import React, { useEffect } from "react";
import "./styles/Segnalazioni.css";

const Segnalazioni = () => {
  useEffect(() => {
    // Add fade-in and slide-in animations after the component mounts
    const h1Element = document.querySelector("h1");
    const formElement = document.querySelector("form");

    if (h1Element && formElement) {
      h1Element.classList.add("fade-in");
      formElement.classList.add("slide-in");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const reason = event.target.reason.value;
    const visibility = event.target.visibility.value;
    alert(`Segnalazione motivata: ${reason}. Visibilità: ${visibility}`);
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

        <button type="submit">Invia</button>
      </form>
    </div>
  );
};

export default Segnalazioni;