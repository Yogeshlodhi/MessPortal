import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminInfo: localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state,action) => {
            state.adminInfo = action.payload;
            localStorage.setItem('admin',JSON.stringify(action.payload))
        },
        logout: (state, action) => {
            state.adminInfo = null;
            localStorage.removeItem('admin');
        }
    }
})

export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer;
