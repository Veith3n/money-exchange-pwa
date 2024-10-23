import React from 'react';
import NavigationButton from '@components/buttons/NavigationButton';
import { Box, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { ROUTES } from 'src';
import { useHistoryContext } from 'src/context/HistoryContext';

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
  listItem: {
    borderBottom: '1px solid #ddd',
    padding: '8px 16px',
  },
  navigationButton: {
    display: 'block',
    margin: 'auto',
    marginBottom: 2,
  },
  noEntries: {
    textAlign: 'center',
    padding: 2,
  },
};

const HistoryScreen: React.FC = () => {
  const { history } = useHistoryContext();

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" component="h1" gutterBottom sx={styles.heading}>
        Conversion History
      </Typography>
      <NavigationButton sx={styles.navigationButton} destination={ROUTES.CurrencyConverterView} textToDisplay="Converter" />

      <Paper elevation={3} sx={styles.paper}>
        {history.length === 0 ? (
          <Typography variant="body1" sx={styles.noEntries}>
            No conversion history available.
          </Typography>
        ) : (
          <List>
            {history.map((entry, index) => (
              <ListItem key={index} sx={styles.listItem}>
                <ListItemText
                  primary={`${entry.baseAmount.toFixed(2)} ${entry.baseCurrency} = ${entry.targetAmount.toFixed(2)} ${entry.targetCurrency}`}
                  secondary={entry.date}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default HistoryScreen;
