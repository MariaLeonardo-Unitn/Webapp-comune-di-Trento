import React, { createContext, useContext, useState, useEffect } from 'react';

const SegnalazioniContext = createContext();

export const useSegnalazioni = () => useContext(SegnalazioniContext);

export const SegnalazioniProvider = ({ children }) => {
  const [segnalazioni, setSegnalazioni] = useState([]);
  useEffect(() => {
    const fetchSegnalazioni = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/operatore_com/segnalazioni'); // Assicurati che il backend sia in ascolto su questa porta
            if (!response.ok) {
                throw new Error('Errore nel recupero delle segnalazioni');
            }
            const data = await response.json();

            // Adattiamo il formato dei dati per il frontend
            const formattedData = data.map(seg => ({
                id: seg.segnalazioneId,
                date: new Date(seg.data).toLocaleDateString(), // Formattiamo la data
                reason: seg.descrizione,
                location: seg.luogo,
                status: seg.stato,
                image: seg.foto,
            }));

            setSegnalazioni(formattedData);
        } catch (error) {
            console.error('Errore:', error);
        }
    };

    fetchSegnalazioni();
}, []);

  return (
    <SegnalazioniContext.Provider value={{ segnalazioni }}>
      {children}
    </SegnalazioniContext.Provider>
  );
};