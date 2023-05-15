import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initialState';

export const CustomerAcquisitionSlice = createSlice({
  initialState: initialState.customerAcquisitionList,
  name: 'customerAcquisitionList',
  reducers: {
    setCustomerAcquisitionList: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCustomerAcquisitionList } = CustomerAcquisitionSlice.actions;

export default CustomerAcquisitionSlice.reducer;

const selectCustomerAcquisitionList = (state) => state.customerAcquisitionList;

export { selectCustomerAcquisitionList };
