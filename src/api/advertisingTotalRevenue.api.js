import request from "./request";

export const fetchAdvertisingTotalRevenue = (data) => {
  return request.get(
    `/advertising-total-revenue?year=${data?.search_year || ""}&weeks=${
      data?.search_week || ""
    }`
  );
};
