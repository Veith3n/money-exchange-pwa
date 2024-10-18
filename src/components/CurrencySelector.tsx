import React from 'react';
import { convertToCurrencyEnum, Currency } from '@common/api/exchange-rate-api.types';

interface CurrencySelectorProps {
  currencies: Currency[];
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currencies, selectedCurrency, onCurrencyChange }) => {
  return (
    <select
      value={selectedCurrency}
      onChange={(e) => {
        const currency = convertToCurrencyEnum(e.target.value);
        if (currency) {
          onCurrencyChange(currency);
        }
      }}
    >
      {currencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelector;
