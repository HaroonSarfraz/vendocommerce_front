import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const reportLogsSlice = createSlice({
  initialState: initialState.reportLogs,
  name: "reportLogs",
  reducers: {
    setReportLogs: (state, action) => {
      state.reportLogsData = action.payload;
    },
  },
});

export const { setReportLogs } = reportLogsSlice.actions;

export default reportLogsSlice.reducer;

const selectReportLogs = (state) => state.reportLogs.reportLogsData;

export { selectReportLogs };
