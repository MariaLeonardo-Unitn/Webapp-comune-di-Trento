import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SegnalazioniProvider } from './SegnalazioniContext';
import MenuPage from './Menu'; 
import PrenotazioniPage from './PrenotazioniPage';
import Homepage from './Homepage'; 
import Login from './Login'; 
import Mappa from './Mappa'; 
import Segnalazioni from './Segnalazioni'; 
import SegnalazioniAnonime from './SegnalazioniAnonime'; 
import Register from './Register';
import InterfacciaDA from './InterfacciaDA';
import InterfacciaC from './InterfacciaC';
import Disposizioni from './Disposizioni';
import Calendari from './Calendari';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/mappa" element={<Mappa />} />
          <Route path="/segnalazioni" element={<Segnalazioni />} />
          <Route path="/segnalazionianonime" element={<SegnalazioniAnonime />} />
          <Route path="/prenotazioni" element={<PrenotazioniPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/interfacciaDA" element={<InterfacciaDA />} />
          <Route path="/interfacciaC" element={<InterfacciaC />} /> {/* Ora può accedere a useSegnalazioni */}
          <Route path="/login" element={<Login />} /> 
          <Route path="/disposizioni" element={<Disposizioni />} /> 
          <Route path="/calendari" element={<Calendari />} /> 
        </Routes>
      </Router>
  );
}

export default App;