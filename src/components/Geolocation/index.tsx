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
        <Typography variant="body1" sx={styles.errorText}>
          Your browser does not support Geolocation
        </Typography>
      ) : !isGeolocationEnabled ? (
        <Typography variant="body1" sx={styles.errorText}>
          Geolocation is not enabled
        </Typography>
      ) : coords ? (
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Latitude</TableCell>
              <TableCell>{coords.latitude}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Longitude</TableCell>
              <TableCell>{coords.longitude}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Altitude</TableCell>
              <TableCell>{coords.altitude}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Heading</TableCell>
              <TableCell>{coords.heading}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Speed</TableCell>
              <TableCell>{coords.speed}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <Box sx={styles.loadingBox}>
          <CircularProgress />
          <Typography variant="body1" sx={styles.loadingText}>
            Getting the location data…
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Geolocation;
