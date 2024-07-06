// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import leaveService from './leaveService';

// const initialState = {
//     LeavesList: [],
//     isLoading: false,
//     isSuccess: false,
//     isError: false,
//     message: ''
// }

// export const getLeavesList = createAsyncThunk(
//     'leave/getAll',
//     async (_, thunkAPI) => {
//         try{
//             const state = thunkAPI.getState();
//             const token = state.auth.admin.token;
//             const adminType = state.auth.admin.adminType;
//             return await leaveService.getAllLeaves({token, adminType});
//         }catch(error){
//             const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//             return thunkAPI.rejectWithValue(message); 
//         }
//     }
// )

// export const takeAction = createAsyncThunk(
//     'leave/takeAction',
//     async (data, thunkAPI) => {
//         try {
//             const state = thunkAPI.getState();
//             const token = state.auth.admin.token;


//             const { leaveId, status } = data; 
//             return await leaveService.leaveAction(token, status, leaveId );
//         } catch (error) {
//             const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// )

// const leaveSlice = createSlice({
//     name: 'leave',
//     initialState,
//     reducers: {
//         reset: (state) => initialState,
//     },
//     extraReducers: (builder) => {
//         builder 
//             .addCase(getLeavesList.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(getLeavesList.fulfilled, (state, action) => {
//                 state.isLoading = false,
//                 state.isSuccess = true,
//                 state.LeavesList = action.payload.LeavesList,
//                 state.message = action.payload
//             })
//             .addCase(getLeavesList.rejected, (state, action) => {
//                 state.isLoading = false,
//                 state.isSuccess = false,
//                 state.message = action.payload
//             })
//             .addCase(takeAction.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(takeAction.fulfilled, (state, action) => {
//                 const updatedLeave = action.payload;
//                 console.log("Updated Leave : ", action.payload)
//                 const index = state.LeavesList.findIndex(leave => leave._id === updatedLeave._id);
//                 if (index !== -1) {
//                     state.LeavesList[index] = updatedLeave;
//                 }
//                 state.isLoading = false;
//             })
//             .addCase(takeAction.rejected, (state) => {
//                 state.isLoading = false
//             })
//     }
// })

// export const {reset} = leaveSlice.actions;
// export default leaveSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            // const leaves = await leaveService.getAllLeaves({ token, adminType });
            // console.log("Leaves Data : ", leaves.data);
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
            state.LeavesList = action.payload;
        },
        removeLeave: (state, action) => {
            state.LeavesList = state.LeavesList.filter(
                (leave) => leave._id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLeavesList.fulfilled, (state, action) => {
                state.LeavesList = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(getLeavesList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLeavesList.rejected, (state, action) => {
                state.LeavesList = [];
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(takeAction.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(takeAction.fulfilled, (state, action) => {
                const updatedLeave = action.payload;
                if (Array.isArray(state.LeavesList)) {
                    const index = state.LeavesList.findIndex(leave => leave._id === updatedLeave._id);
                    if (index !== -1) {
                        state.LeavesList[index] = updatedLeave;
                    }
                }
                state.isLoading = false;
            })
            .addCase(takeAction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset, removeLeave, setLeavesList } = leaveSlice.actions;
export default leaveSlice.reducer;