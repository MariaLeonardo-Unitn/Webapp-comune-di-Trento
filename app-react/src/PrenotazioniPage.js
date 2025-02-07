import React, { useState, useEffect } from 'react';
import './styles/Prenotazioni_index.css'; // Importing the CSS file
function PrenotazioniPage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    quantity: "",
    puntoRitiro: "centro",
    bagType: "secco"
  });

  const fetchUser = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Utente non loggato.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
      .then(data => console.log("Dati utente:", data))
      .catch(error => console.error("Errore:", error));

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        alert("Errore nel recupero dei dati dell'utente.");
      }
    } catch (error) {
      console.error("Errore durante la richiesta:", error);
      alert("Errore nella comunicazione con il server.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      date: formData.date,
      quantity: formData.quantity,
      puntoRitiro: formData.puntoRitiro,
      bagType: formData.bagType
    };
    const response = await fetch("http://localhost:5000/api/prenotazioni", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      alert("Prenotazione effettuata con successo!");
      setFormData({date: "", quantity: "", puntoRitiro: "centro", bagType: "secco" }); // Resetta il form
    } else {
      alert("Errore nell'invio della prenotazione");
    }
  };

  if (!user) {
    return <div>Caricamento...</div>;
  }

  return (
    <>
      <div> 
        <h1 className="fade-in">Prenotazioni</h1>
        <form id="reservation-form" className="fade-in" onSubmit={handleSubmit}>
          <label htmlFor="date">Data Prenotazione:</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
          <label htmlFor="quantity">Numero di sacchetti:</label>
          <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
          <label htmlFor="punto-ritiro">Punto di ritiro</label>
          <select id="punto-ritiro" name="punto-ritiro" value={formData.puntoDiRitiro} onChange={handleChange} required>
            <option value="centro">Trento Centro</option>
            <option value="cristore">Cristo Re</option>
            <option value="tangenziale">Tangenziale</option>
          </select>
          <label htmlFor="bag-type">Tipo:</label>
          <select id="bag-type" name="bag-type" value={formData.bagType} onChange={handleChange} required>
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