import { message } from 'antd'
import {
  fetchSalesGraphData,
  fetchSalesByWeekData,
  fetchSalesReportCallOuts,
} from "../api/sales.api";
import {
  setSalesByWeekData,
  setSalesGraphData,
  setSalesReportCallOuts,
} from "../store/slice/sales.slice";

export const getSalesGraphData = (data) => {
  return (dispatch) => {
    fetchSalesGraphData(data)
      .then((res) => {
        if (res.data.status) {
          dispatch(setSalesGraphData(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};

export const getSalesReportCallOuts = (data) => {
  return (dispatch) => {
    fetchSalesReportCallOuts(data)
      .then((res) => {
        if (res.data.status) {
          dispatch(setSalesReportCallOuts(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};

export const getSalesByWeekData = (data) => {
  return (dispatch) => {
    fetchSalesByWeekData(data)
      .then((res) => {
        if (res.data.status) {
          dispatch(setSalesByWeekData(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};
