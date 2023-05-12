import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const ProductReportSlice = createSlice({
  initialState: initialState.productReportList,
  name: "productReportList",
  reducers: {
    setProductReportList: (state, action) => {
      state.productReportList = action.payload;
    },
  },
});

export const { setProductReportList } = ProductReportSlice.actions;

export default ProductReportSlice.reducer;

const selectProductReportList = (state) =>
  state.categoryPerformanceReport.productReportList;

export { selectProductReportList };
