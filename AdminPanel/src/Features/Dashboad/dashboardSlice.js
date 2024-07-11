import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import dashboardService from './dashboardService';

const initialState = {
    students: [],
    leaves: [],
    feedbacks: [],
    complaints: [],
    dailyComplaints: [],
    isLoading: false,
    error: null,
    isFetchingStudents: false,
    isFetchingFeedbacks: false,
    isFetchingComplaints: false,
    isFetchingLeaves: false,
};

export const getComplaints = createAsyncThunk(
    'dashboard/getComplaints',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            return await dashboardService.getComplaints(token, adminType);
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getAllFeedbacks = createAsyncThunk(
    'feedback/getAll',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            return await dashboardService.getAllFeedback({ token, adminType });
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getStudents = createAsyncThunk(
    'dashboard/getStudents',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            return await dashboardService.getAllStudents({ token, adminType });
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getLeavesList = createAsyncThunk(
    'leave/getAll',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            return await dashboardService.getAllLeaves({ token, adminType });
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        // reset: () => initialState,
        setStudents: (state, action) => {
            state.students = action.payload;
        },
        setLeaves: (state, action) => {
            state.leaves = action.payload;
        },
        setFeedbacks: (state, action) => {
            state.feedbacks = action.payload;
        },
        setComplaints: (state, action) => {
            state.complaints = action.payload;
        },
        setDailyComplaints: (state, action) => {
            state.dailyComplaints = state.complaints.filter((complaint) => complaint);
        },
        checkLoadingState: (state) => {
            state.isLoading = state.isFetchingStudents || state.isFetchingFeedbacks || state.isFetchingComplaints || state.isFetchingLeaves
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getComplaints.pending, (state) => {
                state.isFetchingComplaints = true;
                state.isLoading = true;
            })
            .addCase(getComplaints.fulfilled, (state, action) => {
                state.isFetchingComplaints = false;
                state.complaints = action.payload;
                state.isLoading = state.isFetchingStudents || state.isFetchingFeedbacks || state.isFetchingComplaints || state.isFetchingLeaves
            })
            .addCase(getComplaints.rejected, (state, action) => {
                state.isFetchingComplaints = false;
                state.error = action.payload;
                state.isLoading = state.isFetchingStudents || state.isFetchingFeedbacks || state.isFetchingComplaints || state.isFetchingLeaves
            })
            .addCase(getAllFeedbacks.pending, (state) => {
                state.isFetchingFeedbacks = true;
                state.isLoading = true;
            })
            .addCase(getAllFeedbacks.fulfilled, (state, action) => {
                state.isFetchingFeedbacks = false;
                state.feedbacks = action.payload;
                state.isLoading = state.isFetchingStudents || state.isFetchingFeedbacks || state.isFetchingComplaints || state.isFetchingLeaves
            })
            .addCase(getAllFeedbacks.rejected, (state, action) => {
                state.isFetchingFeedbacks = false;
                state.error = action.payload;
                state.isLoading = state.isFetchingStudents || state.isFetchingFeedbacks || state.isFetchingComplaints || state.isFetchingLeaves
            })
            .addCase(getStudents.pending, (state) => {
                state.isFetchingStudents = true;
                state.isLoading = true;
            })
            .addCase(getStudents.fulfilled, (state, action) => {
                state.isFetchingStudents = false;
                state.students = action.payload;
                state.isLoading = state.isFetchingStudents || state.isFetchingFeedbacks || state.isFetchingComplaints || state.isFetchingLeaves
            })
            .addCase(getStudents.rejected, (state, action) => {
                state.isFetchingStudents = false;
                state.error = action.payload;
                state.isLoading = state.isFetchingStudents || state.isFetchingFeedbacks || state.isFetchingComplaints || state.isFetchingLeaves
            })
            .addCase(getLeavesList.pending, (state) => {
                state.isFetchingLeaves = true;
                state.isLoading = true;
            })
            .addCase(getLeavesList.fulfilled, (state, action) => {
                state.isFetchingLeaves = false;
                state.leaves = action.payload;
                state.isLoading = state.isFetchingStudents || state.isFetchingFeedbacks || state.isFetchingComplaints || state.isFetchingLeaves
            })
            .addCase(getLeavesList.rejected, (state, action) => {
                state.isFetchingLeaves = false;
                state.error = action.payload;
                state.isLoading = state.isFetchingStudents || state.isFetchingFeedbacks || state.isFetchingComplaints || state.isFetchingLeaves
            });
    }
});

export const { setStudents, setLeaves, setFeedbacks, setComplaints, setDailyComplaints } = dashboardSlice.actions;
export default dashboardSlice.reducer;


// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import complaintService from '../Complaints/complaintService';
// import feedBackService from '../Feedback/feedBackService';

// const initialState = {
//     students: [],
//     leaves: [],
//     feedbacks: [],
//     complaints: [],
//     dailyComplaints: [],
//     isLoading: false,
// }


// export const getComplaints = createAsyncThunk(
//     'dashboard/getcomplaints',
//     async (_, thunkAPI) => {
//         try {
//             const state = thunkAPI.getState();
//             const token = state.auth.admin.token;
//             const adminType = state.auth.admin.adminType;
//             return await complaintService.getComplaints(token, adminType);
//         } catch (error) {
//             console.log(error.response.data.message);
//             const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// )

// export const getAllFeedbacks = createAsyncThunk(
//     'feedback/getAll',
//     async (_, thunkAPI) => {
//         try{
//             const state = thunkAPI.getState();
//             const token = state.auth.admin.token;
//             const adminType = state.auth.admin.adminType;
//             return await feedBackService.getAllFeedback({token, adminType});
//         }catch(error){
//             const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// )

// export const getStudents = createAsyncThunk(
//     'dashboard/getstudents',
//     async (_, thunkAPI) => {
//         try{
//             const state = thunkAPI.getState();
//             const token = state.auth.admin.token;
//             const adminType = state.auth.admin.adminType;

//         }catch(error){

//         }
//     }
// )

// const dashboardSlice = createSlice({
//     name: 'dashboard',
//     initialState,
//     reducers: {
//         // reset: () => initialState,
//         setStudents: (state, action) => {
//             state.students = action.payload;
//         },
//         setLeaves: (state, action) => {
//             state.leaves = action.payload;
//         },
//         setFeedbacks : (state, action) => {
//             state.feedbacks = action.payload;
//         },
//         setComplaints: (state, action) => {
//             state.complaints = action.payload;
//         },
//         setDailyComplaints: (state, action) => {
//             state.dailyComplaints = state.complaints.filter((complaint) => complaint)
//         }
//     },
//     extraReducers: (builder) => {

//     }
// })

// export const {setStudents, setLeaves, setFeedbacks, setComplaints, setDailyComplaints} = dashboardSlice.actions
// export default dashboardSlice.reducer;