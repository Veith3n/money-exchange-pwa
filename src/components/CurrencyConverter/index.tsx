import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExchangeRateApiService from '@common/api/exchange-rate-api.service';
import { Currency, isCurrency } from '@common/api/exchange-rate-api.types';
import AmountTextField from '@components/AmountTextField';
import { useHistoryContext } from '@context/HistoryContext';
import { Box, Button, Typography } from '@mui/material';
import { ROUTES } from 'src';

import ConversionResult from '../ConversionResult';
import CurrencySelector from '../CurrencySelector';
import styles from './CurrencyConverter.module.scss';

const CurrencyConverter: React.FC = () => {
  const defaultBaseCurrency = Currency.USD;
  const defaultTargetCurrency = Currency.EUR;

  const { setHistory } = useHistoryContext();
  const navigate = useNavigate();

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
      await exchangeRateApiService.getExchangeRateForCurrency(defaultBaseCurrency).then((response) => {
        if (response.result === 'error') {
          console.error('Error fetching currency data:', response['error-type']);

          return;
        }

        const currencyKeys = Object.keys(response.conversion_rates).filter(isCurrency);
        setCurrencies(currencyKeys);
      });
    };

    fetchSupportedCurrencies();
  }, [exchangeRateApiService, defaultBaseCurrency]);

  const convertCurrency = useCallback(async () => {
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

      const addHistoryEntry = () => {
        const historyEntry = {
          baseCurrency,
          targetCurrency,
          baseAmount: baseCurrencyAmount,
          targetAmount: baseCurrencyAmount * rate,
          date: new Date().toLocaleString(),
        };

        setHistory((prevHistory) => [...prevHistory, historyEntry]);
      };

      addHistoryEntry();
    });
  }, [baseCurrency, baseCurrencyAmount, targetCurrency, exchangeRateApiService]);

  return (
    <Box className={styles.currencyConverter}>
      <Typography variant="h4" component="h1" gutterBottom>
        Currency Converter
      </Typography>
      <Box className={`${styles.marginBottom} ${styles.fullWidth} ${styles.maxWidth}`}>
        <AmountTextField value={baseCurrencyAmount} onAmountChange={setBaseCurrencyAmount} />
      </Box>
      <Box className={`${styles.marginBottom} ${styles.fullWidth} ${styles.maxWidth}`}>
        <CurrencySelector currencies={currencies} selectedCurrency={baseCurrency} onCurrencyChange={setBaseCurrency} />
      </Box>
      <Typography variant="body1" component="span" gutterBottom>
        to
      </Typography>
      <Box className={`${styles.marginBottom} ${styles.fullWidth} ${styles.maxWidth}`}>
        <CurrencySelector currencies={currencies} selectedCurrency={targetCurrency} onCurrencyChange={setTargetCurrency} />
      </Box>
      <Button variant="contained" color="primary" onClick={convertCurrency}>
        Convert
      </Button>
      <ConversionResult
        baseCurrencyAmount={convertedBaseCurrencyAmount}
        baseCurrency={convertedBaseCurrency}
        targetCurrencyAmount={convertedTargetCurrencyAmount}
        targetCurrency={convertedTargetCurrency}
      />
      <Button variant="outlined" color="secondary" sx={{ marginTop: 2 }} onClick={() => navigate(ROUTES.ConversionHistoryView)}>
        Conversion History
      </Button>
    </Box>
  );
};

export default CurrencyConverter;
