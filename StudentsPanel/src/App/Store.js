import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../Features/Auth/authSlice'
import leaveReducer from '../Features/Leave/leaveSlice'
import announcementReducer from '../Features/Mess/messSlice'
// import messInfoSlice from "../Features/MessInfo/messInfoSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        leave: leaveReducer,
        mess: announcementReducer,
        // messInfo: messInfoSlice
    },
})