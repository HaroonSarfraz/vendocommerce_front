import { message } from "antd";
import { fetchInventoryDashboard } from "../api/inventoryDashboard.api";
import { setInventoryDashboard } from "../store/slice/inventoryDashboard.slice";

export const getInventoryDashboard=()=>{
    return (dispatch) => {
      fetchInventoryDashboard()
          .then((res) => {
            if (res.data.status) {
              dispatch(setInventoryDashboard({ status: true, data: res.data }));
            } else {
              message.error(res.data.message);
            }
          })
          .catch((err) => {
            message.error(err?.response?.message || "Something Went Wrong.");
          });
      };
}