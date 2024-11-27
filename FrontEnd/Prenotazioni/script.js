document.getElementById('reservation-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const quantity = document.getElementById('quantity').value;
  const bagType = document.getElementById('bag-type').value;
  alert(`Reservation for ${name} on ${date} for ${quantity} ${bagType} garbage bags was successful!`);
});
