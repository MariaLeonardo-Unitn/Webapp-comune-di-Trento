import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

function Disposizioni() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
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
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Carica un file PDF valido.");
      setFile(null);
    }
  };

  const handleRedirect = () => {
    navigate("/interfacciaDA");
  };

  const postDisposizione = async () => {
    try {
      setErrore("");
      if (!file || !title) {
        setErrore("Inserisci sia il titolo che il file.");
        return;
      }

      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title); 

      const response = await fetch("http://localhost:5000/api/rifiuti/disposizioni", {
        method: "POST",
        headers: { "access-token": token },
        body: formData,
      });

      if (!response.ok) throw new Error("Errore durante l'upload della disposizione.");

      alert("Disposizione caricata con successo!");
      setFile(null);
      setTitle(""); 
    } catch (error) {
      setErrore(error.message);
      console.error("Errore nell'invio del file:", error);
    }
  };

  const patchDisposizione = async () => {
    try {
      setErrore("");
      if (!file) {
        setErrore("Seleziona un file per l'aggiornamento.");
        return;
      }

      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title); 


      const response = await fetch("http://localhost:5000/api/rifiuti/disposizioni", {
        method: "PATCH",
        headers: { "access-token": token },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Errore durante l'aggiornamento della disposizione.");
      }

      alert("Disposizione aggiornata con successo!");
      setFile(null);
    } catch (error) {
      setErrore(error.message);
      console.error("Errore nell'aggiornamento del file:", error);
    }
  };

  const deleteDisposizione = async () => {
    try {
      const conferma = window.confirm("Sei sicuro di voler eliminare la disposizione più vecchia?");
      if (!conferma) return;

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/rifiuti/disposizioni", {
        method: "DELETE",
        headers: { "access-token": token },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Errore durante l'eliminazione della disposizione.");
      }

      alert("Disposizione eliminata con successo!");
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

      <h1 className="fade-in">Disposizioni</h1>
      <form id="reservation-form" className="slide-in">
        <label htmlFor="title">Titolo:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          <button type="button" onClick={postDisposizione}>Crea Nuova</button>
          <button type="button" onClick={patchDisposizione}>Aggiorna</button>
          <button type="button" onClick={deleteDisposizione} style={{ backgroundColor: "red", color: "white" }}>
            Elimina
          </button>
        </div>

        {errore && <p style={{ color: "red" }}>{errore}</p>}
      </form>
    </div>
  );
}

export default Disposizioni;
