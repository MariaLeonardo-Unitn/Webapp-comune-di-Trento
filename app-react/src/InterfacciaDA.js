import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useSegnalazioni } from "./SegnalazioniContext";
import "./styles/InterfacciaDA.css";

const InterfacciaDA = () => {
  const navigate = useNavigate();
  const { segnalazioni, setSegnalazioni } = useSegnalazioni();
  const [sortOrder, setSortOrder] = useState("desc");
  const [showDropdown, setShowDropdown] = useState(false); 
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "operatore_Dolomiti") {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchSegnalazioni();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  const handleRedirect = (path) => {
    navigate(path);
    setShowDropdown(false); 
  };




  const fetchSegnalazioni = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/operatore_dol/segnalazioni", {
        method: "GET",
        headers: {
          "access-token": token,
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) throw new Error("Errore nel recupero delle segnalazioni");
      const data = await response.json();
      setSegnalazioni(data); 
    } catch (error) {
      console.error("Errore nel recupero delle segnalazioni:", error);
    }
  };

  const patchSegnalazione = async (segnalazioneId, nuovoStato) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/operatore_dol/segnalazioni/" + segnalazioneId, {
        method: "PATCH",
        headers: {
          "access-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stato: nuovoStato }),
      });

      if (!response.ok) throw new Error("Errore nell'aggiornamento dello stato");

      const updatedSegnalazione = await response.json();
      setSegnalazioni(prevSegnalazioni => 
        prevSegnalazioni.map(segnalazione => 
          segnalazione.segnalazioneId === segnalazioneId 
            ? { ...segnalazione, stato: nuovoStato } 
            : segnalazione
        )
      );
    } catch (error) {
      console.error("Errore aggiornamento stato:", error);
    }
  };

  const deleteSegnalazione = async (segnalazioneId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/operatore_dol/segnalazioni/" + segnalazioneId, {
        method: "DELETE",
        headers: {
          "access-token": token,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) throw new Error("Errore nella cancellazione della segnalazione");
  
      console.log(`Segnalazione con ID ${segnalazioneId} eliminata con successo`);
  
      setSegnalazioni(prevSegnalazioni => 
        prevSegnalazioni.filter(segnalazione => segnalazione.segnalazioneId !== segnalazioneId)
      );
    } catch (error) {
      console.error("Errore nell'eliminazione della segnalazione:", error);
    }
  };
  

  return (
    <div className="container">
      <h1 className="fade-in">Trento Clean City</h1>
      <main>
        <h2 className="fade-in">Interfaccia operatore Dolomiti Ambiente</h2>

        <div className="top-right-icons">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3652/3652267.png"
            alt="Disposizioni e Calendari"
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={() => handleRedirect('/disposizioni')}>Disposizioni</button>
              <button onClick={() => handleRedirect('/calendari')}>Calendari</button>
            </div>
          )}
        </div>

        <div className="controls">
          Ordina per:
          <select className="sort-dropdown" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">Meno recente</option>
            <option value="asc">Più recente</option>
          </select>
          <input
            type="text"
            className="filter-input"
            placeholder="Filtra"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        <div className="report-list">
          {segnalazioni.length === 0 ? (
            <p>Nessuna segnalazione disponibile.</p>
          ) : (
            segnalazioni
              .filter((report) => {
                const descrizione = report.descrizione || '';  
                const luogo = report.luogo || ''; 
                return (
                  descrizione.toLowerCase().includes(filterText.toLowerCase()) ||
                  luogo.toLowerCase().includes(filterText.toLowerCase())
                );
              })
              .sort((a, b) => (sortOrder === 'asc' ? new Date(a.data) - new Date(b.data) : new Date(b.data) - new Date(a.data)))
              .map((report) => {
                
                return (
                  <div key={report.segnalazioneId} className="report-card">
                    {report.foto && <img src={report.foto} alt="Segnalazione" />}
                    <p>Data: {new Date(report.data).toLocaleString()}</p>
                    <p>Descrizione: {report.descrizione}</p>
                    <p>Luogo: {report.luogo}</p>
                    <p className={`status ${report.stato.toLowerCase()}`}>{report.stato}</p>
                    <select onChange={(e) => {
                      patchSegnalazione(report.segnalazioneId, e.target.value);
                    }}>
                      <option value="attiva">Attiva</option>
                      <option value="presa in carico">Presa in carico</option>
                      <option value="completata">Completata</option>
                    </select>
                    <button onClick={() => deleteSegnalazione(report.segnalazioneId)}>Elimina</button>
                  </div>
                );
              })
          )}
        </div>

      </main>
    </div>
  );
};

export default InterfacciaDA;
