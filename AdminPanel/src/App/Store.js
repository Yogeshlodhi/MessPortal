import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Features/Auth/authSlice'
import studentReducer from '../Features/Students/studentSlice'
import studentProfileReducer from '../Features/Students/studentProfileSlice'
import leaveReducer from '../Features/Leaves/leaveSlice';
import feedBackSlice from '../Features/Feedback/feedBackSlice';
import announceSlice from '../Features/Announcements/announceSlice';
import menuSlice from '../Features/Menu/menuSlice';
import complaintSlice from '../Features/Complaints/complaintSlice';
// import dashboardSlice from '../Features/Dashboad/dashboardSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // dashboard: dashboardSlice,
        students: studentReducer,
        studentProfile: studentProfileReducer,
        leaves: leaveReducer,
        feedbacks: feedBackSlice,
        announcements: announceSlice,
        menu: menuSlice,
        complaints: complaintSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
})
// export const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         students: studentReducer,
//         studentProfile: studentProfileReducer,
//         leaves: leaveReducer,
//     },
// })

// console.log(store.getState())