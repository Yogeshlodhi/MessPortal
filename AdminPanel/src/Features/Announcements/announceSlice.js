import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import announceService from './announceService';

const initialState = {
    announcements: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}


export const getAnnouncementList = createAsyncThunk(
    'announcement/getAll',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            return await announceService.getAnnouncement({token, adminType});
        } catch (error) {
            console.log(error.response.data.message);
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const addAnnounce = createAsyncThunk(
    'announcement/addOne',
    async (data, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            return await announceService.addAnnouncement(data, token, adminType);
        } catch (error) {
            console.log(error.response.data.message);
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const deleteAnnounce = createAsyncThunk(
    'announcement/deleteOne',
    async (id, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            return await announceService.deleteAnnouncement(id, token, adminType);
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const announceSlice = createSlice({
    name: 'announcement',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAnnouncementList.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAnnouncementList.rejected, (state, action) => {
                state.isLoading = false,
                    state.isError = true,
                    state.message = action.payload
            })
            .addCase(getAnnouncementList.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isError = false,
                    state.isSuccess = true,
                    state.announcements = action.payload.data
            })
            .addCase(addAnnounce.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addAnnounce.rejected, (state, action) => {
                state.isLoading = false,
                    state.isError = false,
                    state.message = action.payload
            })
            .addCase(addAnnounce.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isError = false,
                    state.isSuccess = true,
                    state.announcements.push(action.payload.data);
            })
            .addCase(deleteAnnounce.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAnnounce.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteAnnounce.fulfilled, (state, action) => {
                state.isLoading = false;
                state.announcements = state.announcements.filter(announcement => announcement.id !== action.meta.arg);
            });
    }
})

export const { reset } = announceSlice.actions;
export default announceSlice.reducer;