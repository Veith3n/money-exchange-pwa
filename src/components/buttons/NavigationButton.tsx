import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonProps } from '@mui/material';

interface NavigationButtonProps extends ButtonProps {
  destination: string;
  textToDisplay: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ destination, textToDisplay, ...props }) => {
  const navigate = useNavigate();

  return (
    <Button {...props} variant="outlined" color="secondary" onClick={() => navigate(destination)}>
      {textToDisplay}
    </Button>
  );
};

export default NavigationButton;
