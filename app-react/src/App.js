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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Set Homepage as the default route */}
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/mappa" element={<Mappa />} />
        <Route path="/segnalazioni" element={<Segnalazioni />} />
        <Route path="/segnalazionianonime" element={<SegnalazioniAnonime />} />
        <Route path="/prenotazioni" element={<PrenotazioniPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/interfacciaDA" element={<InterfacciaDA />} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </Router>
  );
}

export default App;
