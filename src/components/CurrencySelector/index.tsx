import React from 'react';
import { convertToCurrencyEnum, Currency } from '@common/api/exchange-rate-api.types';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import styles from './CurrencySelector.module.scss';

interface CurrencySelectorProps {
  currencies: Currency[];
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ currencies, selectedCurrency, onCurrencyChange }) => {
  return (
    <FormControl variant="outlined" className={styles.formControl}>
      <InputLabel className={styles.inputLabel}>Currency</InputLabel>
      <Select
        value={selectedCurrency}
        onChange={(e) => {
          const currency = convertToCurrencyEnum(e.target.value as string);
          if (currency) {
            onCurrencyChange(currency);
          }
        }}
        label="Currency"
      >
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
