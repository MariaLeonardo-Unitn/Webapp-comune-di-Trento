document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene il comportamento predefinito del form

    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed: ' + response.statusText);
        }
        return response.json(); // Parse della risposta JSON
    })
    .then(data => {
        // Memorizza il token in localStorage
        localStorage.setItem('jwt', data.token);

        // Richiesta per recuperare i dati dell'utente
        return fetch('/api/auth/me', {
            method: 'GET',
            headers: { 'access-token': data.token }
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nel recupero dei dati utente: ' + response.statusText);
        }
        return response.json(); // Dati utente in formato JSON
    })
    .then(userData => {
        // Controlla il ruolo dell'utente
        if (userData.role === 'operatore_Dolomiti') {
            return fetch('/loadPage/?Dir=InterfacciaDA&page=DA.html');
        } else if (userData.role === 'cittadino') {
            return fetch('/loadPage/?Dir=Menu&page=menu.html');
        } else {
            throw new Error('Ruolo non riconosciuto: ' + userData.role);
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nel recupero della pagina: ' + response.statusText);
        }
        return response.text(); // Il contenuto della pagina HTML
    })
    .then(html => {
        // Aggiorna il contenuto della pagina con il nuovo HTML
        document.open();
        document.write(html);
        document.close();
    })
    .catch(error => {
        console.error('Errore:', error);
        // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
        alert('Login fallito. Per favore, riprova. ' + error.message);
    });
});
