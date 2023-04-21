import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const brandsSlice = createSlice({
  initialState: initialState.brands,
  name: "brands",
  reducers: {
    setBrandList: (state, action) => {
      state.brandList = action.payload;
    },
  },
});

export const { setBrandList } = brandsSlice.actions;

export default brandsSlice.reducer;
