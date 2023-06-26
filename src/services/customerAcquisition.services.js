import { message } from "antd";
import { setCustomerAcquisition } from "../store/slice/customerAcquisition.slice";
import { setCustomerAcquisitionLTV } from "../store/slice/customerAcquisitionLTV.slice";
import {
  fetchCustomerAcquisition,
  fetchCustomerAcquisitionLTV,
} from "../api/customerAcquisition.api";
import initialState from "../store/initialState";

export const getCustomerAcquisition = (data) => {
  return (dispatch) => {
    fetchCustomerAcquisition(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setCustomerAcquisition({ status: true, data: res.data }));
        } else {
          dispatch(
            setCustomerAcquisition({
              ...initialState.customerAcquisition,
              status: false,
            })
          );
          message.error("No data available yet.");
        }
      })
      .catch((err) => {
        message.error("Something Went Wrong.");
      });
  };
};

export const getCustomerAcquisitionLTV = (data) => {
  return (dispatch) => {
    message.destroy();
    message.loading({ content: "loading...", key: "loading", duration: 0 });
    fetchCustomerAcquisitionLTV(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setCustomerAcquisitionLTV({ status: true, data: res.data }));
        } else {
          dispatch(
            setCustomerAcquisitionLTV({
              ...initialState.customerAcquisitionLTV,
              status: false,
            })
          );
          message.error("No data available yet.");
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
