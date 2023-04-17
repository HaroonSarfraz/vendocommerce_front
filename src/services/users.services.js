import { message } from "antd";
import { fetchSwitchUser, fetchUserList } from "../api/users.api";
import { setSwitchUser, setUserList } from "../store/slice/users.slice";

export const getUserList = (data) => {
  return (dispatch) => {
    fetchUserList(data)
      .then((res) => {
        if (res.data) {
          dispatch(setUserList(res.data));
        } else {
          message.error(res.data.message);
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
        if (res.data) {
          dispatch(setSwitchUser(res.data));

        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};
