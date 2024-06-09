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

export const takeAction = createAsyncThunk(
    'leave/takeAction',
    async (data, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
   

            const { leaveId, status } = data; // Assuming data contains leaveId and action
            // console.log(leaveId)
            // Call the service to take action on the leave request
            return await leaveService.leaveAction(token, status, leaveId );
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
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
            .addCase(getLeavesList.rejected, (state, action) => {
                state.isLoading = false,
                state.isSuccess = false,
                state.message = action.payload
            })
            .addCase(takeAction.pending, (state) => {
                state.isLoading = true
            })
            .addCase(takeAction.fulfilled, (state, action) => {
                const updatedLeave = action.payload;
                const index = state.LeavesList.findIndex(leave => leave._id === updatedLeave._id);
                if (index !== -1) {
                    state.LeavesList[index] = updatedLeave;
                }
                state.isLoading = false;
            })
            .addCase(takeAction.rejected, (state) => {
                state.isLoading = false
            })
    }
})

export const {reset} = leaveSlice.actions;
export default leaveSlice.reducer;