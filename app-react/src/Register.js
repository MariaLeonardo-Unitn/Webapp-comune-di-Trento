import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css'; 
import API_BASE_URL from "./config";


function Register() {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [codiceFiscale, setCodiceFiscale] = useState('');
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [role, setRole] = useState('cittadino');
  const [secret_token, setSecretToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      nome,
      cognome,
      email,
      password,
      codiceFiscale,
      role,
      ...(role !== 'cittadino' && { secret_token }) 
    };

    try {
      const response = await fetch(API_BASE_URL + '/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registrazione avvenuta con successo!");

        setNome('');
        setCognome('');
        setCodiceFiscale('');
        setEmail('');
        setPassword('');
        setRole('cittadino');
        setSecretToken('');

        handleLogin({ email, password });
      } else {
        setMessage(`Errore: ${data.error || 'Registrazione fallita'}`);
        alert("Registrazione fallita");
      }
    } catch (error) {
      setMessage('Errore di connessione al server.');
      console.error('Errore:', error);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch(API_BASE_URL + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Errore di login");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("utenteId", data.utenteId);

        if (data.role === "operatore_Dolomiti") {
          navigate("/interfacciaDA");
        } else if (data.role === "operatore_comune") {
          navigate("/interfacciaC");
        } else {
          navigate("/menu");
        }
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      setMessage("Errore di login dopo la registrazione.");
    }
  };

  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };

  return (
    <div>
      <h1 className="fade-in">Registrati</h1>
      <form id="reservation-form" className="slide-in" onSubmit={handleSubmit}>
      
        <label htmlFor="nome">Nome:</label>
        <input
          id="nome"
          name="nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <label htmlFor="cognome">Cognome:</label>
        <input
          id="cognome"
          name="cognome"
          type="text"
          value={cognome}
          onChange={(e) => setCognome(e.target.value)}
          required
        />
        <label htmlFor="codiceFiscale">Codice Fiscale:</label>
        <input
          id="codiceFiscale"
          name="codiceFiscale"
          type="text"
          value={codiceFiscale}
          onChange={(e) => setCodiceFiscale(e.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="role">Seleziona il tuo ruolo:</label>
        <select id="role" name="role" value={role} onChange={handleChangeRole} required>
          <option value="cittadino">Cittadino</option>
          <option value="operatore_Dolomiti">Operatore Dolomiti Ambiente</option>
          <option value="operatore_comune">Operatore comunale</option>
        </select>

        {role === 'operatore_Dolomiti' || role === 'operatore_comune' ? (
          <>
            <label htmlFor="secret_token">Codice Operatore:</label>
            <input
              id="secret_token"
              name="secret_token"
              type="text"
              value={secret_token}
              onChange={(e) => setSecretToken(e.target.value)}
            />
          </>
        ) : null}

        <button type="submit">Invia</button>
      </form>
    </div>
  );
}

export default Register;
