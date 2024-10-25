import React, { useEffect, useState } from 'react';
import { useNetworkState } from 'react-use';
import { Currency } from '@common/api/exchange-rate-api.types';
import CurrencySelector from '@components/CurrencySelector';
import { Alert, Snackbar } from '@mui/material';

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
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (!online) {
      setShowSnackbar(true);
    }
  }, [online]);

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  if (online) {
    return <CurrencySelector currencies={onlineCurrencies} selectedCurrency={selectedCurrency} onCurrencyChange={onCurrencyChange} />;
  }

  const offlineCurrency = offlineCurrencies.includes(selectedCurrency) ? selectedCurrency : offlineCurrencies[0];

  if (offlineCurrency) {
    onCurrencyChange(offlineCurrency);
  }

  return (
    <>
      <CurrencySelector currencies={offlineCurrencies} selectedCurrency={offlineCurrency} onCurrencyChange={onCurrencyChange} />
      <Snackbar open={showSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
          In offline mode, only supported currencies are shown.
        </Alert>
      </Snackbar>
    </>
  );
};

export default CurrencySelectorWithOfflineSupport;
