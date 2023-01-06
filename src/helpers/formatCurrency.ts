interface Currency {
  [k: string]: string;
};

const Currencies = {
  GBP: 'en-GB',
  EUR: 'sfb',
  USD: 'en-US'
} as Currency

export const formatCurrency = (value: number, currency = 'GBP') => {
  return new Intl.NumberFormat(Currencies[currency], {
    style: "currency",
    currency,
  }).format(value);
};
