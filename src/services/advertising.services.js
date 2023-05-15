import { message } from "antd";
import { fetchAdvertising } from "../api/advertising.api";
import {
  setLastWeekKPIsData,
  setYearToDayKPIsData,
  setAdvertisementsData,
} from "../store/slice/advertising.slice";

export const getAdvertising = (data) => {
  return (dispatch) => {
    fetchAdvertising(data)
      .then((res) => {
        if (res.data) {
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
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};
