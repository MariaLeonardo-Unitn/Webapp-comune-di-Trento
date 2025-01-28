import React, { useState } from 'react';

function ReservationForm() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [bagType, setBagType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Reservation for ${name} on ${date} for ${quantity} ${bagType} garbage bags was successful!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input 
          type="date" 
          id="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input 
          type="number" 
          id="quantity" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="bag-type">Bag Type:</label>
        <select 
          id="bag-type" 
          value={bagType} 
          onChange={(e) => setBagType(e.target.value)}
        >
          <option value="plastic">Plastic</option>
          <option value="organic">Organic</option> 
          {/* Add more options as needed */}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReservationForm;