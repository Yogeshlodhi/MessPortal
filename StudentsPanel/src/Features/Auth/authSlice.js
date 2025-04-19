import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const student = JSON.parse(localStorage.getItem('student'));

const initialState = {
    student: student ? student : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',

    //logout
    isLogout: false,
    isLogoutSuccess: false,
    isLogoutError: false,
    logoutMessage: '',
    //logout

    // update profile states
    isLoadingUpdate: false,
    isUpdateSuccess: false,
    isUpdateError: false,
    updateMessage: '',
    // update profile states
}

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

export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (error) {
            console.log(error.response.data.message)
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const updateStudent = createAsyncThunk(
    'auth/update',
    async (user, thunkAPI) => {
        try {
            return await authService.update(user);
        } catch (error) {
            console.log(error.response.data.message)
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try{
            return await authService.logout();
        }catch(error){
            console.log(error.response.data.message)
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
                state.message = '',
                //
                state.isLoadingUpdate = false,
                state.isUpdateSuccess = false,
                state.isUpdateError = false,
                state.updateMessage = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isSuccess = true
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false,
                    state.isError = true,
                    state.message = action.payload
                state.student = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                // state.student = action.payload.data
                state.student = {
                    ...action.payload.data,
                    // console.log(action.payload)
                    avatar: action.payload.data.avatar?.url
                }
                localStorage.setItem('student', JSON.stringify(state.student));
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true
                state.message = action.payload
                state.student = null
            })
            .addCase(updateStudent.pending, (state) => {
                state.isLoadingUpdate = true
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                state.isLoadingUpdate = false,
                state.isUpdateSuccess = true,
                state.updateMessage = action.payload.message
                state.student = {
                    ...action.payload.data,
                    avatar: action.payload.data.avatar.url
                }
                localStorage.setItem('student', JSON.stringify(state.student));
            })
            .addCase(updateStudent.rejected, (state, action) => {
                state.isLoadingUpdate = false,
                state.isUpdateError = true
                state.updateMessage = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLogout = false,
                state.isLogoutSuccess = true,
                state.logoutMessage = 'Logout Successful'
                state.student = null
            })
            .addCase(logout.pending, (state) => {
                state.isLogout = true
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLogout = false,
                state.isLogoutError = true,
                state.logoutMessage = action.payload,
                state.isLogoutSuccess = false
            })
    }
})

export const { reset } = authSlice.actions;
export default authSlice.reducer;