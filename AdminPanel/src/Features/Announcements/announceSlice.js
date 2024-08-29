import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import announceService from './announceService';

const initialState = {
    announcements: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}


export const getAnnouncementList = createAsyncThunk(
    'announcement/getAll',
    async (_, thunkAPI) => {
        try {
            return await announceService.getAnnouncement();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const addAnnounce = createAsyncThunk(
    'announcement/addOne',
    async (data, thunkAPI) => {
        try {
            return await announceService.addAnnouncement(data);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                return thunkAPI.rejectWithValue('You do not have permission to add announcements.');
            }
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const deleteAnnounce = createAsyncThunk(
    'announcement/deleteOne',
    async (id, thunkAPI) => {
        try {
            await announceService.deleteAnnouncement(id);
            const updatedAnnouncements = await announceService.getAnnouncement();
            thunkAPI.dispatch(setAnnounceList(updatedAnnouncements));
            
            return id;
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
        reset: (state) => {
            state.isError = false,
            state.isLoading = false,
            state.isSuccess = false,
            state.message = ''
        },
        setAnnounceList: (state, action) => {
            state.announcements = action.payload.data;
        },
        removeAnnouncement: (state, action) => {
            state.announcements = state.announcements.filter(
                (announcement) => announcement.id !== action.payload
            );
        },
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
            .addCase(setAnnounceList, (state, action) => {
                state.announcements = action.payload.data;
            })            
            .addCase(addAnnounce.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addAnnounce.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.message = action.payload,
                state.isSuccess = false
            })
            .addCase(addAnnounce.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.isError = false,
                state.message = action.payload.message
                state.announcements.push(action.payload.data);
            })
            .addCase(deleteAnnounce.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAnnounce.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.isSuccess = false
            })
            .addCase(deleteAnnounce.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false,
                state.isSuccess = true,
                state.message = 'Deleted Successfully!'
                // state.announcements = state.announcements.filter(announcement => announcement.id !== action.payload);
            });
    }
})

export const { reset, setAnnounceList, removeAnnouncement } = announceSlice.actions;
export default announceSlice.reducer;