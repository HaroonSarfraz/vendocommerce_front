import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const CategoryProductListSlice = createSlice({
  initialState: initialState.categoryProductList,
  name: "categoryProductList",
  reducers: {
    setCategoryProductList: (state, action) => {
      state.categoryProductList = action.payload;
    },
  },
});

export const { setCategoryProductList } = CategoryProductListSlice.actions;

export default CategoryProductListSlice.reducer;

const selectCategoryProductList = (state) => state.categoryProductList;

export { selectCategoryProductList };
