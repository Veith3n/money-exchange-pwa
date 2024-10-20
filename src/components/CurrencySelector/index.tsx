import React, { useCallback } from 'react';
import { convertToCurrencyEnum, Currency } from '@common/api/exchange-rate-api.types';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import styles from './CurrencySelector.module.scss';

interface CurrencySelectorProps {
  currencies: Currency[];
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currencies, selectedCurrency, onCurrencyChange }) => {
  const handleCurrencyChange = useCallback(
    (e: SelectChangeEvent<Currency>) => {
      const currency = convertToCurrencyEnum(e.target.value);
      if (currency) {
        onCurrencyChange(currency);
      }
    },
    [onCurrencyChange],
  );

  return (
    <FormControl variant="outlined" className={styles.formControl}>
      <InputLabel className={styles.inputLabel}>Currency</InputLabel>
      <Select value={selectedCurrency} onChange={handleCurrencyChange} label="Currency">
        {currencies.map((currency) => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;
