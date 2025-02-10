import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./styles/Login.css";

function Calendari() {
  const [zona, setZona] = useState("");
  const [file, setFile] = useState(null);
  const [errore, setErrore] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "operatore_Dolomiti") {
      navigate("/login");
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRedirect = () => {
    navigate('/interfacciaDA');
  };

  const postCalendario = async () => {
    try {
      setErrore("");
      if (!file || !zona) {
        setErrore("Compila tutti i campi!");
        return;
      }

      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:5000/api/rifiuti/calendari/" + zona, {
        method: "POST",
        headers: { "access-token": token },
        body: formData,
      });

      if (!response.ok) throw new Error("Errore durante l'upload del file");

      alert("Calendario creato con successo!");
    } catch (error) {
      setErrore(error.message);
      console.error("Errore nell'invio del file:", error);
    }
  };

  const patchCalendario = async () => {
    try {
      setErrore("");
      if (!file || !zona) {
        setErrore("Compila tutti i campi!");
        return;
      }

      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:5000/api/rifiuti/calendari/" + zona, {
        method: "PATCH",
        headers: { "access-token": token },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Errore durante l'aggiornamento del file");
      }

      alert("Calendario aggiornato con successo!");
    } catch (error) {
      setErrore(error.message);
      console.error("Errore nell'aggiornamento del file:", error);
    }
  };

  const deleteCalendario = async () => {
    try {
      if (!zona) {
        setErrore("Specifica una zona per eliminare il calendario!");
        return;
      }

      const conferma = window.confirm("Sei sicuro di voler eliminare il calendario?");
      if (!conferma) return;

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/rifiuti/calendari/" + zona, {
        method: "DELETE",
        headers: { "access-token": token },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Errore durante l'eliminazione del file");
      }

      alert("Calendario eliminato con successo!");
      setZona(""); 
    } catch (error) {
      setErrore(error.message);
      console.error("Errore nell'eliminazione del file:", error);
    }
  };

  return (
    <div>
      <button onClick={handleRedirect} className="back-button">
        <img
          src="https://cdn-icons-png.flaticon.com/128/507/507257.png"
          alt="Back to Interfaccia DA"
          style={{ width: "30px", height: "30px" }}
        />
      </button>

      <h1 className="fade-in">Calendari</h1>
      <form id="reservation-form" className="slide-in">
        <label htmlFor="zona">Zona:</label>
        <textarea
          id="zona"
          name="zona"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          required
        />

        <label htmlFor="file">Upload PDF:</label>
        <input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />

        <div className="button-group">
          <button type="button" onClick={postCalendario}>Crea Nuovo</button>
          <button type="button" onClick={patchCalendario}>Aggiorna</button>
          <button type="button" onClick={deleteCalendario} style={{ backgroundColor: "red", color: "white" }}>
            Elimina
          </button>
        </div>

        {errore && <p style={{ color: "red" }}>{errore}</p>}
      </form>
    </div>
  );
}

export default Calendari;
