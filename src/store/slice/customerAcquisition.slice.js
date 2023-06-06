import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const CustomerAcquisitionSlice = createSlice({
  initialState: initialState.customerAcquisition,
  name: "customerAcquisition",
  reducers: {
    setCustomerAcquisition: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { setCustomerAcquisition } = CustomerAcquisitionSlice.actions;

export default CustomerAcquisitionSlice.reducer;

const selectCustomerAcquisition = (state) => state.customerAcquisition;

export { selectCustomerAcquisition };
