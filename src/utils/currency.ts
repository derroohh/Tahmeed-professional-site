// Currency converter and formatting utility for USD ($) and Kenyan Shillings (KES / Ksh)
// Default exchange rate: 1 USD ≈ 130 KES

export const KES_PER_USD = 130;

export type CurrencyMode = 'KES' | 'USD';

export function formatPrice(amountInUSD: number, mode: CurrencyMode = 'KES'): string {
  if (mode === 'KES') {
    const kesValue = Math.round(amountInUSD * KES_PER_USD);
    return `KSh ${kesValue.toLocaleString()}`;
  }
  return `$${amountInUSD.toFixed(2)}`;
}

export function formatBothCurrencies(amountInUSD: number, primaryMode: CurrencyMode = 'KES'): {
  primary: string;
  secondary: string;
} {
  if (primaryMode === 'KES') {
    return {
      primary: formatPrice(amountInUSD, 'KES'),
      secondary: `$${amountInUSD.toFixed(2)} USD`,
    };
  }
  return {
    primary: `$${amountInUSD.toFixed(2)}`,
    secondary: `~KSh ${Math.round(amountInUSD * KES_PER_USD).toLocaleString()}`,
  };
}
