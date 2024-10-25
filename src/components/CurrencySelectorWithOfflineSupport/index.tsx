import React from 'react';
import { useNetworkState } from 'react-use';
import { Currency } from '@common/api/exchange-rate-api.types';
import CurrencySelector from '@components/CurrencySelector';

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onlineCurrencies: Currency[];
  offlineCurrencies: Currency[];
  onCurrencyChange: (currency: Currency) => void;
}

const CurrencySelectorWithOfflineSupport: React.FC<CurrencySelectorProps> = ({
  onlineCurrencies,
  selectedCurrency,
  onCurrencyChange,
  offlineCurrencies,
}) => {
  const { online } = useNetworkState();

  if (online) {
    return <CurrencySelector currencies={onlineCurrencies} selectedCurrency={selectedCurrency} onCurrencyChange={onCurrencyChange} />;
  }

  const offlineCurrency = offlineCurrencies.includes(selectedCurrency) ? selectedCurrency : offlineCurrencies[0];

  onCurrencyChange(offlineCurrency);
  return <CurrencySelector currencies={offlineCurrencies} selectedCurrency={offlineCurrency} onCurrencyChange={onCurrencyChange} />;
};

export default CurrencySelectorWithOfflineSupport;
