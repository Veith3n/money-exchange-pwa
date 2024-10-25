import { Currency } from './api/exchange-rate-api.types';

export class ConversionNotification {
  static readonly type = 'SHOW_CONVERSION_NOTIFICATION';

  constructor(readonly data: { baseCurrency: string; targetCurrency: string; baseCurrencyAmount: number; targetCurrencyAmount: number }) {
    this.data = data;
  }

  get type() {
    return ConversionNotification.type;
  }
}

export class ExchangeRateNotification {
  static readonly type = 'SHOW_EXCHANGE_RATE_NOTIFICATION';

  constructor(readonly data: { baseCurrency: Currency; targetCurrency: Currency }) {
    this.data = data;
  }

  get type() {
    return ExchangeRateNotification.type;
  }
}
