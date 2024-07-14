import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import feedBackService from './feedBackService';

const initialState = {
    feedbacks : [],
    isLoadingFeedbacks: false,
    isSuccess: false,
    isError: false,
    feedbackMessage: ''
}

export const getAllFeedbacks = createAsyncThunk(
    'feedback/getAll',
    async (_, thunkAPI) => {
        try{
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            return await feedBackService.getAllFeedback({token, adminType});
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message); 
        }
    }
)

const feedBackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers:{
        reset : (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllFeedbacks.pending, (state) => {
                state.isLoadingFeedbacks = true
            })
            .addCase(getAllFeedbacks.fulfilled, (state, action) => {
                state.isLoadingFeedbacks = false,
                state.isSuccess = true,
                state.feedbacks = action.payload.data
                state.feedbackMessage = action.payload.message
            })
            .addCase(getAllFeedbacks.rejected, (state, action) => {
                state.isLoadingFeedbacks = false,
                state.isError = true,
                state.feedbackMessage = action.payload.message
            })
    }
})

export const {reset} = feedBackSlice.actions;
export default feedBackSlice.reducer;