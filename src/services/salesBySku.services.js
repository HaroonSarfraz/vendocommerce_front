import { message } from "antd";
import {
  fetchSalesBySkuDetails,
  fetchSalesSkuDetailList,
} from "../api/salesBySku.api";
import {
  setSalesBySkuDetails,
  setSalesSkuDetailsList,
} from "../store/slice/salesBySku.slice";

export const getSalesBySkuDetails = (data) => {
  return (dispatch) => {
    fetchSalesBySkuDetails(data)
      .then((res) => {
        if (res.data) {
          dispatch(setSalesBySkuDetails({status: true, data: res.data.items.summary}));
          dispatch(setSalesSkuDetailsList({status: true, data: res.data.items.details}));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};

export const getSalesBySkuDetailsList = (data) => {
  return (dispatch) => {
    fetchSalesSkuDetailList(data)
      .then((res) => {
        if (res.data.status) {
          dispatch(setSalesSkuDetailsList(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};
