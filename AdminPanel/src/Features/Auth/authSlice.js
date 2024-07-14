import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const admin = JSON.parse(localStorage.getItem('admin'));

const initialState = {
    admin: admin ? admin : null,
    isError : false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const login = createAsyncThunk(
    'auth/login',
    async (admin, thunkAPI) => {
        try{
            return await authService.login(admin)
        }catch(error){
            // console.log(error.response.data.message);
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await authService.logout()
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
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem('admin', JSON.stringify(action.payload.data))
                state.admin = action.payload.data,
                state.isLoading = false,
                state.isSuccess = true
                state.message = action.payload.message
            })
            .addCase(login.rejected, (state, action) => {
                console.log(action.payload)
                state.admin = null,
                state.isLoading = false,
                state.isError = true,
                state.message = action.payload.message
            })
            .addCase(login.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.admin = null
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;