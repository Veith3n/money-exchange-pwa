import React, { useCallback, useEffect, useState } from 'react';
import ExchangeRateApiService from '@common/api/exchange-rate-api.service';
import { Currency, isCurrency } from '@common/api/exchange-rate-api.types';
import { ConversionNotification } from '@common/notifications';
import AmountTextField from '@components/AmountTextField';
import NavigationButton from '@components/buttons/NavigationButton';
import CurrencySelectorWithOfflineSupport from '@components/CurrencySelectorWithOfflineSupport';
import { useHistoryContext } from '@context/HistoryContext';
import { Box, Button, Typography } from '@mui/material';
import { ROUTES } from 'src';

import ConversionResult from '../ConversionResult';
import CurrencySelector from '../CurrencySelector';
import styles from './CurrencyConverter.module.scss';

const CurrencyConverter: React.FC = () => {
  const defaultBaseCurrency = Currency.USD;
  const defaultTargetCurrency = Currency.EUR;

  const { setHistory, history } = useHistoryContext();

  const resolveBaseCurrency = () => {
    if (!history.length) {
      return defaultBaseCurrency;
    }

    return history[history.length - 1].baseCurrency;
  };

  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const [baseCurrency, setBaseCurrency] = useState<Currency>(resolveBaseCurrency());
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
        if (response && response.result === 'error') {
          console.error('Error fetching currency data:', response['error-type']);

          return;
        }

        const currencyKeys = Object.keys(response.conversion_rates).filter(isCurrency);
        setCurrencies(currencyKeys);
      });
    };

    fetchSupportedCurrencies();
  }, [exchangeRateApiService]);

  const convertCurrency = useCallback(async () => {
    console.log(baseCurrency);
    exchangeRateApiService.getExchangeRateForCurrency(baseCurrency).then((response) => {
      if (response.result === 'error') {
        console.error('Error fetching currency data:', response['error-type']);

        return;
      }

      const rate = response.conversion_rates[targetCurrency];
      const targetCurrencyAmount = baseCurrencyAmount * rate;

      setConvertedBaseCurrency(baseCurrency);
      setConvertedBaseCurrencyAmount(baseCurrencyAmount);

      setConvertedTargetCurrency(targetCurrency);
      setConvertedTargetCurrencyAmount(targetCurrencyAmount);

      const addHistoryEntry = () => {
        const historyEntry = {
          baseCurrency,
          targetCurrency,
          baseAmount: baseCurrencyAmount,
          targetAmount: targetCurrencyAmount,
          date: new Date().toLocaleString(),
        };

        setHistory((prevHistory) => [...prevHistory, historyEntry]);
      };

      addHistoryEntry();

      if (navigator.serviceWorker.controller) {
        console.log('Sending message to service worker:', { baseCurrency, targetCurrency, baseCurrencyAmount, targetCurrencyAmount });
        const notification: ConversionNotification = new ConversionNotification({
          baseCurrency,
          targetCurrency,
          baseCurrencyAmount,
          targetCurrencyAmount,
        });

        navigator.serviceWorker.controller.postMessage({
          type: notification.type,
          data: notification.data,
        });
      }
    });
  }, [baseCurrency, baseCurrencyAmount, targetCurrency, exchangeRateApiService, setHistory]);

  const getOfflineCurrencies = () => {
    const supportedCurrencies = Array.from(new Set(history.map((entry) => entry.baseCurrency)));

    return supportedCurrencies;
  };

  return (
    <Box className={styles.currencyConverter}>
      <Typography variant="h4" component="h1" gutterBottom>
        Currency Converter
      </Typography>
      <Box className={`${styles.marginBottom} ${styles.fullWidth} ${styles.maxWidth}`}>
        <AmountTextField value={baseCurrencyAmount} onAmountChange={setBaseCurrencyAmount} />
      </Box>
      <Box className={`${styles.marginBottom} ${styles.fullWidth} ${styles.maxWidth}`}>
        <CurrencySelectorWithOfflineSupport
          onlineCurrencies={currencies}
          offlineCurrencies={getOfflineCurrencies()}
          selectedCurrency={baseCurrency}
          onCurrencyChange={setBaseCurrency}
        />
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
      <NavigationButton destination={ROUTES.ConversionHistoryView} sx={{ marginTop: 2 }} textToDisplay="Conversion History" />
      <NavigationButton destination={ROUTES.SettingsView} sx={{ marginTop: 2 }} textToDisplay="Settings" />
      <NavigationButton destination={ROUTES.GeolocationView} sx={{ marginTop: 2 }} textToDisplay="Your cords data" />
    </Box>
  );
};

export default CurrencyConverter;
