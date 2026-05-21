import { createSlice } from "@reduxjs/toolkit";
const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        selectedSeats: [],
        myBookings: [],
        currentBooking: null,

    },
    reducers: {
        selectedSeats: (state, action) => {
            state.selectedSeats = action.payload;
        },
        mybookings: (state, action) => {
            state.mybookings = action.payload;
        },
        currentBooking: (state, action) => {
            state.currentBooking = action.payload;
        }
    }
})

export const { selectedSeats, mybookings, currentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;