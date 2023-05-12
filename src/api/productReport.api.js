import request from './request';

export const fetchProductReportList = (data) => {
  return request.get(`/product/product-report-data?year=${data?.search_year || ''}&weeks=${data?.search_week || '1,2,3'}`);
};
