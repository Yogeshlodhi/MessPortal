import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import leaveService from "./leaveService";

const initialState = {
    leaves: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const applyLeave = createAsyncThunk(
    'leave/apply',
    async(leaveData, thunkAPI) => {
        try {
            return await leaveService.apply(leaveData);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getLeaves = createAsyncThunk(
    'leave/getAll',
    async (_, thunkAPI) => {
        try {
            return await leaveService.getLeaves();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message); 
        }
    }
)

const leaveSlice = createSlice({
    name: 'leave',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(applyLeave.pending, (state) => {
                state.isLoading = true
            })
            .addCase(applyLeave.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.leaves.push(action.payload.data)
                state.message = action.payload.message
            })
            .addCase(applyLeave.rejected, (state, action) => {
                state.isError = true,
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(getLeaves.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getLeaves.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.leaves = action.payload
            })
            .addCase(getLeaves.rejected, (state, action) => {
                state.message = action.payload,
                state.isError = true,
                state.isLoading = false
            })
    }
})

export const { reset } = leaveSlice.actions
export default leaveSlice.reducer