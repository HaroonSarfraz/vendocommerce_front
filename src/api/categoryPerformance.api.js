import request from './request';

export const fetchCategoryPerformanceList = (data) => {
  return request.get(`/category/category-performance-report?year=${data?.search_year || ''}&weeks=${data?.search_week || '1,2,3'}`);
};

export const CreateCategoryPerformanceList = (data) => {
  return request.post(`/create-category-performance-list`, data);
};
