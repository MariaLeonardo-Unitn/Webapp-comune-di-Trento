import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MenuPage from './Menu'; // New menu component
import PrenotazioniPage from './PrenotazioniPage';
import Homepage from './Homepage'; // Import Homepage
import Login from './Login'; // Import Login component
import Mappa from './Mappa'; // Import Mappa component
import Segnalazioni from './Segnalazioni'; // Import Mappa component
import Register from './Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Set Homepage as the default route */}
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/mappa" element={<Mappa />} />
        <Route path="/segnalazioni" element={<Segnalazioni />} />
        <Route path="/prenotazioni" element={<PrenotazioniPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> {/* Add route for Login */}
      </Routes>
    </Router>
  );
}

export default App;
