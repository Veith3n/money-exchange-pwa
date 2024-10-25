# Money Exchange PWA

Money Exchange PWA is a Progressive Web App (PWA) written in React that allows users to convert currencies, view conversion history, and receive notifications about exchange rates. The app is designed to work offline and can be installed on mobile devices for a native-like experience.

## Features

- Currency conversion (**supports 161 commonly circulating world currencies**)
- Conversion history
- Geolocation-based information
- Network status monitoring
- Notifications for exchange rates
- Installable as a PWA
- Caching of API calls in order to support offline experience
- Dark mode support

## Known issues

- Some service worker features may not work correctly on iPhones
- The app should be installed as a PWA on iPhones for the correct experience

## Installation

To install and run the project locally, follow these steps:

1. Clone repo
2. install dependencies with `npm install`
3. Start server with `npm start`
4. For production build go with `npm run build`
