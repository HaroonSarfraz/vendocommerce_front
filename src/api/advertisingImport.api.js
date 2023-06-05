import request from "./request";

export const ImportAdvertising = (data) => {
  return request.post("/advertising-import", data)
};
