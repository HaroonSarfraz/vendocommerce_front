import request from "./request";

export const fetchSalesByMonthData = (data) => {
  return request.get(
    `/sales/sales-by-month-summary?year=${
      data?.search_year || ""
    }&months=${data?.search_month || ""}`
  );
};

export const fetchSalesByMonthDetail = (data) => {
  return request.get(
    `/sales/sales-by-month-data?year=${
      data?.search_year || ""
    }&months=${data?.search_month || ""}`
  );
};

export const fetchSalesByMonthGraph = (data) => {
  return request.get(
    `/sales/sales-graph-data?year=${data?.search_year || ""}&months=${
      data?.search_month || ""
    }&graph_filter_type=${data?.graph_filter_type || "month"}`
  );
};
