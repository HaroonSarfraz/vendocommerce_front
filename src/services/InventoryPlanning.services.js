import { message } from "antd";
import {
  fetchInventoryPlanningColumnsList,
  fetchInventoryPlanningColumnsSave,
  fetchInventoryPlanningData,
} from "../api/inventoryPlanning.api";
import {
  setInventoryPlaning,
  setInventoryPlaningColumnsList,
  setInventoryPlaningColumnsSave,
} from "../store/slice/planning.slice";

export const getInventoryPlanningData = (data) => {
  return (dispatch) => {
    fetchInventoryPlanningData(data)
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch(setInventoryPlaning(res.data));
        } else {
          message.error("No data available yet.");
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};

export const getInventoryPlanningColumnsList = () => {
  return (dispatch) => {
    fetchInventoryPlanningColumnsList()
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch(setInventoryPlaningColumnsList(res.data));
        } else {
          message.error("No data available yet.");
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};

export const getInventoryPlanningColumnsSave = (data) => {
  return (dispatch) => {
    fetchInventoryPlanningColumnsSave(data)
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch(setInventoryPlaningColumnsSave(res.data));
        } else {
          message.error("No data available yet.");
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || "Something Went Wrong.");
      });
  };
};
