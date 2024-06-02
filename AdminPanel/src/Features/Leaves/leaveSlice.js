import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import leaveService from './leaveService';

const initialState = {
    LeavesList: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const getLeavesList = createAsyncThunk(
    'leave/getAll',
    async (_, thunkAPI) => {
        try{
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            return await leaveService.getAllLeaves({token, adminType});
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message); 
        }
    }
)


const leaveSlice = createSlice({
    name: 'leave',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder 
            .addCase(getLeavesList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getLeavesList.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.LeavesList = action.payload.LeavesList,
                state.message = action.payload
            })
    }
})

export const {reset} = leaveSlice.actions;
export default leaveSlice.reducer;