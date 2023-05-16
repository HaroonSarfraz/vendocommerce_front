import { createSlice } from "@reduxjs/toolkit";
import initialState from "../initialState";

export const poTemplateSlice = createSlice({
    initialState: initialState.poTemplate,
    name: "poTemplate",
    reducers: {
        setPoTemplateList: (state, action) => {
            state.poTemplateList = action.payload;
        },
        setPoTemplateObj: (state, action) => {
            state.poTemplateObj = action.payload;
        },
    },
});

export const {
    setPoTemplateList, setPoTemplateObj
} = poTemplateSlice.actions;

export default poTemplateSlice.reducer;
