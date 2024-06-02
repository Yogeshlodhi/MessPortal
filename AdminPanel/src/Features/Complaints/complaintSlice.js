import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import complaintService from './complaintService';

const initialState = {
    complaints: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}


export const getComplaintsList = createAsyncThunk(
    'complaints/getAll',
    async (_, thunkAPI) => {
        try{
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            return await complaintService.getComplaints(token, adminType);
        }catch(error){
            console.log(error.response.data.message);
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const complaintSlice = createSlice({
    name: 'complaints',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getComplaintsList.fulfilled, (state, action) => {
                state.complaints = action.payload,
                state.isLoading = false,
                state.isSuccess = true
            })
            .addCase(getComplaintsList.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getComplaintsList.rejected, (state, action) => {
                state.complaints = [],
                state.isLoading = false,
                state.isError = true,
                state.message = action.payload
            })
    }
})

export const {reset} = complaintSlice.actions;
export default complaintSlice.reducer;