import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import messService from './messService';

const initialState = {
    announcements: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    
    // menu state
    menu: [],
    isErrorMenu: false,
    isMenuSuccess: false,
    isMenuLoading: false,
    menuMessage: '',
    // menu state
    
    // messInfo State
    messInfo: {},
    isLoadingMess: false,
    isErrorMess: false,
    messMessage: '',
    isMessSuccess: false,
    // messInfo State

    // complaints state
    complaints: [],
    isPostingComplaint: false,
    complaintMessage: '',
    isComplaintError: false,
    isComplaintSuccess: false,
    // complaints state

    // feedback state
    feedback: [],
    isPostingFeedback: false,
    feedbackMessage: '',
    isFeedbackError: false,
    isFeedbackSuccess: false,
    // feedback state
}

export const getMessInfo = createAsyncThunk(
    'messInfo/getInfo',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.student.token;
            return await messService.getMessInfoService(token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getAnnouncements = createAsyncThunk(
    'mess/announcements',
    async (_, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.student.token;
            return await messService.getAnnouncements();
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
            return await messService.getMenu();
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
            return await messService.postFeedback(data);
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
            // const token = thunkAPI.getState().auth.student.token;
            return await messService.postComplaint(data);
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
                state.feedbackMessage = action.payload
            })
            .addCase(postComplaint.pending, (state) => {
                state.isPostingComplaint = true
            })
            .addCase(postComplaint.fulfilled, (state, action) => {
                state.isPostingComplaint = false,
                state.isComplaintSuccess = true,
                state.complaints = action.payload,
                state.complaintMessage = action.payload.message,
                state.isComplaintError = false
            })
            .addCase(postComplaint.rejected, (state, action) => {
                state.isComplaintError = true,
                state.isPostingComplaint = false,
                state.isComplaintSuccess = false,
                state.complaintMessage = action.payload
            })
            .addCase(getMenu.pending, (state) => {
                state.isMenuLoading = true
            })
            .addCase(getMenu.fulfilled, (state, action) => {
                state.isMenuLoading = false,
                state.isMenuSuccess = true,
                state.menu = action.payload.data,
                state.menuMessage = action.payload.message
            })
            .addCase(getMenu.rejected, (state, action) => {
                state.isErrorMenu = true,
                state.isMenuLoading = false,
                state.menuMessage = action.payload
            })
            .addCase(getMessInfo.pending, (state) => {
                state.isLoadingMess = true
            })
            .addCase(getMessInfo.fulfilled, (state, action) => {
                state.messInfo = action.payload.data,
                state.isLoadingMess = false,
                state.isErrorMess = false,
                state.messMessage = action.payload.message
            })
            .addCase(getMessInfo.rejected, (state, action) => {
                state.isLoadingMess = false;
                state.isErrorMess = true;
                state.messMessage = action.payload;
            })
    }
})

export const { reset } = messSlice.actions
export default messSlice.reducer