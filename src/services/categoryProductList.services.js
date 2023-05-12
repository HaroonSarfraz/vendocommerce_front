import { message } from "antd";
import { setCategoryProductList } from "../store/slice/categoryProductList.slice";
import { fetchCategoryProductList } from "../api/categoryProductList.api";

export const getCategoryProductList = (data) => {
  return (dispatch) => {
    fetchCategoryProductList(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setCategoryProductList(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};
