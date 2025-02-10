import React, { useState, useEffect } from 'react';
import './styles/Prenotazioni_index.css'; // Importing the CSS file
import { useNavigate } from 'react-router-dom';
function PrenotazioniPage() {
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

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    quantity: "",
    puntoRitiro: "Trento Centro",
    bagType: "secco"
  });

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Utente non loggato.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          "access-token": token,
          "Content-Type": "application/json",
        },
      });
      console.log('Token inviato:', localStorage.getItem('token'));
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Errore nel recupero dei dati dell'utente.");
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
      tipoSacchetto: formData.bagType,
      quantita: formData.quantity,
      dataPrenotazione: formData.date,
      puntoRitiro: formData.puntoRitiro
    };
    const response = await fetch("http://localhost:5000/api/prenotazione", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'access-token': localStorage.getItem('token')
      },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      alert("Prenotazione effettuata con successo!");
      setFormData({date: "", quantity: "", puntoRitiro: "Trento Centro", bagType: "secco" }); // Resetta il form
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
      <button onClick={handleRedirect} class="back-button">
        <img
          src="https://cdn-icons-png.flaticon.com/128/507/507257.png"
          alt="Back to Interfaccia DA"
          style={{ width: '30px', height: '30px' }}
        />
      </button>
        <h1 className="fade-in">Prenotazioni</h1>
        <form id="reservation-form" className="fade-in" onSubmit={handleSubmit}>
          <label htmlFor="date">Data Prenotazione:</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
          <label htmlFor="quantity">Numero di sacchetti:</label>
          <input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
          <label htmlFor="puntoRitiro">Punto di ritiro</label>
          <select id="puntoRitiro" name="puntoRitiro" value={formData.puntoRitiro} onChange={handleChange} required>
            <option value="Trento Centro">Trento Centro</option>
            <option value="Cristo Re">Cristo Re</option>
            <option value="Tangenziale">Tangenziale</option>
          </select>
          <label htmlFor="bagType">Tipo:</label>
          <select id="bagType" name="bagType" value={formData.bagType} onChange={handleChange} required>
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