import React from 'react';
import { Currency } from '@common/api/exchange-rate-api.types';
import { Box, Paper, Typography } from '@mui/material';

import styles from './ConversionResult.module.scss';

interface ConversionResultProps {
  baseCurrencyAmount: number | null;
  baseCurrency: Currency;
  targetCurrencyAmount: number | null;
  targetCurrency: Currency;
}

const ConversionResult: React.FC<ConversionResultProps> = ({ baseCurrencyAmount, baseCurrency, targetCurrencyAmount, targetCurrency }) => {
  return (
    (baseCurrencyAmount && targetCurrencyAmount && (
      <Box className={styles.box}>
        <Paper elevation={3} className={styles.paper}>
          <Typography variant="h6" component="h2">
            {baseCurrencyAmount} {baseCurrency} = {targetCurrencyAmount.toFixed(2)} {targetCurrency}
          </Typography>
        </Paper>
      </Box>
    )) ||
    null
  );
};

export default ConversionResult;
