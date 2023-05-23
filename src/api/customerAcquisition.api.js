import request from "./request";

export const fetchCustomerAcquisition = (data) => {
  return request.get(
    `/customer-acquisition?year=${data?.search_year || ""}&months=${
      data?.search_month || ""
    }`
  );
};

export const controllerLTV = new AbortController();

export const fetchCustomerAcquisitionLTV = (data) => {
  return request.get(
    `/new-customer-sales?year=${data?.search_year || ""}&months=${
      data?.search_month || ""
    }`,
    { signal: controllerLTV.signal }
  );
};
