import React, { useState, useEffect } from 'react';
import './styles/InterfacciaDA.css';
import { useNavigate } from 'react-router-dom'; 

const Notifiche = () => {

    const navigate = useNavigate(); 

    const handleRedirect = () => {
        navigate('/mappa');
      };
    

  return (
    <div className="container">
        <button onClick={handleRedirect} class="back-button">
        <img
          src="https://cdn-icons-png.flaticon.com/128/507/507257.png"
          alt="Back to Interfaccia DA"
          style={{ width: '30px', height: '30px' }}
        />
      </button>
      <h1 className="fade-in">Trento Clean City</h1>
      <main>
        <h2 className="fade-in">Notifiche</h2>

        <div className="report-list">
          
        </div>
      </main>
    </div>
  );
};

export default Notifiche;