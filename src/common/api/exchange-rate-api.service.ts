import axios from 'axios';

import { Currency, CurrencyGetExchangeRatesResponse, ExchangeRateApi } from './exchange-rate-api.types';

class ExchangeRateApiService implements ExchangeRateApi {
  private static instance: ExchangeRateApiService;
  static readonly BASE_URL = 'https://v6.exchangerate-api.com/v6';

  // Private constructor to prevent direct instantiation
  private constructor() {}

  public static getInstance(): ExchangeRateApiService {
    if (!ExchangeRateApiService.instance) {
      ExchangeRateApiService.instance = new ExchangeRateApiService();
    }

    return ExchangeRateApiService.instance;
  }

  public getExchangeRateForCurrency(baseCurrency: Currency): Promise<CurrencyGetExchangeRatesResponse> {
    return axios
      .get<CurrencyGetExchangeRatesResponse>(`${this.baseUrl()}/latest/${baseCurrency}`, { headers: this.authHeader() })
      .then((response) => response.data)
      .catch((error) => error.data);
  }

  private authHeader(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.apiToken()}`,
    };
  }

  private apiToken(): string {
    const token = process.env.REACT_APP_EXCHANGE_API_KEY;

    if (!token) {
      // TODO: Consider handling this more gracefully
      throw new Error('Bearer token not found in environment variables.');
    }

    return token;
  }

  private baseUrl(): string {
    return ExchangeRateApiService.BASE_URL;
  }
}

export default ExchangeRateApiService;
