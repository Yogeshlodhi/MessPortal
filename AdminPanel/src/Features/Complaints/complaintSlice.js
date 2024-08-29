import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import complaintService from './complaintService';

const initialState = {
    complaints: [],
    isSuccess: false,
    isError: false,
    isComplaintSuccess: false,
    isLoadingComplaints: false,
    complaintsMessage: ''
}


export const getComplaintsList = createAsyncThunk(
    'complaints/getAll',
    async (_, thunkAPI) => {
        try {
            return await complaintService.getComplaints();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const deleteComplaint = createAsyncThunk(
    'complaints/delete',
    async (complaintId, thunkAPI) => {
        try {
            await complaintService.deleteComplaint(complaintId);
            const updatedComplaints = await complaintService.getComplaints();
            thunkAPI.dispatch(setComplaintsList(updatedComplaints));
            return complaintId;
        } catch (error) {
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
            state.complaints = action.payload.data;
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
                state.complaints = action.payload.data,
                    state.isLoadingComplaints = false,
                    state.isSuccess = true
                state.complaintsMessage = action.payload.message
            })
            .addCase(getComplaintsList.pending, (state, action) => {
                state.isLoadingComplaints = true
            })
            .addCase(getComplaintsList.rejected, (state, action) => {
                state.complaints = [],
                    state.isLoadingComplaints = false,
                    state.isError = true
            })
            .addCase(deleteComplaint.pending, (state, action) => {
                state.isLoadingComplaints = true
            })
            .addCase(deleteComplaint.fulfilled, (state, action) => {
                state.complaints = state.complaints.filter(
                    (complaint) => complaint.id !== action.payload
                );
                state.complaintsMessage = 'Complaint deleted'
                state.isComplaintSuccess = true
            })

            .addCase(deleteComplaint.rejected, (state, action) => {
                state.isError = true;
                state.complaintsMessage = 'An Error Occurred, Please Try Again Later';
            });
    }
})

export const { reset, removeComplaint, setComplaintsList } = complaintSlice.actions;
export default complaintSlice.reducer;