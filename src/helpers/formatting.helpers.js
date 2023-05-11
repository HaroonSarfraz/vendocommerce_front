export const currencyFormat = (price) => {
  if (!price) return "$0";

  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: (price | 0) < price ? 2 : 0
  });

  return formatter.format(price);
};

export const numberFormat = (num) => {
  if (!num) return 0;

  const formatter = Intl.NumberFormat("en-US");

  return formatter.format(num);
};

export const percentageFormat = (num) => {
  if (!num) return "0%";

  return `${Math.round(num*100)/100}%`;
};
