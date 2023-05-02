import { message } from 'antd';
import {
  fetchSalesWeekData,
  fetchSalesWeekDetailList,
  fetchSalesWeekGraph
} from '../api/salesByWeek.api';
import {
  setSalesWeekData,
  setSalesWeekDetailList,
  setSalesWeekGraph
} from '../store/slice/salesByWeek.slice';

export const getSalesWeekDetailList = (data) => {
  return (dispatch) => {
    fetchSalesWeekDetailList(data)
      .then((res) => {
        if (res.data) {
          dispatch(setSalesWeekDetailList({status: true, data: res.data.sort((a, b) => a.week - b.week)}));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || 'Something Went Wrong.');
      });
  };
};

export const getSalesWeekGraph = (data) => {
  return (dispatch) => {
    fetchSalesWeekGraph(data)
      .then((res) => {
        if (res.data.status) {
          dispatch(setSalesWeekGraph(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || 'Something Went Wrong.');
      });
  };
};

export const getSalesWeekData = (data) => {
  return (dispatch) => {
    fetchSalesWeekData(data)
      .then((res) => {
        if (res.data) {
          dispatch(setSalesWeekData({status: true, data: res.data}));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || 'Something Went Wrong.');
      });
  };
};
