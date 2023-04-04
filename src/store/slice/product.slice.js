import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initialState';

export const productSlice = createSlice({
  initialState: initialState.sku,
  name: 'product',
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
    }
  }
});

export const {
  setSalesByProductList,
  setSaveColumnConfiguration,
  setSalesByProductColumnList,
  setSaveTableConfiguration
} = productSlice.actions;

export default productSlice.reducer;
