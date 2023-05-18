import { message } from "antd";
import { fetchAdvertisingTotalRevenue } from "../api/advertisingTotalRevenue.api";
import { setAdvertisingTotalRevenue } from "../store/slice/advertisingTotalRevenue.slice";

export const getAdvertising = (data) => {
  return (dispatch) => {
    fetchAdvertisingTotalRevenue(data)
      .then((res) => {
        if (res.status == 200 && res.data) {
          dispatch(
            setAdvertisingTotalRevenue({
              status: true,
              data: res.data,
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
