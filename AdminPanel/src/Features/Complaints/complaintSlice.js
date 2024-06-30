import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            return await complaintService.getComplaints(token, adminType);
        } catch (error) {
            console.log(error.response.data.message);
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const deleteComplaint = createAsyncThunk(
    'complaints/delete',
    async (complaintId, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            await complaintService.deleteComplaint(token, complaintId);
            const updatedComplaints = await complaintService.getComplaints(token, state.auth.admin.adminType);
            thunkAPI.dispatch(setComplaintsList(updatedComplaints)); 
            return complaintId;
        } catch (error) {
            console.log(error.response.data.message);
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const complaintSlice = createSlice({
    name: 'complaints',
    initialState,
    reducers: {
        reset: (state) => initialState,
        setComplaintsList: (state, action) => {
            state.complaints = action.payload;
        },
        removeComplaint: (state, action) => {
            state.complaints = state.complaints.filter(
                (complaint) => complaint.id !== action.payload
            );
        },
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
            .addCase(deleteComplaint.fulfilled, (state, action) => {
                state.complaints = state.complaints.filter(
                    (complaint) => complaint.id !== action.payload
                );
            })
            .addCase(deleteComplaint.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            });
    }
})

export const { reset, removeComplaint, setComplaintsList } = complaintSlice.actions;
export default complaintSlice.reducer;