import request from "./request";

export const signInRequest = (data) => {
  return request.post("/login", data);
};

export const signUpRequest = (data) => {
  return request.post("/sign-up", data);
};
