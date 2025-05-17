/**
 * Utility functions for formatting values in the trading app
 */

// Format currency value (e.g. $1,234.56)
export const formatCurrency = (value, currency = 'USD') => {
  if (value === undefined || value === null) return '--';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// Format large numbers with abbreviations (e.g. 1.5M, 2.3B)
export const formatLargeNumber = (value) => {
  if (value === undefined || value === null) return '--';
  
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`;
  }
  
  return value.toString();
};

// Format percentage with sign (e.g. +1.23% or -1.23%)
export const formatPercentage = (value, displaySign = true) => {
  if (value === undefined || value === null) return '--';

  const formatted = Math.abs(value).toFixed(2) + '%';
  
  if (displaySign) {
    const sign = value >= 0 ? '+' : '-';
    return sign + formatted;
  }
  
  return formatted;
};

// Format stock change with color indicator
export const getChangeClass = (value) => {
  if (value > 0) return 'positive';
  if (value < 0) return 'negative';
  return '';
};

// Format volume (e.g. 1.5M)
export const formatVolume = (value) => {
  if (value === undefined || value === null) return '--';
  
  return formatLargeNumber(value);
};
