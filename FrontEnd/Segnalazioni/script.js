function getCalendarioByZone(){
  var zone = document.getElementById('Calzone').value;
  fetch('../../API/ENDPOINTZ/ROUTERZ/Calendari', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json())
}