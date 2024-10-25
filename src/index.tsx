import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import CurrencyConverter from '@components/CurrencyConverter';
import HistoryScreen from '@components/HistoryScreen';
import Settings from '@components/Settings';
import { HistoryProvider } from '@context/HistoryContext';
import { CustomThemeProvider } from '@context/ThemeContext';

import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export enum ROUTES {
  CurrencyConverterView = '/',
  ConversionHistoryView = '/history',
  SettingsView = '/settings',
}
const App = () => {
  return (
    <HistoryProvider>
      <Routes>
        <Route path="*" element={<Navigate to={ROUTES.CurrencyConverterView} />} />

        <Route path={ROUTES.CurrencyConverterView} element={<CurrencyConverter />} />
        <Route path={ROUTES.ConversionHistoryView} element={<HistoryScreen />} />
        <Route path={ROUTES.SettingsView} element={<Settings />} />
      </Routes>
    </HistoryProvider>
  );
};

root.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <Router>
        <App />
      </Router>
    </CustomThemeProvider>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
