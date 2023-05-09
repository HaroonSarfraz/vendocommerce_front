import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initialState';

export const planningSlice = createSlice({
  initialState: initialState.planning,
  name: 'planning',
  reducers: {
    setInventoryPlaning: (state, action) => {
      state.inventoryPlaning = action.payload;
    },
    setInventoryPlaningColumnsList: (state, action) => {
      state.inventoryPlaningColumnsList = action.payload;
    },
    setInventoryPlaningColumnsSave: (state, action) => {
      state.inventoryPlaningColumnsSave = action.payload;
    },
  },
});

export const { setInventoryPlaning, setInventoryPlaningColumnsList, setInventoryPlaningColumnsSave } =
  planningSlice.actions;

export default planningSlice.reducer;

const selectInventoryPlanningList = (state) => state.planning.inventoryPlaning || {};
const selectInventoryPlanningColumnList = (state) => state.planning.inventoryPlaningColumnsList || {};
const selectInventoryPlanningColumnSave = (state) => state.planning.inventoryPlaningColumnsSave || {};

export { selectInventoryPlanningList, selectInventoryPlanningColumnList, selectInventoryPlanningColumnSave };
