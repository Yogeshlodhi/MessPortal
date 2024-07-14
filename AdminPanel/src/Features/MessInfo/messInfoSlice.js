import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import messInfoService from './messInfoService';

const initialState = {
    messInfo: {},
    isLoadingMess: false,
    isErrorMess: false,
    messMessage: '',
}

export const getMessInfo = createAsyncThunk(
    'messInfo/getInfo',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            return await messInfoService.getMessInfoService({ token, adminType });
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const messInfoSlice = createSlice({
    name: 'messInfo',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessInfo.pending, (state) => {
                state.isLoadingMess = true
            })
            .addCase(getMessInfo.fulfilled, (state, action) => {
                state.messInfo = action.payload.data,
                state.isLoadingMess = false,
                state.isErrorMess = false,
                state.messMessage = action.payload.message
            })
            .addCase(getMessInfo.rejected, (state, action) => {
                state.isLoadingMess = false;
                state.isErrorMess = true;
                state.messMessage = action.payload;
            })
    }

})

export const { reset } = messInfoSlice.actions;
export default messInfoSlice.reducer;