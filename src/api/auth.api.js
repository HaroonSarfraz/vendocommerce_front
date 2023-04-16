import request from "./request";

export const signInRequest = (data) => {
  return request.post("/auth/login", data);
};

export const signUpRequest = (data) => {
  return request.post("/auth/signup", data);
};
