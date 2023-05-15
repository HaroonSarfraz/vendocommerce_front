import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

const inventoryDashBoardRstockSclice = createSlice({
  initialState: initialState.inventoryDashBoardRstock,
  name: "inventoryDashBoardRstock",
  reducers: {
    setInventoryDashBoardRstock: (state, action) => {
      state.inventoryDashBoardRstock = action.payload;
    },
  },
});
export const { setInventoryDashBoardRstock } =
  inventoryDashBoardRstockSclice.actions;
const selectInventoryDashBoardRstockSclice = (state) =>
  state.inventoryDashBoardRstock;

export { selectInventoryDashBoardRstockSclice };
export default inventoryDashBoardRstockSclice.reducer;
