import { message } from "antd";
import { fetchProductReportList } from "../api/productReport.api";
import { setProductReportList } from "../store/slice/productReport.slice";
import initialState from "../store/initialState";

export const getProductReportList = (data) => {
  return (dispatch) => {
    message.destroy();
    message.loading({ content: "Loading...", key: "loading", duration: 0 });
    fetchProductReportList(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            setProductReportList({
              status: true,
              data: res.data,
            })
          );
        } else {
          message.error("No data available yet.");
          dispatch(
            setProductReportList({
              ...initialState.productReportList,
              status: false,
            })
          );
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      })
      .finally(() => {
        message.destroy("loading");
      });
  };
};
