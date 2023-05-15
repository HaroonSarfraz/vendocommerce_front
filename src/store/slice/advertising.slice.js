import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const advertisingSlice = createSlice({
  initialState: initialState.advertising,
  name: "advertising",
  reducers: {
    setLastWeekKPIsData: (state, action) => {
      state.lastWeekKPIs = action.payload;
    },
    setYearToDayKPIsData: (state, action) => {
      state.yearToDayKPIs = action.payload;
    },
    setAdvertisementsData: (state, action) => {
      state.advertisements = action.payload;
    },
  },
});

export const {
  setLastWeekKPIsData,
  setYearToDayKPIsData,
  setAdvertisementsData,
} = advertisingSlice.actions;

export default advertisingSlice.reducer;

const selectLastWeekKPIs = (state) => state.advertising.lastWeekKPIs;
const selectYearToDayKPIs = (state) => state.advertising.yearToDayKPIs;
const selectAdvertisements = (state) => state.advertising.advertisements;

export { selectLastWeekKPIs, selectYearToDayKPIs, selectAdvertisements };
