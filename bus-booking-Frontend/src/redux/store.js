import authSlice from "./slices/authSlice.js"
import bookingSlice from "./slices/bookingSlice"
import busSlice from "./slices/busSlice"
import searchSlice from "./slices/searchSlice.js"
import{ configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        bus: busSlice,
        booking: bookingSlice,
        search:searchSlice
    }
})



