import request from "./request";

export const fetchBrandList = (data) => {
  return request.get(`/brands/all?page=${data?.page || 1}&per-page=${data?.perPage || 10}&name=${data?.search_term || ''}`);
};
