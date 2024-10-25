import React from 'react';
import { Currency } from '@common/api/exchange-rate-api.types';
import NavigationButton from '@components/buttons/NavigationButton';
import { Box, Button, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { ROUTES } from 'src';
import { HistoryEntry, useHistoryContext } from 'src/context/HistoryContext';
import { ExchangeRateNotification } from 'src/service-worker';

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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notifyButton: {
    marginLeft: 'auto',
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

interface HistoryListProps {
  history: HistoryEntry[];
  styles: typeof styles;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, styles }) => {
  const handleNotify = (baseCurrency: Currency, targetCurrency: Currency) => {
    if (navigator.serviceWorker.controller) {
      console.log('Sending message to service worker:', { baseCurrency, targetCurrency });

      const notification: ExchangeRateNotification = new ExchangeRateNotification({ baseCurrency, targetCurrency });

      navigator.serviceWorker.controller.postMessage({
        type: notification.type,
        data: notification.data,
      });
    } else {
      console.error('Service worker controller not found.');
    }
  };

  return (
    <List>
      {history.map((entry, index) => (
        <ListItem key={index} sx={styles.listItem}>
          <ListItemText
            primary={`${entry.baseAmount.toFixed(2)} ${entry.baseCurrency} = ${entry.targetAmount.toFixed(2)} ${entry.targetCurrency}`}
            secondary={entry.date}
          />
          <Button variant="contained" color="primary" onClick={() => handleNotify(entry.baseCurrency, entry.targetCurrency)} sx={styles.notifyButton}>
            Notify
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

interface NoEntriesMessageProps {
  styles: typeof styles;
}

const NoEntriesMessage: React.FC<NoEntriesMessageProps> = ({ styles }) => {
  return (
    <Typography variant="body1" sx={styles.noEntries}>
      No conversion history available.
    </Typography>
  );
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
        {history.length === 0 ? <NoEntriesMessage styles={styles} /> : <HistoryList history={history} styles={styles} />}
      </Paper>
    </Box>
  );
};

export default HistoryScreen;
