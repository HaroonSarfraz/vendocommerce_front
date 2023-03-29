export const API_URL = "https://api2.Vendo.com/api/v1/";
export const KeepaGraph = "https://graph.keepa.com/pricehistory.png";
export const AmazonawsList = "https://urrmjlumse.execute-api.eu-west-2.amazonaws.com/prod/api/";
export const pageDropdown = [10, 25, 50, 100];
export const DefaultPerPage = 10;
export const priceCommonSign = "€";

export const timeSince = (date) => {
  var seconds = Math.floor((new Date() - date * 1000) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};
