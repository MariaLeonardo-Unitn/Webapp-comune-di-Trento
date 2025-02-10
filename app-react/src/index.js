import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SegnalazioniProvider } from './SegnalazioniContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SegnalazioniProvider> 
      <App />
    </SegnalazioniProvider>
  </React.StrictMode>
);


reportWebVitals();