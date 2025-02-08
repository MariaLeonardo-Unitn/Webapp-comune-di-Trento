import React, { useState, useEffect, useContext } from 'react';
import { useSegnalazioni } from './SegnalazioniContext';
import './styles/InterfacciaDA.css';

const InterfacciaDA = () => {
  const { segnalazioni } = useSegnalazioni();
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    sortReports(sortOrder);
  }, [sortOrder, segnalazioni]);

  const sortReports = (order) => {
    const sortedReports = [...segnalazioni].sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    return sortedReports;
  };

  const filteredReports = sortReports(sortOrder).filter(report =>
    report.reason.toLowerCase().includes(filterText.toLowerCase()) ||
    report.location.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h1 className="fade-in">Trento Clean City</h1>
      </header>

      <main>
        <h2 className="fade-in">Interfaccia operatore Dolomiti Ambiente</h2>
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
          {filteredReports.map(report => (
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
      </main>
    </div>
  );
};

export default InterfacciaDA;