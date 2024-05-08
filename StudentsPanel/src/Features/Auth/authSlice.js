import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const student = JSON.parse(localStorage.getItem('student'));

const initialState = {
    student : student ? student : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


// Register the student
// auth/register is the action
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false,
            state.isError = false,
            state.isSuccess = false,
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
                // state.isError = false,
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                // state.isError = false,
                state.student = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.message = action.payload
                state.student = null
            })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;