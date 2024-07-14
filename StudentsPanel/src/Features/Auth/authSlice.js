import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const student = JSON.parse(localStorage.getItem('student'));
  
const initialState = {
    student : student ? student : null,
    dp: student ? student.profileImage : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
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
        try{
            const token = thunkAPI.getState().auth.student.token;
            console.log(user)
            return await authService.update(user, token);
        }catch(error){
            console.log(error.response.data.message)
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const updateImage = createAsyncThunk(
    'auth/updateImage',
    async (user, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.student.token;
            return await authService.updateImage(user, token);
        }catch(error){
            console.log(error.response.data.message)
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
                state.student = action.payload.data
                localStorage.setItem('student', JSON.stringify(action.payload.data));
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true
                state.message = action.payload
                state.student = null
            })
            .addCase(updateStudent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.student = {
                    ...action.payload.data,
                    token: state.student.token 
                };
            })
            .addCase(updateStudent.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true
                state.message = action.payload
                state.student = null
            })
            .addCase(updateImage.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateImage.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.dp = action.payload.data
            })
            .addCase(updateImage.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.student = null
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;