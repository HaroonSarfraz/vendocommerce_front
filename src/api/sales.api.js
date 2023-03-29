import request from "./request";

export const fetchSalesGraphData = (data) => {
  return request.get(`/get-sales-graph-data?search_year=${data?.search_year || ''}&search_week=${data?.search_week || ''}`, data);
};

export const fetchSalesReportCallOuts = (data) => {
  return request.get(`/get-sales-report-call-outs?search_year=${data?.search_year || ''}&search_week=${data?.search_week || ''}`, data);
};

export const fetchSalesByWeekData = (data) => {
  return request.get(`/get-sales-by-week-data?search_year=${data?.search_year || ""}&search_week=${data?.search_week || ""}`, data);
};
