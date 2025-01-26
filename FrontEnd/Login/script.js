document.getElementById('reservation-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const reason = document.getElementById('reason').value;
  const visibility = document.getElementById('visibility').value;
  alert(`Segnalazione motivata: ${reason}. Visibilità: ${visibility}`);
});
