import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const poTemplateSlice = createSlice({
    initialState: initialState.poTemplate,
    name: "poTemplate",
    reducers: {
        setPoTemplateList: (state, action) => {
            state.poTemplateList = action.payload;
        },
        setSaveColumnConfiguration: (state, action) => {
            state.saveColumnConfiguration = action.payload;
        },
        setPoTemplateColumnList: (state, action) => {
            state.poTemplateColumnList = action.payload;
        },
        setSaveTableConfiguration: (state, action) => {
            state.saveTableConfiguration = action.payload;
        },
    },
});

export const {
    setPoTemplateList,
    setSaveColumnConfiguration,
    setPoTemplateColumnList,
    setSaveTableConfiguration,
} = poTemplateSlice.actions;

export default poTemplateSlice.reducer;

const selectPoTemplateList = (state) =>
    state.poTemplate.poTemplateList;

export { selectPoTemplateList };
