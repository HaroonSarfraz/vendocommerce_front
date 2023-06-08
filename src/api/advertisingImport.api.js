import request from "./request";

export const ImportAdvertising = (data) => {
  return request.put("/advertising-data", data)
};
