import {createSlice} from '@reduxjs/toolkit';


const student = localStorage.getItem('StudentInfo');

const initialState = {
    // JSON.parse ==> converts to actual object, rather than just a string
    studentInfo: student ? JSON.parse(student) : null,
    // isError: false,
    // isSuccess: false,
    // isLoading: false,
    // message: '',
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
            localStorage.clear()
            localStorage.removeItem('StudentInfo')
        }
    }
}
);

export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer;