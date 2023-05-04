import request from "./request";

export const fetchBrandList = (data) => {
  return request.get(`/brands/all?page=${data?.page || 1}&limit=${data?.perPage || 10}&search=${data?.search_term || ''}`);
};

export const createBrandRequest = (data) => {
  return request.post(`/brands?createdb=${true}`, data);
};

export const fetchUserBrandList = () => {
  return request.get("/users/brands");
};

export const updateBrandRequest = (id, data) => {
  return request.patch(`/brands/${id}`, data);
};
