import request from "./request";

export const fetchCategoryList = () => {
  return request.get(`/category/category-list`);
};

export const CreateCategory = (data) => {
  return request.post(`/category/category-list`, data);
};
