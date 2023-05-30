import { message } from "antd";
import { setCategoryPerformanceList } from "../store/slice/categoryPerformanceReport.slice";
import { fetchCategoryPerformanceList } from "../api/categoryPerformance.api";

export const getCategoryPerformanceList = (data) => {
  return (dispatch) => {
    message.destroy();
    message.loading({ content: "Loading...", duration: 0 });
    fetchCategoryPerformanceList(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setCategoryPerformanceList(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      })
      .finally(() => {
        message.destroy();
      });
  };
};
