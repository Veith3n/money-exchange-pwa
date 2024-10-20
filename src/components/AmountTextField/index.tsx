import React, { useCallback, useState } from 'react';
import { TextField } from '@mui/material';

interface AmountTextFieldProps {
  value: number;
  onAmountChange: (value: number) => void;
}

const AmountTextField: React.FC<AmountTextFieldProps> = ({ value, onAmountChange }) => {
  const maxSupportedAmount = 99_999_999;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (!isNaN(Number(inputValue))) {
        const numericValue = Number(inputValue);

        if (numericValue <= maxSupportedAmount) {
          onAmountChange(numericValue);
          setErrorMessage(null);
        } else {
          setErrorMessage(`Amount cannot exceed ${maxSupportedAmount}`);
        }
      } else {
        setErrorMessage('Invalid input. Please enter a number.');
      }
    },
    [onAmountChange],
  );

  return (
    <TextField
      label="Amount"
      type="number"
      variant="outlined"
      fullWidth
      value={value.toString()}
      onChange={handleChange}
      inputProps={{ min: 0, max: maxSupportedAmount }}
      error={!!errorMessage}
      helperText={errorMessage}
    />
  );
};

export default AmountTextField;
