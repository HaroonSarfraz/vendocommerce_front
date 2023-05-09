import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const salesByProductSlice = createSlice({
  initialState: initialState.salesByProduct,
  name: "salesByProduct",
  reducers: {
    setSalesByProductList: (state, action) => {
      state.salesByProductList = action.payload;
    },
    setSaveColumnConfiguration: (state, action) => {
      state.saveColumnConfiguration = action.payload;
    },
    setSalesByProductColumnList: (state, action) => {
      state.salesByProductColumnList = action.payload;
    },
    setSaveTableConfiguration: (state, action) => {
      state.saveTableConfiguration = action.payload;
    },
  },
});

export const {
  setSalesByProductList,
  setSaveColumnConfiguration,
  setSalesByProductColumnList,
  setSaveTableConfiguration,
} = salesByProductSlice.actions;

export default salesByProductSlice.reducer;

const selectSalesByProductList = (state) => state.salesByProduct.salesByProductList;

export { selectSalesByProductList };
