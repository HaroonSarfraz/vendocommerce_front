import request from './request';

export const fetchSalesSkuDetailList = (data) => {
  return request.get(`/get-sales-by-sku-detail?start_date=${data?.start_date || ''}&end_date=${data?.end_date || ''}&search_text=${data?.search_text || ''}`, data);
};

export const fetchSalesBySkuDetails = (data) => {
  return request.get(`/brands/1/sales/sales-by-sku?startDate=${data?.start_date || '2022-1-24'}&endDate=${data?.end_date || '2022-12-12'}`);
  // return request.get(`/get-sales-by-sku?search_text=${data?.search_text || ''}&start_date=${data?.start_date || ''}&end_date=${data?.end_date || ''}`, data);
};
