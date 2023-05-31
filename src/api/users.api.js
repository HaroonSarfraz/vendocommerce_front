import request from "./request";

export const fetchUserList = (data) => {
  return request.get(`/users/all?page=${data?.page || 1}&limit=${data?.perPage || 10}&name=${data?.search_term || ''}`);
};

export const fetchSwitchUser = (id) => {
  return request.get(`/auth/user-token/${id}`);
};

export const createUserRequest = (data) => {
  return request.post(`/users`, data);
};

export const addBrandsRequest = (id, data) => {
  return request.post(`/users/${id}/verify`, data);
};

export const updateUserRequest = (id, data) => {
  return request.patch(`/users/${id}`, data);
};

export const fetchUserBrands = (id) => {
  return request.get(`/users/${id}/brands`);
};

export const deleteUserRequest = (id) => {
  return request.delete(`/users/${id}`);
};
