import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import AmountTextField from '.';

describe('AmountTextField', () => {
  const mockOnAmountChange = jest.fn();
  const initialAmount = 100;

  const renderComponent = () => render(<AmountTextField value={initialAmount} onAmountChange={mockOnAmountChange} />);

  const setAmountOnTheElement = (value: string) => fireEvent.change(inputElement, { target: { value } });
  const getErrorMessageForExceedingAmount = () => screen.queryByText(/amount cannot exceed/i);
  const getErrorMessageForDecimalPlaces = () => screen.queryByText(/only up to two decimal places are allowed/i);

  let inputElement: HTMLInputElement;

  beforeEach(() => {
    mockOnAmountChange.mockClear();

    renderComponent();
    inputElement = screen.getByLabelText(/amount/i);
  });

  it('renders the text field with the correct initial value', () => {
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(initialAmount);
  });

  it('calls onAmountChange with the correct value when input changes', () => {
    setAmountOnTheElement('200');

    expect(mockOnAmountChange).toHaveBeenCalledWith(200);
  });

  it('shows an error message when input exceeds max supported amount', () => {
    setAmountOnTheElement('100000000');

    expect(getErrorMessageForExceedingAmount()).toBeInTheDocument();
    expect(mockOnAmountChange).not.toHaveBeenCalled();
  });

  it('clears the error message when valid input is provided', () => {
    setAmountOnTheElement('100000000');

    expect(getErrorMessageForExceedingAmount()).toBeInTheDocument();

    setAmountOnTheElement('200');

    expect(getErrorMessageForExceedingAmount()).not.toBeInTheDocument();
    expect(mockOnAmountChange).toHaveBeenCalledWith(200);
  });

  it('shows an error message when input has more than two decimal places', () => {
    setAmountOnTheElement('100.123');

    expect(getErrorMessageForDecimalPlaces()).toBeInTheDocument();
    expect(mockOnAmountChange).not.toHaveBeenCalled();
  });

  it('clears the error message when valid input with up to two decimal places is provided', () => {
    setAmountOnTheElement('100.123');

    expect(getErrorMessageForDecimalPlaces()).toBeInTheDocument();

    setAmountOnTheElement('100.12');

    expect(getErrorMessageForDecimalPlaces()).not.toBeInTheDocument();
    expect(mockOnAmountChange).toHaveBeenCalledWith(100.12);
  });
});
