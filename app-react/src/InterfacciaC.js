import React, { useState, useEffect } from 'react';
import { useSegnalazioni } from './SegnalazioniContext';
import './styles/InterfacciaDA.css';

const InterfacciaC = () => {
    const { segnalazioni } = useSegnalazioni();
    const [sortOrderSegnalazioni, setSortOrderSegnalazioni] = useState('desc');
    const [filterTextSegnalazioni, setFilterTextSegnalazioni] = useState('');
    const [sortOrderPrenotazioni, setSortOrderPrenotazioni] = useState('desc');
    const [filterTextPrenotazioni, setFilterTextPrenotazioni] = useState('');
    const [prenotazioni, setPrenotazioni] = useState([]); 

    useEffect(() => {
        if (segnalazioni) {
            sortReports(sortOrderSegnalazioni, segnalazioni, setPrenotazioni);
        }
    }, [sortOrderSegnalazioni, segnalazioni]);

    useEffect(() => {
        if (prenotazioni) {
            sortReports(sortOrderPrenotazioni, prenotazioni, setPrenotazioni);
        }
    }, [sortOrderPrenotazioni, prenotazioni]);

    const sortReports = (order, reports, setReports) => {
        if (reports) { 
            const sortedReports = [...reports].sort((a, b) => {
                const dateA = new Date(a.date.split('/').reverse().join('-'));
                const dateB = new Date(b.date.split('/').reverse().join('-'));
                return order === 'asc' ? dateA - dateB : dateB - dateA;
            });
            setReports(sortedReports);
        }
    };

    const filteredSegnalazioni = segnalazioni && segnalazioni.length > 0 ?  
        segnalazioni.filter(report =>
            report.reason.toLowerCase().includes(filterTextSegnalazioni.toLowerCase()) ||
            report.location.toLowerCase().includes(filterTextSegnalazioni.toLowerCase())
        ) : []; 
    const filteredPrenotazioni = prenotazioni && prenotazioni.length > 0 ? 
        prenotazioni.filter(prenotazione =>
            prenotazione.reason.toLowerCase().includes(filterTextPrenotazioni.toLowerCase()) ||
            prenotazione.location.toLowerCase().includes(filterTextPrenotazioni.toLowerCase())
        ) : []; 
    return (
        <div className="container">
            <h1 className="fade-in">Trento Clean City</h1>
            <main>
                <h2 className="fade-in">Interfaccia operatore Comunale</h2>

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
                            {report.image && <img src={report.image} alt="Report" />}
                            <p>Data: {report.date}</p>
                            <p>Motivo: {report.reason}</p>
                            <p>Luogo: {report.location}</p>
                            <p className={`status ${report.status.toLowerCase()}`}>{report.status}</p>
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
                        <div key={prenotazione.id} className="report-card">
                            <p>Data: {prenotazione.date}</p>
                            <p>NumeroSacchetti: {prenotazione.number}</p>
                            <p>Tipo: {prenotazione.type}</p>
                            <p className={`status ${prenotazione.status.toLowerCase()}`}>{prenotazione.status}</p>
                            <button>Visualizza dettagli</button> 
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default InterfacciaC;