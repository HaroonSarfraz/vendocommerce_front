import request from './request';

export const fetchCategoryPerformanceList = (data) => {
  return request.get(`/category/category-performance-report-data?year=${data?.search_year || ''}&weeks=${data?.search_week || '1,2,3'}`);
};

export const CategoryPerformanceReportImport = (data) => {
  return request.post(`/category/category-performance-report-import`, data);
};
