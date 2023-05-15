import request from "./request";

export const fetchAdvertising = (data) => {
  return request.get(
    `/advertising-data?year=${data?.search_year || ""}&weeks=${
      data?.search_week || ""
    }`
  );
};
