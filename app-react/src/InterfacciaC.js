import React, { useState, useEffect } from 'react';
import './styles/InterfacciaDA.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "./config";


const InterfacciaC = () => {
    const navigate = useNavigate();
    const [segnalazioni, setSegnalazioni] = useState([]);
    const [prenotazioni, setPrenotazioni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    
    const [sortOrderSegnalazioni, setSortOrderSegnalazioni] = useState('desc');
    const [filterTextSegnalazioni, setFilterTextSegnalazioni] = useState('');
    
    const [sortOrderPrenotazioni, setSortOrderPrenotazioni] = useState('desc');
    const [filterTextPrenotazioni, setFilterTextPrenotazioni] = useState('');
    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Utente non loggato.");
          return;
        }
    
        try {
          const response = await fetch(API_BASE_URL + "/api/auth/me", {
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
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if(!token || role != "operatore_comune"){
            navigate("/login");
        }
        const fetchData = async () => {
            setLoading(true);
            try {
                const resSegnalazioni = await fetch(API_BASE_URL + '/api/operatore_com/segnalazioni', {
                    method: "GET",
                    headers:{
                        "access-token": token,
                        "Content-Type": "application/json",
                    }
                });
                const resPrenotazioni = await fetch(API_BASE_URL + '/api/operatore_com/prenotazioni', {
                    method: "GET",
                    headers:{
                        "access-token": token,
                        "Content-Type": "application/json",
                    }
            });

                const segnalazioniData = await resSegnalazioni.json();
                const prenotazioniData = await resPrenotazioni.json();

                setSegnalazioni(segnalazioniData);
                setPrenotazioni(prenotazioniData);
            } catch (error) {
                console.error('Errore nel recupero dati:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    const sortReports = (order, reports) => {
        if (!Array.isArray(reports)) {  
            console.error("sortReports: reports is not an array", reports);
            return;
        }
        return [...reports].sort((a, b) => {
            const dateA = new Date(a.data || a.dataPrenotazione); 
            const dateB = new Date(b.data || b.dataPrenotazione); 
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });
    };

    const sortedSegnalazioni = sortReports(sortOrderSegnalazioni, segnalazioni);
    const sortedPrenotazioni = sortReports(sortOrderPrenotazioni, prenotazioni);

    const filteredSegnalazioni = sortedSegnalazioni.filter(report =>
        report.descrizione.toLowerCase().includes(filterTextSegnalazioni.toLowerCase())
    );
    const filteredPrenotazioni = sortedPrenotazioni.filter(prenotazione =>
        prenotazione.tipoSacchetto.toLowerCase().includes(filterTextPrenotazioni.toLowerCase()) ||
        prenotazione.puntoRitiro.toLowerCase().includes(filterTextPrenotazioni.toLowerCase())
    );
    return (
        <div className="container">
            <h1 className="fade-in">Trento Clean City</h1>
            <main>
                <h2 className="fade-in">Interfaccia operatore Comunale</h2>
                {loading ? <p>Caricamento dati...</p> : (
                    <>
                <h3>Segnalazioni</h3>
                <div className="controls">
                    Ordina per:
                    <select className="sort-dropdown" value={sortOrderSegnalazioni} onChange={(e) => setSortOrderSegnalazioni(e.target.value)}>
                        <option value="desc">Meno recente</option>
                        <option value="asc">Più recente</option>
                    </select>
                    <input
                        type="text"
                        className="filter-input"
                        placeholder="Filtra segnalazioni"
                        value={filterTextSegnalazioni}
                        onChange={(e) => setFilterTextSegnalazioni(e.target.value)}
                    />
                </div>
                <div className="report-list">
                    {filteredSegnalazioni.map(report => (
                        <div key={report.id} className="report-card">
                            {report.foto && <img src={report.foto} alt="Report" />}
                            <p>Data: {report.data}</p>
                            <p>Motivo: {report.descrizione}</p>
                            <p className={`status ${report.stato.toLowerCase()}`}>{report.stato}</p>
                            <button>Visualizza foto</button>
                        </div>
                    ))}
                </div>

                <h3>Prenotazioni</h3>
                <div className="controls">
                    Ordina per:
                    <select className="sort-dropdown" value={sortOrderPrenotazioni} onChange={(e) => setSortOrderPrenotazioni(e.target.value)}>
                        <option value="desc">Meno recente</option>
                        <option value="asc">Più recente</option>
                    </select>
                    <input
                        type="text"
                        className="filter-input"
                        placeholder="Filtra prenotazioni"
                        value={filterTextPrenotazioni}
                        onChange={(e) => setFilterTextPrenotazioni(e.target.value)}
                    />
                </div>
                <div className="report-list">
                    {filteredPrenotazioni.map(prenotazione => (
                        <div key={prenotazione.prenotazioneId} className="report-card">
                            <p>Data: {new Date(prenotazione.dataPrenotazione).toLocaleDateString()}</p>
                            <p>NumeroSacchetti: {prenotazione.quantita}</p>
                            <p>Tipo: {prenotazione.tipoSacchetto}</p>
                            <p>Punto di Ritiro: {prenotazione.puntoRitiro}</p>
                            <p className={`status ${prenotazione.stato.toLowerCase()}`}>{prenotazione.stato}</p>
                            <button>Visualizza dettagli</button> 
                        </div>
                    ))}
                </div>
                </>
                )}
            </main>
        </div>
    );
};

export default InterfacciaC;