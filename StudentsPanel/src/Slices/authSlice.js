import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    // JSON.parse ==> converts to actual object, rather than just a string
    studentInfo: localStorage.getItem('StudentInfo') ? JSON.parse(localStorage.getItem('StudentInfo')) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.studentInfo = action.payload
            localStorage.setItem('StudentInfo', JSON.stringify(action.payload))
        },
        logout: (state, action) => {
            state.studentInfo = null;
            localStorage.removeItem('StudentInfo')
        }
    }
}
);

export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer;