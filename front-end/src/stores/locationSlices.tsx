import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LocationState {
    location : string
}

export const locationSlice = createSlice({
    name: "location",
    initialState: "/",
    reducers: {
        changeLocation : (_, action: PayloadAction<string>) => action.payload
    }
})

export const { changeLocation } = locationSlice.actions

export default locationSlice.reducer