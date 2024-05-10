import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../Features/Auth/authSlice'
import leaveReducer from '../Features/Leave/leaveSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        leave: leaveReducer,
    },
})