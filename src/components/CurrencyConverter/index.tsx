import React, { useEffect, useState } from 'react';
import ExchangeRateApiService from '@common/api/exchange-rate-api.service';
import { Currency, isCurrency } from '@common/api/exchange-rate-api.types';
import { Box, Button, TextField, Typography } from '@mui/material';

import ConversionResult from '../ConversionResult';
import CurrencySelector from '../CurrencySelector';
import styles from './CurrencyConverter.module.scss';

const CurrencyConverter: React.FC = () => {
  const defaultBaseCurrency = Currency.USD;
  const defaultTargetCurrency = Currency.EUR;

  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const [baseCurrency, setBaseCurrency] = useState<Currency>(defaultBaseCurrency);
  const [baseCurrencyAmount, setBaseCurrencyAmount] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    <Box className={styles.currencyConverter}>
      <Typography variant="h4" component="h1" gutterBottom>
        Currency Converter
      </Typography>
      <Box className={`${styles.marginBottom} ${styles.fullWidth} ${styles.maxWidth}`}>
        <TextField
          label="Amount"
          type="number"
          variant="outlined"
          fullWidth
          value={baseCurrencyAmount.toString()}
          onChange={(e) => {
            const value = Number(e.target.value);

            if (value <= 9_999_999) {
              setBaseCurrencyAmount(value);
              setErrorMessage(null);
            } else {
              setErrorMessage('Amount cannot exceed 9,999,999');
            }
          }}
          inputProps={{ min: 0, max: 9_999_999 }}
          error={!!errorMessage}
          helperText={errorMessage}
        />
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
    </Box>
  );
};

export default CurrencyConverter;
