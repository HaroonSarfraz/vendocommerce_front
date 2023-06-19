import moment from "moment";

export const currencyFormat = (price) => {
  if (!price) return "$0";

  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: (price | 0) < price ? 2 : 0,
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

  return `${Math.round(num * 100) / 100}%`;
};

export const timeFormat = (value) => {
  return moment(new Date(value)).format(
    "MM/DD/YYYY hh:mm A"
  );
};

export const timeInterval = (startTime, endTime) => {
  if (!["object", "number"].includes(typeof (endTime))) {
    endTime = new Date(endTime);
  }

  if (!["object", "number"].includes(typeof (startTime))) {
    startTime = new Date(startTime);
  }

  var seconds = Math.floor(((endTime - startTime) || 0) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

export const timeSince = (startTime) => {
  return `${timeInterval(startTime, new Date())} ago`
};

export const coloredTextClass = (num = 0) => {
  return parseInt(num) < 0 ? "text-danger" : "text-success";
};
