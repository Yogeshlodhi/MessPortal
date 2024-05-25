import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/Auth/authSlice'
import studentReducer from '../Features/Students/studentSlice'
import studentProfileReducer from '../Features/Students/studentProfileSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        students: studentReducer,
        studentProfile: studentProfileReducer,
    },
})