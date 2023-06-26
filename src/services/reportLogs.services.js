import { message } from "antd";
import { fetchReportLogs } from "../api/reportLogs.api";
import { setReportLogs } from "../store/slice/reportLogs.slice";

export const getReportLogs = (data) => {
  return (dispatch) => {
    fetchReportLogs(data)
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch(setReportLogs({ ...res.data, status: true }));
        } else {
          message.error("No data available yet.");
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};
