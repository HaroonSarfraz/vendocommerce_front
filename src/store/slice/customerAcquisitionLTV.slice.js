import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const CustomerAcquisitionSliceLTV = createSlice({
  initialState: initialState.customerAcquisitionLTV,
  name: "customerAcquisitionLTV",
  reducers: {
    setCustomerAcquisitionLTV: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCustomerAcquisitionLTV } = CustomerAcquisitionSliceLTV.actions;

export default CustomerAcquisitionSliceLTV.reducer;

const selectCustomerAcquisitionLTV = (state) => state.customerAcquisitionLTV;

export { selectCustomerAcquisitionLTV };
