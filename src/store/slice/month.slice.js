import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initialState';

export const monthSlice = createSlice({
  initialState: initialState.month,
  name: 'month',
  reducers: {
    setSalesByMonthData: (state, action) => {
      state.salesByMonthData = action.payload;
    },
    setSalesByMonthDetail: (state, action) => {
      state.salesByMonthDetail = action.payload;
    },
    setSalesByMonthGraph: (state, action) => {
      state.salesByMonthGraph = action.payload;
    }
  }
});

export const {
  setSalesByMonthData,
  setSalesByMonthDetail,
  setSalesByMonthGraph
} = monthSlice.actions;

export default monthSlice.reducer;
