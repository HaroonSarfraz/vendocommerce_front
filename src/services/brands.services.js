import { message } from "antd";
import {
  fetchBrandList,
  fetchUserBrandList,
  fetchAmazonSpApiCredentialsRequest,
  fetchAmazonAdvertisingCredentialsRequest,
} from "../api/brands.api";
import { setBrandList, setUserBrandList, setAmazonSpApiCredentialsList, setAmazonAdvertisingCredentialsList } from "../store/slice/brands.slice";

export const getBrandList = (data) => {
  return (dispatch) => {
    fetchBrandList(data)
      .then((res) => {
        if (res.data) {
          dispatch(setBrandList(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};

export const getUserBrandList = (data) => {
  return (dispatch) => {
    fetchUserBrandList(data)
      .then((res) => {
        if (res.data) {
          dispatch(setUserBrandList({data: res.data.brands, status: true}));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};

export const getAmazonSpApiCredentialsList = (data) => {
  return (dispatch) => {
    dispatch(setAmazonSpApiCredentialsList({ data: [], status: false }));
    fetchAmazonSpApiCredentialsRequest(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            setAmazonSpApiCredentialsList({ data: res.data, status: true })
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

export const getAmazonAdvertisingCredentialsList = (data) => {
  return (dispatch) => {
    dispatch(setAmazonAdvertisingCredentialsList({ data: [], status: false }));
    fetchAmazonAdvertisingCredentialsRequest(data)
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            setAmazonAdvertisingCredentialsList({ data: res.data, status: true })
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
