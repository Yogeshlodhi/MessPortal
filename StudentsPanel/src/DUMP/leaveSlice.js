import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    leaves : [],
}

const leaveSlice = createSlice({
    name: 'leave',
    initialState,
    reducers: {
        applyLeave: (state, action) => {
            state.leaves = action.payload
        },
        // getSliceList: (state, action) => {
        //     state.leaves =
        // }
    }
})