import { message } from "antd";
import { fetchProductReportList } from "../api/productReport.api";
import { setProductReportList } from "../store/slice/productReport.slice";

export const getProductReportList = (data) => {
  return (dispatch) => {
    message.destroy();
    message.loading({ content: "Loading...", duration: 0 });
    fetchProductReportList(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setProductReportList(res.data));
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
