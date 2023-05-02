import request from './request';

export const fetchSalesByProductList = (data) => {
  return request.get(`/sales/sales-by-product?year=${data?.search_year || ''}&weeks=${data?.search_week || '1,2,3'}`);
};

export const SaveColumnConfiguration = (data) => {
  return request.post(`/save-column-configuration`, data);
};

export const fetchSalesByProductColumnList = () => {
  return request.get(`/get-sales-by-product-column-list`);
};

export const SaveTableConfigurationAction = (data) => {
  return request.post(`/save-table-configuration`, data);
};
