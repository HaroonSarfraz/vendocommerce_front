import { message } from "antd";
import { fetchShippingList } from "../api/shipping.api";
import { setShippingList } from "../store/slice/shipping.slice";

export const getShippingList = (data) => {
  return (dispatch) => {
    fetchShippingList(data)
      .then((res) => {
        if (res) {
          dispatch(setShippingList(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};
