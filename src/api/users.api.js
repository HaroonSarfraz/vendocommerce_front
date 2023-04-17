import request from "./request";

export const fetchUserList = (data) => {
  return request.get(`/users/all?page=${data?.page || 1}&per-page=${data?.perPage || 10}&name=${data?.search_term || ''}`);
};

export const fetchSwitchUser = (id) => {
  return request.get(`/auth/user-token/${id}`);
};

export const createUserRequest = (data) => {
  return request.post(`/users`, data);
};

export const activateUserRequest = (id) => {
  return request.get(`/users/${id}/verify`);
};
