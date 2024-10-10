import React, { createContext, useContext, useState } from 'react';

// Create the context
const TenderContext = createContext();

// Define a custom hook to use the TenderContext
export const useTender = () => {
    return useContext(TenderContext);
};

// Create a provider component
export const TenderProvider = ({ children }) => {
    const [tenders, setTenders] = useState([]);

    // You can define any additional logic or state here

    return (
        <TenderContext.Provider value={{ tenders, setTenders }}>
            {children}
        </TenderContext.Provider>
    );
};
