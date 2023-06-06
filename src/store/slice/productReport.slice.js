import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const ProductReportSlice = createSlice({
  initialState: initialState.productReportList,
  name: "productReportList",
  reducers: {
    setProductReportList: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { setProductReportList } = ProductReportSlice.actions;

export default ProductReportSlice.reducer;

const selectProductReportList = (state) => state.productReportList;

export { selectProductReportList };
