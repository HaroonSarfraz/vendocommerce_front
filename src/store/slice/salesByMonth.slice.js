import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const salesByMonthSlice = createSlice({
  initialState: initialState.salesByMonth,
  name: "salesByMonth",
  reducers: {
    setSalesByMonthData: (state, action) => {
      state.salesByMonthData = action.payload;
    },
    setSalesByMonthDetail: (state, action) => {
      state.salesByMonthDetail = action.payload;
    },
    setSalesByMonthGraph: (state, action) => {
      state.salesByMonthGraph = action.payload;
    },
  },
});

export const {
  setSalesByMonthData,
  setSalesByMonthDetail,
  setSalesByMonthGraph,
} = salesByMonthSlice.actions;

export default salesByMonthSlice.reducer;
