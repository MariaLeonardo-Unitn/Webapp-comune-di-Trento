import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css'; 

function Disposizioni() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }

    console.log('Form Data:', {
      file: file ? file.name : 'No file uploaded'
    });

    alert(`File: ${file ? file.name : 'No file uploaded'}`);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid PDF file.');
      setFile(null);
    }
  };

  const handleRedirect = () => {
    navigate('/interfacciaDA');
  };

  return (
    <div>
      <button onClick={handleRedirect} class="back-button">
        <img
          src="https://cdn-icons-png.flaticon.com/128/507/507257.png"
          alt="Back to Interfaccia DA"
          style={{ width: '30px', height: '30px' }}
        />
      </button>
      <h1 className="fade-in">Disposizioni</h1>
      <form id="reservation-form" className="slide-in" onSubmit={handleSubmit}>

        <label htmlFor="file">Upload PDF:</label>
        <input
          type="file"
          id="file"
          name="file"
          accept="application/pdf"
          onChange={handleFileChange}
          required
        />

        <button type="submit">Invia</button>
      </form>
    </div>
  );
}

export default Disposizioni;