import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
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
  button: {
    display: 'block',
    margin: 'auto',
    marginBottom: 2,
  },
};

const HistoryScreen: React.FC = () => {
  const { history } = useHistoryContext();

  const navigate = useNavigate();

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" component="h1" gutterBottom sx={styles.heading}>
        Conversion History
      </Typography>
      <Button variant="outlined" color="secondary" onClick={() => navigate(ROUTES.CurrencyConverterView)} sx={styles.button}>
        Converter
      </Button>

      <Paper elevation={3} sx={styles.paper}>
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
      </Paper>
    </Box>
  );
};

export default HistoryScreen;
