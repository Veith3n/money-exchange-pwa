import React from 'react';
import NavigationButton from '@components/buttons/NavigationButton';
import { useThemeContext } from '@context/ThemeContext';
import { Box, FormControlLabel, Paper, Switch, Typography } from '@mui/material';
import { ROUTES } from 'src';

const styles = {
  container: {
    padding: 3,
    maxWidth: 600,
    margin: 'auto',
  },
  heading: {
    marginBottom: 2,
    textAlign: 'center',
  },
  paper: {
    padding: 2,
    marginBottom: 2,
    width: '100%',
  },
  navigationButton: {
    display: 'block',
    margin: 'auto',
    marginBottom: 2,
  },
};

const Settings: React.FC = () => {
  const { toggleDarkMode, isDarkMode } = useThemeContext();

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" component="h1" gutterBottom sx={styles.heading}>
        Settings
      </Typography>
      <NavigationButton sx={styles.navigationButton} destination={ROUTES.CurrencyConverterView} textToDisplay="Converter" />
      <Paper elevation={3} sx={styles.paper}>
        <FormControlLabel control={<Switch checked={isDarkMode} onChange={toggleDarkMode} />} label="Dark Mode" />
      </Paper>
    </Box>
  );
};

export default Settings;
