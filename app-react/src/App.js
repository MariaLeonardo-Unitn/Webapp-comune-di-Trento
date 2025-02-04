import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MenuPage from './Menu'; // New menu component
import PrenotazioniPage from './PrenotazioniPage';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/menu" />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/prenotazioni" element={<PrenotazioniPage />} />
    </Routes>
  </Router>
);
}
export default App;