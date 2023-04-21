import { message } from "antd";
import { fetchBrandList } from "../api/brands.api";
import { setBrandList } from "../store/slice/brands.slice";

export const getBrandList = (data) => {
  return (dispatch) => {
    fetchBrandList(data)
      .then((res) => {
        if (res.data) {
          dispatch(setBrandList(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};