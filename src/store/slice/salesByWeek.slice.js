import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initialState';

export const salesByWeekSlice = createSlice({
  initialState: initialState.salesByWeek,
  name: 'salesByWeek',
  reducers: {
    setSalesWeekDetailList: (state, action) => {
      state.salesWeekDetailList = action.payload;
    },
    setSalesWeekGraph: (state, action) => {
      state.salesWeekGraph = action.payload;
    },
    setSalesWeekData: (state, action) => {
      state.salesWeekData = action.payload;
    }
  }
});

export const { setSalesWeekData, setSalesWeekDetailList, setSalesWeekGraph } =
  salesByWeekSlice.actions;

export default salesByWeekSlice.reducer;
