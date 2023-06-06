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
import initialState from "../store/initialState";

export const getSalesByProductList = (data) => {
  return (dispatch) => {
    message.destroy();
    message.loading({ content: "Loading...", duration: 0 });
    fetchSalesByProductList(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setSalesByProductList({ status: true, data: res.data }));
        } else {
          dispatch(
            setSalesByProductList({
              ...initialState.salesByProduct.salesByProductList,
              status: false,
            })
          );
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      })
      .finally(() => {
        message.destroy();
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
