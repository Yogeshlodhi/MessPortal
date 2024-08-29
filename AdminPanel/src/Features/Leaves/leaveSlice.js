import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import leaveService from './leaveService';

const initialState = {
    leaves: [],
    isLoadingLeaves: false,
    isSuccess: false,
    isError: false,
    leavesMessage: '',

    filteredLeaves: [],
    isLoadingFilter: false,
    isErrorFilter: false,
    isSuccessFilter: false,
    filterMessage: '',
}

export const getLeavesList = createAsyncThunk(
    'leave/getAll',
    async (_, thunkAPI) => {
        try {
            return await leaveService.getAllLeaves();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const takeAction = createAsyncThunk(
    'leave/takeAction',
    async (data, thunkAPI) => {
        try {
            const { leaveId, status } = data;
            const updatedLeave = await leaveService.leaveAction(leaveId, status);
            let updatedLeavesList;
            if (updatedLeave) {
                updatedLeavesList = await leaveService.getAllLeaves();
                thunkAPI.dispatch(setLeavesList(updatedLeavesList));
            }
            return updatedLeave;
        } catch (error) {
            const errorMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

export const getFilteredLeaves = createAsyncThunk(
    'leave/getFiltered',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            return await leaveService.getTodayLeaves(token);
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
        reset: (state) => initialState,
        setLeavesList: (state, action) => {
            state.leaves = action.payload.data;
        },
        removeLeave: (state, action) => {
            state.leaves = state.leaves.filter(
                (leave) => leave._id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLeavesList.fulfilled, (state, action) => {
                state.leaves = action.payload.data;
                state.isLoadingLeaves = false;
                state.isSuccess = true;
                state.leavesMessage = action.payload.message;
            })
            .addCase(getLeavesList.pending, (state) => {
                state.isLoadingLeaves = true;
            })
            .addCase(getLeavesList.rejected, (state, action) => {
                state.leaves = [];
                state.isLoadingLeaves = false;
                state.isError = true;
                state.leavesMessage = action.payload.message;
            })
            .addCase(takeAction.pending, (state) => {
                state.isLoadingLeaves = true;
            })

            .addCase(takeAction.fulfilled, (state, action) => {
                const updatedLeave = action.payload;
                if (Array.isArray(state.leaves)) {
                    const index = state.leaves.findIndex(leave => leave._id === updatedLeave._id);
                    if (index !== -1) {
                        state.leaves[index] = updatedLeave;
                    }
                }
                state.isLoadingLeaves = false;
            })
            .addCase(takeAction.rejected, (state, action) => {
                state.isLoadingLeaves = false;
                state.isError = true;
                state.leavesMessage = action.payload.message;
            })
            .addCase(getFilteredLeaves.pending, (state) => {
                state.isLoadingFilter = true
            })
            .addCase(getFilteredLeaves.fulfilled, (state, action) => {
                state.isLoadingFilter = false,
                    state.isSuccessFilter = true,
                    state.filteredLeaves = action.payload.data
                state.filterMessage = action.payload.message
            })
            .addCase(getFilteredLeaves.rejected, (state, action) => {
                state.isLoadingFeedbacks = false,
                    state.isErrorFilter = true,
                    state.filterMessage = action.payload
            })
    }
});

export const { reset, removeLeave, setLeavesList } = leaveSlice.actions;
export default leaveSlice.reducer;