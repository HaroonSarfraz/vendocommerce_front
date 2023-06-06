import { message } from "antd";
import {
  fetchSalesBySkuDetails,
  fetchSalesSkuDetailList,
} from "../api/salesBySku.api";
import {
  setSalesBySkuDetails,
  setSalesSkuDetailsList,
} from "../store/slice/salesBySku.slice";
import initialState from "../store/initialState";

export const getSalesBySkuDetails = (data) => {
  return (dispatch) => {
    fetchSalesBySkuDetails(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            setSalesBySkuDetails({ status: true, data: res.data.items.summary })
          );
          dispatch(
            setSalesSkuDetailsList({
              status: true,
              data: res.data.items.details,
            })
          );
        } else {
          message.error(res.data.message);
          dispatch(
            setSalesBySkuDetails({
              ...initialState.salesBySku.salesBySkuDetails,
              status: false,
            })
          );
          dispatch(
            setSalesSkuDetailsList({
              ...initialState.salesBySku.salesSkuDetailsList,
              status: false,
            })
          );
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
