import {
  fetchInventoryPlanningColumnsList,
  fetchInventoryPlanningColumnsSave,
  fetchInventoryPlanningData
} from '../api/planning.api';
import {
  setInventoryPlaning,
  setInventoryPlaningColumnsList,
  setInventoryPlaningColumnsSave
} from '../store/slice/planning.slice';

export const getInventoryPlanningData = (data) => {
  return (dispatch) => {
    fetchInventoryPlanningData(data)
      .then((res) => {
        if (res.data.status) {
          dispatch(setInventoryPlaning(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || 'Something Went Wrong.');
      });
  };
};

export const getInventoryPlanningColumnsList = () => {
  return (dispatch) => {
    fetchInventoryPlanningColumnsList()
      .then((res) => {
        if (res.data.status) {
          dispatch(setInventoryPlaningColumnsList(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || 'Something Went Wrong.');
      });
  };
};

export const getInventoryPlanningColumnsSave = (data) => {
  return (dispatch) => {
    fetchInventoryPlanningColumnsSave(data)
      .then((res) => {
        if (res.data.status) {
          dispatch(setInventoryPlaningColumnsSave(res.data));
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err?.response?.message || 'Something Went Wrong.');
      });
  };
};
