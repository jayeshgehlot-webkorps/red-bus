import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name :"search",
    initialState:{
        from:null,
        to:null
    },
    reducers:{
        setfrom: (state, action) => {
            state.from = action.payload
        },
        setto: (state, action) => {
            state.to = action.payload
        }
    }
})
export const { setfrom, setto } = searchSlice.actions;
export default searchSlice.reducer;