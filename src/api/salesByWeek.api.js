import request from "./request";

export const fetchSalesWeekDetailList = (data) => {
  return request.get(
    `/sales/sales-by-week-data?year=${data?.search_year || ""}&weeks=${
      data?.search_week || ""
    }`
  );
};

export const fetchSalesWeekGraph = (data) => {
  return request.get(
    `sales-by-week-graph-filter?graph_filter_type=${
      data?.graph_filter_type || ""
    }&search_year=${data?.search_year || ""}`
  );
};

export const fetchSalesWeekData = (data) => {
  return request.get(
    `/sales/sales-by-week-summary?year=${data?.search_year || ""}&weeks=${
      data?.search_week || ""
    }`
  );
};
