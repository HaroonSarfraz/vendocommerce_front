import { message } from "antd";
import { setCustomerAcquisition } from "../store/slice/customerAcquisition.slice";
import { setCustomerAcquisitionLTV } from "../store/slice/customerAcquisitionLTV.slice";
import {
  fetchCustomerAcquisition,
  fetchCustomerAcquisitionLTV,
} from "../api/customerAcquisition.api";

export const getCustomerAcquisition = (data) => {
  return (dispatch) => {
    fetchCustomerAcquisition(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setCustomerAcquisition(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};

export const getCustomerAcquisitionLTV = (data) => {
  return (dispatch) => {
    fetchCustomerAcquisitionLTV(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setCustomerAcquisitionLTV(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};
