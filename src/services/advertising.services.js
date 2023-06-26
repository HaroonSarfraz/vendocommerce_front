import { message } from "antd";
import { fetchAdvertising } from "../api/advertising.api";
import {
  setLastWeekKPIsData,
  setYearToDayKPIsData,
  setAdvertisementsData,
} from "../store/slice/advertising.slice";
import initialState from "../store/initialState";

export const getAdvertising = (data) => {
  return (dispatch) => {
    fetchAdvertising(data)
      .then((res) => {
        if (res.status == 200 && res.data) {
          dispatch(
            setLastWeekKPIsData({ status: true, data: res.data.lastWeekKPIs })
          );
          dispatch(
            setYearToDayKPIsData({ status: true, data: res.data.yearToDayKPIs })
          );
          dispatch(
            setAdvertisementsData({
              status: true,
              data: res.data.advertisingData,
            })
          );
        } else {
          message.error("No data available yet.");
          dispatch(
            setLastWeekKPIsData({
              ...initialState.advertising.lastWeekKPIs, status: false,
            })
          );
          dispatch(
            setYearToDayKPIsData({
              ...initialState.advertising.yearToDayKPIs, status: false,
            })
          );
          dispatch(
            setAdvertisementsData({
              ...initialState.advertising.advertisements, status: false,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err)
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};
