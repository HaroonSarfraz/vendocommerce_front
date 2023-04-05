import request from './request';

export const fetchSalesWeekDetailList = (data) => {
  return request.get(
    `get-sales-by-wk-detail?search_year=${
      data?.search_year || ''
    }&search_week=${data?.search_week || ''}`,
    data
  );
};

export const fetchSalesWeekGraph = (data) => {
  return request.get(
    `sales-by-week-graph-filter?graph_filter_type=${
      data?.graph_filter_type || ''
    }&search_year=${data?.search_year || ''}`,
    data
  );
};

export const fetchSalesWeekData = (data) => {
  return request.get(
    `get-sales-by-wk-data?search_year=${data?.search_year || ''}&search_week=${
      data?.search_week || ''
    }`,
    data
  );
};
