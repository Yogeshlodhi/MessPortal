import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import leaveService from './leaveService';

const initialState = {
    leaves: [],
    isLoadingLeaves: false,
    isSuccess: false,
    isError: false,
    leavesMessage: ''
}

export const getLeavesList = createAsyncThunk(
    'leave/getAll',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            return await leaveService.getAllLeaves({ token, adminType });
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
            const state = thunkAPI.getState();
            const { leaveId, status } = data;
            const token = state.auth.admin.token;

            const updatedLeave = await leaveService.leaveAction(token, leaveId, status);
            let updatedLeavesList;
            if (updatedLeave) {
                updatedLeavesList = await leaveService.getAllLeaves({ token, adminType: state.auth.admin.adminType });
                thunkAPI.dispatch(setLeavesList(updatedLeavesList));
            }
            return updatedLeave;
        } catch (error) {
            const errorMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);


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
            });
    }
});

export const { reset, removeLeave, setLeavesList } = leaveSlice.actions;
export default leaveSlice.reducer;