import React from 'react';
import { Currency } from '@common/api/exchange-rate-api.types';

interface ConversionResultProps {
  baseCurrencyAmount: number | null;
  baseCurrency: Currency;
  targetCurrencyAmount: number | null;
  targetCurrency: Currency;
}

const ConversionResult: React.FC<ConversionResultProps> = ({ baseCurrencyAmount, baseCurrency, targetCurrencyAmount, targetCurrency }) => {
  return (
    (baseCurrencyAmount && targetCurrencyAmount && (
      <h2>
        {baseCurrencyAmount} {baseCurrency} = {targetCurrencyAmount.toFixed(2)} {targetCurrency}
      </h2>
    )) ||
    null
  );
};

export default ConversionResult;
