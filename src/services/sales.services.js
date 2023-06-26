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
import initialState from "../store/initialState";

export const getSalesGraphData = (data) => {
  return (dispatch) => {
    fetchSalesGraphData(data)
      .then((res) => {
        if (res.status == 200 && res.data) {
          dispatch(setSalesGraphData({ status: true, data: res.data }));
        } else {
          dispatch(setSalesGraphData({ status: false, ...initialState.sales.salesGraphData }));
          message.error("No Graph data available yet.");
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
        if (res.status == 200 && res.data) {
          const { weekDetail, ...reportCallout } = res.data;
          dispatch(setSalesReportCallOuts({ status: true, data: reportCallout }));
          dispatch(setSalesByWeekData({ status: true, data: weekDetail }));
        } else {
          dispatch(setSalesReportCallOuts({ status: false, ...initialState.sales.salesReportCallOuts }));
          dispatch(setSalesByWeekData({ status: false, ...initialState.sales.salesByWeekData }));
          message.error("No Report Call Outs data available yet.");
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
        if (res.status == 200 && res.data.status) {
          dispatch(setSalesByWeekData(res.data));
        } else {
          message.error("No Weekly data available yet.");
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};
