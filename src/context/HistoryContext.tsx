import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Currency } from '@common/api/exchange-rate-api.types';

export type HistoryEntry = {
  baseCurrency: Currency;
  targetCurrency: Currency;
  baseAmount: number;
  targetAmount: number;
  date: string;
};

interface HistoryContextType {
  history: HistoryEntry[];
  setHistory: React.Dispatch<React.SetStateAction<HistoryEntry[]>>;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  return <HistoryContext.Provider value={{ history, setHistory }}>{children}</HistoryContext.Provider>;
};

export const useHistoryContext = (): HistoryContextType => {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error('useHistoryContext must be used within a HistoryProvider');
  }

  return context;
};
