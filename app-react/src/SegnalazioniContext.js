import React, { createContext, useState, useContext } from 'react';

const SegnalazioniContext = createContext();

export const useSegnalazioni = () => useContext(SegnalazioniContext);

export const SegnalazioniProvider = ({ children }) => {
  const [segnalazioni, setSegnalazioni] = useState([]);

  const addSegnalazione = (segnalazione) => {
    setSegnalazioni((prev) => [...prev, segnalazione]);
  };

  return (
    <SegnalazioniContext.Provider
      value={{ segnalazioni, addSegnalazione, setSegnalazioni }}
    >
      {children}
    </SegnalazioniContext.Provider>
  );
};
