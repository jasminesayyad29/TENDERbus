// src/context/TenderContext.js
import React, { createContext, useState } from 'react';

// Create a Context
export const TenderContext = createContext();

// Create a Provider Component
export const TenderProvider = ({ children }) => {
  const [tenders, setTenders] = useState([]);

  const addTender = (tender) => {
    setTenders([...tenders, tender]);
  };

  const deleteTender = (id) => {
    setTenders(tenders.filter(tender => tender.id !== id));
  };

  return (
    <TenderContext.Provider value={{ tenders, addTender, deleteTender }}>
      {children}
    </TenderContext.Provider>
  );
};
