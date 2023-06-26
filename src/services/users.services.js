import { message } from "antd";
import { fetchSwitchUser, fetchUserList } from "../api/users.api";
import { setSwitchUser, setUserList } from "../store/slice/users.slice";

export const getUserList = (data) => {
  return (dispatch) => {
    fetchUserList(data)
      .then((res) => {
        if (res.status == 200 && res.data) {
          dispatch(setUserList(res.data));
        } else {
          message.error("No data available yet.");
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};

export const getSwitchUser = (data) => {
  return (dispatch) => {
    fetchSwitchUser(data)
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch(setSwitchUser(res.data));
        } else {
          message.error("No data available yet.");
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};
