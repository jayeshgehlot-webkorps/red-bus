import { createSlice } from "@reduxjs/toolkit";
const busSlice = createSlice({
    name: "bus",
    initialState: {
        buses: [],
        selectedBus: null,
        filter: {
            busTypes: []
        }
    },
    reducers: {
        setBuses: (state, action) => {
            state.buses = action.payload
        },
        addBus: (state, action) => {
            state.buses.push(action.payload);
        },
        deleteBus: (state, action) => {
            state.buses = state.buses.filter(
                (bus) => bus._id !== action.payload
            );
        },
        updateBus: (state, action) => {
            const index = state.buses.findIndex(
                (bus) => bus._id === action.payload._id
            );
            state.buses[index] = action.payload;
        },
        setSelectedBus: (state, action) => {
            state.selectedBus = action.payload;
        },
        setBusTypes: (state, action) => {
            state.filter.busTypes = action.payload;
        }
    }
})

export const { setBuses, addBus, deleteBus, updateBus, setSelectedBus,setBusTypes } = busSlice.actions;
export default busSlice.reducer;
