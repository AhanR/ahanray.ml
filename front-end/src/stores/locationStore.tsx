import { configureStore } from "@reduxjs/toolkit";
import locationSlices from "./locationSlices";

export const locationStore = configureStore({
    reducer: {
        location: locationSlices,
    },
})

export type RootState = ReturnType<typeof locationStore.getState>   
export type AppDispatch = typeof locationStore.dispatch