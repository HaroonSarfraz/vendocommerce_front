import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initialState';

export const CategoryListSlice = createSlice({
  initialState: initialState.categoryList,
  name: 'categoryList',
  reducers: {
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
  },
});

export const { setCategoryList } = CategoryListSlice.actions;

export default CategoryListSlice.reducer;

const selectCategoryList = (state) => state.categoryList;

export { selectCategoryList };
