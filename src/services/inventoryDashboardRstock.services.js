import { message } from "antd";
import { fetchRestockLimitInInventoryDashBoard } from "../api/inventoryDashboard.api";
import { setInventoryDashBoardRstock } from "../store/slice/inventoryDashboardRstock.sclice";

export const getInvetoryDashBoardRstack=()=>{
    return (dispatch) => {
        fetchRestockLimitInInventoryDashBoard()
          .then((res) => {
            if (res.data.status) {
              dispatch(setInventoryDashBoardRstock(res.data));
            } else {
              message.error(res.data.message);
            }
          })
          .catch((err) => {
            message.error(err?.response?.message || "Something Went Wrong.");
          });
      };
}