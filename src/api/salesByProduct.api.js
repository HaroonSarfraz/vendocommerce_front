import request from './request';

export const fetchSalesByProductList = (data) => {
  return request.get(`/sales/sales-by-product?year=${data?.search_year || ''}&weeks=${data?.search_week || '1,2,3'}`);
};
