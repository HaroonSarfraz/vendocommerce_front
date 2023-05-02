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
    `sales-by-mont-graph?search_year=${data?.search_year || ""}&search_month=${
      data?.search_month || ""
    }&graph_filter_type=${data?.graph_filter_type || ""}&graph_filter_text=${
      data?.graph_filter_text || ""
    }`
  );
};
