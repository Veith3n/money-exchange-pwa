import React, { useEffect, useState } from 'react';
import ExchangeRateApiService from '@common/api/exchange-rate-api.service';
import { Currency, isCurrency } from '@common/api/exchange-rate-api.types';

import ConversionResult from './ConversionResult';
import CurrencySelector from './CurrencySelector';

const CurrencyConverter: React.FC = () => {
  const defaultBaseCurrency = Currency.USD;
  const defaultTargetCurrency = Currency.EUR;

  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const [baseCurrency, setBaseCurrency] = useState<Currency>(defaultBaseCurrency);
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState<number>(1);

  const [targetCurrency, setTargetCurrency] = useState<Currency>(defaultTargetCurrency);

  const [convertedBaseCurrencyAmount, setConvertedBaseCurrencyAmount] = useState<number | null>(null);
  const [convertedTargetCurrencyAmount, setConvertedTargetCurrencyAmount] = useState<number | null>(null);
  const [convertedBaseCurrency, setConvertedBaseCurrency] = useState<Currency>(defaultBaseCurrency);
  const [convertedTargetCurrency, setConvertedTargetCurrency] = useState<Currency>(defaultTargetCurrency);

  const exchangeRateApiService = ExchangeRateApiService.getInstance();

  useEffect(() => {
    const fetchSupportedCurrencies = async () => {
      await exchangeRateApiService.getExchangeRateForCurrency(Currency.USD).then((response) => {
        if (response.result === 'error') {
          console.error('Error fetching currency data:', response['error-type']);
          return;
        }

        const currencyKeys = Object.keys(response.conversion_rates).filter(isCurrency);
        setCurrencies(currencyKeys);
      });
    };

    fetchSupportedCurrencies();
  }, [exchangeRateApiService]);

  const convertCurrency = () => {
    exchangeRateApiService.getExchangeRateForCurrency(baseCurrency).then((response) => {
      if (response.result === 'error') {
        console.error('Error fetching currency data:', response['error-type']);

        return;
      }

      const rate = response.conversion_rates[targetCurrency];

      setConvertedBaseCurrency(baseCurrency);
      setConvertedBaseCurrencyAmount(baseCurrencyAmount);

      setConvertedTargetCurrency(targetCurrency);
      setConvertedTargetCurrencyAmount(baseCurrencyAmount * rate);
    });
  };

  return (
    <>
      <h1>Currency Converter</h1>
      <input type="number" value={baseCurrencyAmount} onChange={(e) => setBaseCurrencyAmount(Number(e.target.value))} />
      <CurrencySelector currencies={currencies} selectedCurrency={baseCurrency} onCurrencyChange={setBaseCurrency} />
      <span> to </span>
      <CurrencySelector currencies={currencies} selectedCurrency={targetCurrency} onCurrencyChange={setTargetCurrency} />
      <button onClick={convertCurrency}>Convert</button>
      <ConversionResult
        baseCurrencyAmount={convertedBaseCurrencyAmount}
        baseCurrency={convertedBaseCurrency}
        targetCurrencyAmount={convertedTargetCurrencyAmount}
        targetCurrency={convertedTargetCurrency}
      />
    </>
  );
};

export default CurrencyConverter;
