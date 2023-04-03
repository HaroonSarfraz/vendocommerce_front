import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initialState';

export const skuSlice = createSlice({
  initialState: initialState.sku,
  name: 'sku',
  reducers: {
    setSalesSKUDetailsList: (state, action) => {
      state.salesSKUDetailsList = action.payload;
    },
    setSalesBySKUDetails: (state, action) => {
      state.salesBySKUDetails = action.payload;
    },
  }
});

export const { setSalesBySKUDetails, setSalesSKUDetailsList } =
  skuSlice.actions;

export default skuSlice.reducer;
