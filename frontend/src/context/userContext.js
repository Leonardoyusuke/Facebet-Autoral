'use client'
import React, { createContext,useState } from 'react';

const CoinsContext = createContext();

export function CoinsProvider({ children }) {
    const [coins, setCoins] = useState("");
  return (
    <CoinsContext.Provider value={{ coins, setCoins }}>
      {children}
    </CoinsContext.Provider>
  );
}

export default CoinsContext;