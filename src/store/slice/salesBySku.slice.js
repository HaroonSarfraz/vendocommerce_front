import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initialState';

export const salesBySkuSlice = createSlice({
  initialState: initialState.salesBySku,
  name: 'salesBySku',
  reducers: {
    setSalesSkuDetailsList: (state, action) => {
      state.salesSkuDetailsList = action.payload;
    },
    setSalesBySkuDetails: (state, action) => {
      state.salesBySkuDetails = action.payload;
    },
  }
});

export const { setSalesSkuDetailsList, setSalesBySkuDetails } = salesBySkuSlice.actions;

export default salesBySkuSlice.reducer;
