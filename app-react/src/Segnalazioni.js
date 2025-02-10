import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/Segnalazioni.css";

const Segnalazioni = () => {
  const location = useLocation();
  const coords = location.state?.coords;
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const h1Element = document.querySelector("h1");
    const formElement = document.querySelector("form");

    if (h1Element && formElement) {
      h1Element.classList.add("fade-in");
      formElement.classList.add("slide-in");
    }
  }, []);
  if (!coords || !coords.lat || !coords.lng) {
    return <div>Posizione non disponibile. Si prega di selezionare una posizione sulla mappa.</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const reason = event.target.reason.value;
    const photo = event.target.photo.files[0]; 

    if (photo) {
      alert(`Segnalazione motivata: ${reason}.  Foto: ${photo.name}`);
    } else {
      alert(`Segnalazione motivata: ${reason}.  Nessuna foto caricata.`);
    }
  };

  return (
    <div className="segnalazioni-container">
      <h1>Segnalazioni</h1>
      <form id="reservation-form" onSubmit={handleSubmit}>
        <label htmlFor="reason">Motivo Segnalazione:</label>
        <input id="reason" name="reason" required/>

        <label htmlFor="photo">Carica una fotografia :</label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*" 
          required
        />

        <button type="submit">Invia</button>
      </form>
    </div>
  );
};

export default Segnalazioni;