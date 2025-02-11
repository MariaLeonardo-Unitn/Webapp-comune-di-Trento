import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/Segnalazioni.css";
import API_BASE_URL from "./config";


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
    const formData = new FormData();
    const photo = event.target.photo.files[0];
    const token = localStorage.getItem("token"); 

    if (!coords.lat || !coords.lng) {
      return;
    }
    if (!token) {
        alert("Errore: utente non autenticato.");
        return;
    }
    if (!photo) {
        alert("Errore: nessuna foto selezionata.");
        return;
    }
    formData.append("foto", photo);
    formData.append("utenteId", localStorage.getItem("utenteId"));
    formData.append("lat", coords.lat);
    formData.append("lng", coords.lng);
    formData.append("descrizione", event.target.reason.value);

    try {
      const response = await fetch(API_BASE_URL + "/api/segnalazioni", {
        method: "POST",
        headers: {
          "access-token": token
        },
        body: formData
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