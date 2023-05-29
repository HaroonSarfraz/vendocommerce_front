import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const CategoryProductListSlice = createSlice({
  initialState: initialState.categoryProductList,
  name: "categoryProductList",
  reducers: {
    setCategoryProductList: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { setCategoryProductList } = CategoryProductListSlice.actions;

export default CategoryProductListSlice.reducer;

const selectCategoryProductList = (state) => state.categoryProductList;

export { selectCategoryProductList };
