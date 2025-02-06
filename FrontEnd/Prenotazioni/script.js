const getUtenteId = async () => {
  try {
      const response = await fetch("http://localhost:3000/api/auth/me", {
          method: "GET",
          credentials: "include", 
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("token") 
          }
      });

      if (!response.ok) {
          throw new Error("Errore nel recupero dell'ID utente");
      }

      const data = await response.json();
      return data.Utente_id;
  } catch (error) {
      console.error(error);
      return null;
  }
};

document.getElementById('reservation-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const utenteId = await getUtenteId();
  if (!utenteId) {
    alert("Errore: utente non autenticato");
    return;
  }
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const quantity = document.getElementById('quantity').value;
  const bagType = document.getElementById('bag-type').value;
  const luogoRitiro = document.getElementById('punto-ritiro').value;
  const prenotazione = {
    utente: utenteId,
    tipoSacchetto: bagType,
    quantita: quantity,
    puntoRitiro: luogoRitiro
  }
  try {
    const response = await fetch("http://localhost:3000/api/prenotazione", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(prenotazione)
    });

    if (response.ok) {
        alert("Segnalazione inviata con successo!");
        document.getElementById("segnalazioneForm").reset();
    } else {
        alert("Errore nell'invio della segnalazione.");
    }
  } catch (error) {
    console.error("Errore:", error);
    alert("Si è verificato un errore.");
  }

});
