import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import messService from './messService';

const initialState = {
    announcements: [],
    feedback: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


export const getAnnouncements = createAsyncThunk(
    'mess/announcements',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.student.token;
            return await messService.getAnnouncements(token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const postFeedback = createAsyncThunk(
    'mess/feedback',
    async (data, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.student.token;
            return await messService.postFeedback(token, data);
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const messSlice = createSlice({
    name: 'mess',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAnnouncements.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAnnouncements.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.announcements = action.payload
            })
            .addCase(getAnnouncements.rejected, (state, action) => {
                state.isError = true,
                state.isLoading = false,
                state.message = action.payload
            })
            .addCase(postFeedback.pending, (state) => {
                state.isLoading = true
            })
            .addCase(postFeedback.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.feedback = action.payload
            })
            .addCase(postFeedback.rejected, (state, action) => {
                state.isError = true,
                state.isLoading = false,
                state.message = action.payload
            })
    }
})

export const { reset } = messSlice.actions
export default messSlice.reducer