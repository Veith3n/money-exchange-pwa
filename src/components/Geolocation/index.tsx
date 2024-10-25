import React from 'react';
import { useGeolocated } from 'react-geolocated';
import { Box, CircularProgress, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';

const styles = {
  container: {
    padding: 4,
    textAlign: 'center',
  },
  errorText: {
    color: 'error.main',
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  loadingText: {
    marginLeft: 2,
  },
};

const Geolocation: React.FC = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" component="h1" gutterBottom>
        Geolocation Example
      </Typography>
      {!isGeolocationAvailable ? (
        <GeolocationError message="Your browser does not support Geolocation" />
      ) : !isGeolocationEnabled ? (
        <GeolocationError message="Geolocation is not enabled" />
      ) : coords ? (
        <GeolocationTable coords={coords} />
      ) : (
        <GeolocationLoading />
      )}
    </Box>
  );
};

const GeolocationError: React.FC<{ message: string }> = ({ message }) => (
  <Typography variant="body1" sx={styles.errorText}>
    {message}
  </Typography>
);

const GeolocationTableEntry: React.FC<{ label: string; value: number | null }> = ({ label, value }) => (
  <TableRow>
    <TableCell>{label}</TableCell>
    <TableCell>{value || 'N/A'}</TableCell>
  </TableRow>
);

const GeolocationTable: React.FC<{ coords: GeolocationCoordinates }> = ({ coords }) => (
  <Table>
    <TableBody>
      <GeolocationTableEntry label="Latitude" value={coords.latitude} />
      <GeolocationTableEntry label="Longitude" value={coords.longitude} />
      <GeolocationTableEntry label="Altitude" value={coords.altitude} />
      <GeolocationTableEntry label="Heading" value={coords.heading} />
      <GeolocationTableEntry label="Speed" value={coords.speed} />
    </TableBody>
  </Table>
);

const GeolocationLoading: React.FC = () => (
  <Box sx={styles.loadingBox}>
    <CircularProgress />
    <Typography variant="body1" sx={styles.loadingText}>
      Getting the location data…
    </Typography>
  </Box>
);

export default Geolocation;
