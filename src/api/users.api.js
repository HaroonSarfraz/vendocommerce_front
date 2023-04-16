import request from "./request";

export const fetchUserList = (data) => {
  return request.get(`/users/all?page=${data?.page || 1}&per-page=${data?.perPage || 10}&search_term=${data?.search_term || ''}`);
};

export const fetchSwitchUser = (id) => {
  return request.get(`/auth/user-token/${id}`);
};
