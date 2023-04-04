import request from './request';

export const fetchSalesByProductList = (data) => {
  return request.get(
    `/get-sales-by-product?search_year=${data?.search_year || ''}&search_week=${
      data?.search_week || ''
    }`,
    data
  );
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
