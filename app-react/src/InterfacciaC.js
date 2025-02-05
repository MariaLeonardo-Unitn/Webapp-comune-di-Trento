import React, { useState } from 'react';
import './styles/InterfacciaC.css';

const InterfacciaC = () => {
  const [segnalazioni, setSegnalazioni] = useState([
    'Strada danneggiata',
    'Illuminazione non funzionante'
  ]);

  const [appuntamenti, setAppuntamenti] = useState([
    { date: '15/10/2023', time: '10:00 AM' },
    { date: '16/10/2023', time: '02:00 PM' }
  ]);

  return (
    <div className="container">
      <header>
        <h1>Interfaccia Operatore Comunale</h1>
      </header>
      <main>
        <section id="segnalazioni">
          <h2>Segnalazioni</h2>
          <ul>
            {segnalazioni.map((segnalazione, index) => (
              <li key={index}>{segnalazione}</li>
            ))}
          </ul>
        </section>
        <section id="appuntamenti">
          <h2>Gestione appuntamenti</h2>
          <ul>
            {appuntamenti.map((appuntamento, index) => (
              <li key={index}>
                Appuntamento {index + 1}: {appuntamento.date} - {appuntamento.time}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default InterfacciaC;