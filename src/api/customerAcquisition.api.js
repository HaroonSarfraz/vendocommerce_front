import request from "./request";

export const fetchCustomerAcquisition = (data) => {
  return request.get(
    `/customer-acquisition?year=${data?.search_year || ""}&months=${
      data?.search_month || ""
    }`
  );
};
