import React, { useState } from 'react';
import './styles/Login.css'; // Import the CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = { username, password };
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      console.log("Risposta ricevuta:", data);
      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        alert("Login effettuato con successo!");
        window.location.href = "/menu";
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Errore nel login.");
      }
    } catch (error) {
      console.error("Errore durante la richiesta:", error);
      setErrorMessage("Errore nella comunicazione con il server.");
    }
  };

  return (
    <div>
      <h1 className="fade-in">Login</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form id="login-form" className="slide-in" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Invia</button>
      </form>
    </div>
  );
}

export default Login;