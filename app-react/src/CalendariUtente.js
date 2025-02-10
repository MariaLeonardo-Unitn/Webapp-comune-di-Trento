import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './styles/Login.css';

function CalendariUtente() {
  const [zona, setZona] = useState('');
  const navigate = useNavigate(); 

  const handleRedirect = () => {
    navigate('/menu');
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <button onClick={handleRedirect} class="back-button">
        <img
          src="https://cdn-icons-png.flaticon.com/128/507/507257.png"
          alt="Back to menu"
          style={{ width: '30px', height: '30px' }}
        />
      </button>

      <h1 className="fade-in">Calendari</h1>
      <form id="reservation-form" className="slide-in" >
        <label htmlFor="zona">Zona:</label>
        <textarea
          id="zona"
          name="zona"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
          required
        />

        <button type="submit">Invia</button>
      </form>
    </div>
  );
}

export default CalendariUtente;