import request from "./request";

export const fetchCustomerAcquisitionList = (data) => {
  return request.get(
    `/brands/${data.brand_id}/customer-acquisition?year=${data?.search_year || ""}&months=${
      data?.search_month || "0,1,2"
    }`
  );
};
