'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface KostContextType {
  selectedKost: string;
  setSelectedKost: (kost: string) => void;
}

const KostContext = createContext<KostContextType | undefined>(undefined);

export function KostProvider({ children }: { children: ReactNode }) {
  const [selectedKost, setSelectedKost] = useState<string>('kost1');

  return (
    <KostContext.Provider value={{ selectedKost, setSelectedKost }}>
      {children}
    </KostContext.Provider>
  );
}

export function useKost() {
  const context = useContext(KostContext);
  if (context === undefined) {
    throw new Error('useKost must be used within a KostProvider');
  }
  return context;
}