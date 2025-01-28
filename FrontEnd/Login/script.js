document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene il comportamento predefinito del form

    var email = document.getElementById('loginEmail').value;
    var password = document.getElementById('loginPassword').value;

    fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => {
        console.log('Response: ' + response);
        if (!response.ok) {
            throw new Error('post response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Memorizza il token in localStorage
        localStorage.setItem('jwt', data.token);

        // Effettua una richiesta GET per caricare la nuova pagina
        return fetch('/loadPage/?Dir=Menu&page=men.html');
    })
    .then(response => {
        console.log('GET Response:' + response);
        if (!response.ok) {
            throw new Error('get response was not ok' + response);
        }
        return response.text();
    })
    .then(html => {
        // Aggiorna il contenuto della pagina con la nuova pagina
        document.open();
        document.write(html);
        document.close();
    })
    .catch(error => {
        console.error('Error:', error);
        // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
        alert('Login fallito. Per favore, riprova.' + error );
    });
});
