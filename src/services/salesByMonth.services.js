import { message } from "antd";
import {
  fetchSalesByMonthData,
  fetchSalesByMonthDetail,
  fetchSalesByMonthGraph,
} from "../api/salesByMonth.api";
import {
  setSalesByMonthData,
  setSalesByMonthDetail,
  setSalesByMonthGraph,
} from "../store/slice/salesByMonth.slice";

export const getSalesByMonthData = (data) => {
  return (dispatch) => {
    fetchSalesByMonthData(data)
      .then((res) => {
        if (res.data) {
          dispatch(setSalesByMonthData({status: true, data: res.data}));
        } else {
          message.error(res.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};

export const getSalesByMonthDetail = (data) => {
  return (dispatch) => {
    fetchSalesByMonthDetail(data)
      .then((res) => {
        if (res.status == 200 && res.data) {
          dispatch(setSalesByMonthDetail({status: true, data: res.data.sort((a, b) => a.month - b.month)}));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};

export const getSalesByMonthGraph = (data) => {
  return (dispatch) => {
    fetchSalesByMonthGraph(data)
      .then((res) => {
        if (res.status == 200 && res.data) {
          dispatch(setSalesByMonthGraph({status: true, data: res.data}));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};
