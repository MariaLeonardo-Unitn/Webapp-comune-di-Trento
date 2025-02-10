import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Notifiche from './Notifiche';
import CalendariUtente from './CalendariUtente';

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
        <Route path="/interfacciaC" element={<InterfacciaC />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/disposizioni" element={<Disposizioni />} /> 
        <Route path="/notifiche" element={<Notifiche />} /> 
        <Route path="/calendari" element={<Calendari />} /> 
        <Route path="/calendariutente" element={<CalendariUtente />} />
      </Routes>
    </Router>
  );
}

export default App;