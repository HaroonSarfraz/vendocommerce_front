import { message } from "antd";
import { fetchCategoryList } from "../api/categoryList.api";
import { setCategoryList } from "../store/slice/categoryList.slice";

export const getCategoryList = (data) => {
  return (dispatch) => {
    fetchCategoryList(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setCategoryList(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};
