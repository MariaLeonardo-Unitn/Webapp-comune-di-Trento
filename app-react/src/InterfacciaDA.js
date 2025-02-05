import React, { useState, useEffect } from 'react';
import './styles/InterfacciaDA.css';

const InterfacciaDA = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      date: '01/09/2024',
      reason: 'accumulo di rifiuti',
      location: 'Via Antonio Gazzoletti',
      status: 'Completata',
      image: 'report1.jpg',
    },
    // ... other reports
  ]);

  const [sortOrder, setSortOrder] = useState('desc');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    sortReports(sortOrder);
  }, [sortOrder]);

  const sortReports = (order) => {
    const sortedReports = [...reports].sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('-'));
      const dateB = new Date(b.date.split('/').reverse().join('-'));
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setReports(sortedReports);
  };

  const filteredReports = reports.filter(report =>
    report.reason.toLowerCase().includes(filterText.toLowerCase()) ||
    report.location.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h1>Trento Clean City</h1>
        <div className="top-right-icons">
          <img src="https://cdn-icons-png.flaticon.com/128/2014/2014826.png" alt="Language" id="languageIcon" />
          <img src="https://cdn-icons-png.flaticon.com/128/1077/1077012.png" alt="Login" id="loginIcon" />
        </div>
      </header>

      <main>
        <h2>Interfaccia operatore Dolomiti Ambiente</h2>
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
              <img src={report.image} alt="Report" />
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