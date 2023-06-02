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

export const removeUserFromBrandRequest = (id, userID) => {
  return request.delete(`/brands/${id}/user/${userID}`);
};

export const deleteBrandRequest = (id) => {
  return request.delete(`/brands/${id}`);
};

export const fetchAmazonSpApiCredentialsRequest = (id) => {
  return request.get(`/brands/${id}/amazon-sp-api-credentials`);
};

export const deleteAmazonSpApiCredentialsRequest = (id, credID) => {
  return request.delete(`/brands/${id}/amazon-sp-api-credentials/${credID}`);
};

export const fetchAmazonAdvertisingCredentialsRequest = (id) => {
  return request.get(`/brands/${id}/amazon-advertising-credentials`);
};

export const deleteAmazonAdvertisingCredentialsRequest = (id, credID) => {
  return request.delete(`/brands/${id}/amazon-advertising-credentials/${credID}`);
};
