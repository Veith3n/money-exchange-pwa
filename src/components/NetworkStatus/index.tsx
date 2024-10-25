import React from 'react';
import { useNetworkState } from 'react-use';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const styles = {
  alert: {
    width: '100%',
  },
};

const NetworkStatus = () => {
  const { online } = useNetworkState();

  return (
    <Snackbar open={!online} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert severity="warning" sx={styles.alert}>
        You are offline. Please check your connectivity.
      </Alert>
    </Snackbar>
  );
};

export default NetworkStatus;
