import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import CurrencyConverter from '@components/CurrencyConverter';

import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export enum ROUTES {
  CurrencyConverterView = '/',
}
const App = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={ROUTES.CurrencyConverterView} />} />

      <Route path={ROUTES.CurrencyConverterView} element={<CurrencyConverter />} />
    </Routes>
  );
};

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
