import { createSlice, current } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const CategoryListSlice = createSlice({
  initialState: initialState.categoryList,
  name: "categoryList",
  reducers: {
    setCategoryList: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
    setUpdateCategory: (state, { payload }) => {
      const result = current(state).data.reduce((acc, item) => {
        if (item.id === payload.id) {
          acc.push(payload);
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
      state.data = result;
    },
  },
});

export const { setCategoryList, setUpdateCategory } = CategoryListSlice.actions;

export default CategoryListSlice.reducer;

const selectCategoryList = (state) => state.categoryList;

export { selectCategoryList };
