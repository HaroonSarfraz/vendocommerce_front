import { message } from "antd";
import { setCustomerAcquisitionList } from "../store/slice/customerAcquisition.slice";
import { fetchCustomerAcquisitionList } from "../api/customerAcquisition.api";

export const getCustomerAcquisitionList = (data) => {
  return (dispatch) => {
    fetchCustomerAcquisitionList(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setCustomerAcquisitionList(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};
