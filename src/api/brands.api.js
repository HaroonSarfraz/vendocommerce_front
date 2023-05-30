import request from "./request";

export const fetchBrandList = (data, headers = {}) => {
  return request.get(
    `/brands/all?page=${data?.page || 1}&limit=${data?.perPage || 10}&orderBy=${
      data?.orderBy || "id"
    }&order=${data?.order || "desc"}&search=${data?.search_term || ""}`,
    { headers }
  );
};

export const fetchBrand = (brandId) => {
  return request.get(`/brands/${brandId}`);
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

export const addUserToBrandRequest = (id, userID, role) => {
  return request.get(`/brands/${id}/user/${userID}?role=${role}`);
};
