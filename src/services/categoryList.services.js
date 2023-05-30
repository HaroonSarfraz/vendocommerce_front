import { message } from "antd";
import { CreateCategory, fetchCategoryList } from "../api/categoryList.api";
import {
  selectCategoryList,
  setCategoryList,
} from "../store/slice/categoryList.slice";

export const getCategoryList = (
  data = {
    page: "1",
    limit: "20",
    order: "desc",
    orderBy: "name",
  }
) => {
  return (dispatch) => {
    dispatch(setCategoryList({ status: false }));
    fetchCategoryList(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setCategoryList({ ...res.data, status: true }));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};

export const DeleteCategory = (id) => {
  return (dispatch, getState) => {
    const state = getState();
    let categoryList = selectCategoryList(state);
    const data = categoryList.data.filter((fid) => fid.id !== id);

    dispatch(setCategoryList({ ...categoryList, data }));
  };
};
