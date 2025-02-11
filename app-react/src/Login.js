import React, { useState } from 'react';
import './styles/Login.css'; 
import API_BASE_URL from "./config";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(""); 

    const credentials = { email: username, password: password };

    try {
      const response = await fetch(API_BASE_URL + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`Errore: ${response.status} ${response.statusText}`);
      }

      const data = await response.json(); 

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("utenteId", data.utenteId);
        alert("Login effettuato con successo!");
      
        if (data.role === "operatore_Dolomiti") 
          window.location.href = "/interfacciaDA";
        if (data.role === "operatore_comune") 
          window.location.href = "/interfacciaC";        
        if (data.role === "cittadino") 
          window.location.href = "/menu";      
      } else 
        throw new Error("Token non ricevuto");
    } catch (error) {
      console.error("Errore durante la richiesta:", error);
      setErrorMessage("Credenziali errate o problema di connessione.");
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
