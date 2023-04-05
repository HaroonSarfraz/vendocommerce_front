import { message } from "antd";
import {
  fetchSalesByProductColumnList,
  fetchSalesByProductList,
  SaveColumnConfiguration,
  SaveTableConfigurationAction,
} from "../api/salesByProduct.api";
import {
  setSalesByProductColumnList,
  setSalesByProductList,
  setSaveColumnConfiguration,
  setSaveTableConfiguration,
} from "../store/slice/salesByProduct.slice";

export const getSalesByProductList = (data) => {
  return (dispatch) => {
    fetchSalesByProductList(data)
      .then((res) => {
        if (res.data.status) {
          dispatch(setSalesByProductList(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};

export const getSaveColumnConfiguration = (data) => {
  return (dispatch) => {
    SaveColumnConfiguration(data)
      .then((res) => {
        if (res.data.status) {
          dispatch(setSaveColumnConfiguration(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};

export const getSalesByProductColumnList = (data) => {
  return (dispatch) => {
    fetchSalesByProductColumnList(data)
      .then((res) => {
        if (res.data.status) {
          dispatch(setSalesByProductColumnList(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};

export const getSaveTableConfiguration = (data) => {
  return (dispatch) => {
    SaveTableConfigurationAction(data)
      .then((res) => {
        if (res.data.status) {
          dispatch(setSaveTableConfiguration(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};
