import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const brandsSlice = createSlice({
  initialState: initialState.brands,
  name: "brands",
  reducers: {
    setBrandList: (state, action) => {
      state.brandList = action.payload;
    },
    setAmazonSpApiCredentialsList: (state, action) => {
      state.amazonSpApiCredentials = action.payload;
    },
    setAmazonAdvertisingCredentialsList: (state, action) => {
      state.amazonAdvertisingCredentials = action.payload;
    },
  },
});

export const { setBrandList, setAmazonSpApiCredentialsList, setAmazonAdvertisingCredentialsList } = brandsSlice.actions;

export default brandsSlice.reducer;

const selectBrandList = (state) => state.brands.brandList;
const selectAmazonSpApiCredentialsList = (state) =>
  state.brands.amazonSpApiCredentials;
const selectAmazonAdvertisingCredentialsList = (state) =>
  state.brands.amazonAdvertisingCredentials;

export {
  selectBrandList,
  selectAmazonSpApiCredentialsList,
  selectAmazonAdvertisingCredentialsList,
};
