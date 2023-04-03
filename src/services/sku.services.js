import { message } from 'antd';
import {
  fetchSalesBySKUDetails,
  fetchSalesSkuDetailList
} from '../api/sku.api';
import {
  setSalesBySKUDetails,
  setSalesSKUDetailsList
} from '../store/slice/sku.slice';

export const getSalesBySKUDetails = (data) => {
  return (dispatch) => {
    fetchSalesBySKUDetails(data)
      .then((res) => {
        if (res.data.status) {
          dispatch(setSalesBySKUDetails(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || 'Something Went Wrong.');
      });
  };
};

export const getSalesBySKUDetailsList = (data) => {
  return (dispatch) => {
    fetchSalesSkuDetailList(data)
      .then((res) => {
        if (res.data.status) {
          dispatch(setSalesSKUDetailsList(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || 'Something Went Wrong.');
      });
  };
};
