import { createSlice, current } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const CategoryProductListSlice = createSlice({
  initialState: initialState.categoryProductList,
  name: "categoryProductList",
  reducers: {
    setCategoryProductList: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
    setUpdateCategoryProduct: (state, { payload }) => {
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

export const { setCategoryProductList, setUpdateCategoryProduct } =
  CategoryProductListSlice.actions;

export default CategoryProductListSlice.reducer;

const selectCategoryProductList = (state) => state.categoryProductList;

export { selectCategoryProductList };
