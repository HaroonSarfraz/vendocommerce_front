import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initialState';

export const salesSlice = createSlice({
  initialState: initialState.sales,
  name: 'sales',
  reducers: {
    setSalesGraphData: (state, action) => {
      state.salesGraphData = action.payload;
    },
    setSalesByWeekData: (state, action) => {
      state.salesByWeekData = action.payload;
    },
    setSalesReportCallOuts: (state, action) => {
      state.salesReportCallOuts = action.payload;
    },
  },
});

export const { setSalesGraphData, setSalesByWeekData, setSalesReportCallOuts } = salesSlice.actions;

export default salesSlice.reducer;
