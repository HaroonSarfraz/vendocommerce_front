import request from './request';

export const fetchCategoryProductList = (data) => {
  return request.get(`/category/category-product-list`);
};
