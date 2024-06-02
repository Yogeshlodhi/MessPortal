import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import feedBackService from './feedBackService';

const initialState = {
    feedbacks : [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
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
                state.isLoading = true
            })
            .addCase(getAllFeedbacks.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.feedbacks = action.payload
            })
            .addCase(getAllFeedbacks.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.message = action.payload
            })
    }
})

export const {reset} = feedBackSlice.actions;
export default feedBackSlice.reducer;