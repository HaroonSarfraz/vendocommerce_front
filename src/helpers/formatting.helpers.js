export const formatCurrency = (price) => {
  if (!price) return '$0';

  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(price);
};

export const formatNumber = (num) => {
  if (!num) return 0;

  const formatter = Intl.NumberFormat('en-US');

  return formatter.format(num);
};

export const formatPercentage = (num) => {
  if (!num) return '0%';

  return `${parseFloat(num).toFixed(2)}%`;
};
