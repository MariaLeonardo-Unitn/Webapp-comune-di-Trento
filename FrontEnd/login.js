// Esempio di richiesta di login e salvataggio del token
fetch('http://localhost:3000/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: 'admin', password: 'password' })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Salva il token nel localStorage
      localStorage.setItem('authToken', data.token);
      console.log('Token salvato:', data.token);
    } else {
      console.error('Login fallito:', data.message);
    }
  })
  .catch(error => console.error('Errore:', error));
  