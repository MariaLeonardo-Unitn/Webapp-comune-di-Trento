import React, { useState } from 'react';
import './styles/Login.css'; // Import the CSS file

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [codice, setCodice] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Username: ${username}, Password: ${password}, Codice: ${codice}`);
  };

  return (
    <div>
      <h1 className="fade-in">Register</h1>
      <form id="reservation-form" className="slide-in" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <textarea
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <textarea
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="codice">Codice Operatore:</label>
        <textarea
          id="codice"
          name="codice"
          value={codice}
          onChange={(e) => setCodice(e.target.value)}
        />

        <button type="submit">Invia</button>
      </form>
    </div>
  );
}

export default Register;