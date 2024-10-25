import React from 'react';
import { useNetworkState } from 'react-use';
import { Currency } from '@common/api/exchange-rate-api.types';
import CurrencySelector from '@components/CurrencySelector';
import { Tooltip } from '@mui/material';

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

  if (offlineCurrency) {
    onCurrencyChange(offlineCurrency);
  }

  return (
    <Tooltip title="In offline mode, only supported currencies are shown." arrow placement="right">
      <div>
        <CurrencySelector currencies={offlineCurrencies} selectedCurrency={offlineCurrency} onCurrencyChange={onCurrencyChange} />
      </div>
    </Tooltip>
  );
};

export default CurrencySelectorWithOfflineSupport;
