import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/Auth/authSlice'
import studentReducer from '../Features/Students/studentSlice'
import studentProfileReducer from '../Features/Students/studentProfileSlice'
import leaveReducer from '../Features/Leaves/leaveSlice';
import feedBackSlice from '../Features/Feedback/feedBackSlice';
import announceSlice from '../Features/Announcements/announceSlice';
import menuSlice from '../Features/Menu/menuSlice';
import complaintSlice from '../Features/Complaints/complaintSlice';
import messInfoSlice from '../Features/MessInfo/messInfoSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        students: studentReducer,
        studentProfile: studentProfileReducer,
        leaves: leaveReducer,
        feedbacks: feedBackSlice,
        announcements: announceSlice,
        menu: menuSlice,
        complaints: complaintSlice,
        messInfo: messInfoSlice
    },
    devTools: process.env.NODE_ENV !== 'production',
})
