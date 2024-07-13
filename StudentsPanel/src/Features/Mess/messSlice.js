import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import messService from './messService';

const initialState = {
    announcements: [],
    menu: [],
    complaints: [],
    messInfo: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    feedback: [],
    isPostingFeedback: false,
    feedbackMessage: '',
    isFeedbackError: false,
    isFeedbackSuccess: false,
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

export const getMenu = createAsyncThunk(
    'mess/menu',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.student.token;
            return await messService.getMenu(token);
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

export const postComplaint = createAsyncThunk(
    'mess/complaint',
    async (data, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.student.token;
            return await messService.postComplaint(token, data);
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getMessInfo =  createAsyncThunk(
    'mess/messInfo',
    async (_, thunkAPI) => {
        try {
            return await messService.getMessInfoService();
        } catch (error) {
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
                state.announcements = action.payload.data
            })
            .addCase(getAnnouncements.rejected, (state, action) => {
                state.isError = true,
                state.isLoading = false,
                state.message = action.payload.message
            })
            .addCase(postFeedback.pending, (state) => {
                state.isPostingFeedback = true
            })
            .addCase(postFeedback.fulfilled, (state, action) => {
                state.isPostingFeedback = false,
                state.isFeedbackSuccess = true,
                state.feedback = action.payload,
                state.feedbackMessage = action.payload.message
                state.isFeedbackError = false
            })
            .addCase(postFeedback.rejected, (state, action) => {
                state.isFeedbackError = true
                state.isPostingFeedback = false,
                state.isFeedbackSuccess = false,
                state.feedbackMessage = action.payload.message
            })
            .addCase(postComplaint.pending, (state) => {
                state.isLoading = true
            })
            .addCase(postComplaint.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.complaints = action.payload
            })
            .addCase(postComplaint.rejected, (state, action) => {
                state.isError = true,
                state.isLoading = false,
                state.message = action.payload
            })
            .addCase(getMenu.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMenu.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.menu = action.payload
            })
            .addCase(getMenu.rejected, (state, action) => {
                state.isError = true,
                state.isLoading = false,
                state.message = action.payload
            })
            .addCase(getMessInfo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMessInfo.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.messInfo = action.payload
            })
            .addCase(getMessInfo.rejected, (state, action) => {
                state.isError = true,
                state.isLoading = false,
                state.message = action.payload
            })
    }
})

export const { reset } = messSlice.actions
export default messSlice.reducer