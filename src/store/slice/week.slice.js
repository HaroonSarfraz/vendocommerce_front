import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initialState';

export const weekSlice = createSlice({
  initialState: initialState.week,
  name: 'week',
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
  weekSlice.actions;

export default weekSlice.reducer;
