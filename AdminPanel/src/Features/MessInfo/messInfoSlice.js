
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
            return await messInfoService.getMessInfoService();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const addContact = createAsyncThunk(
    'messInfo/addContact',
    async (contactData, thunkAPI) => {
        try {
            await messInfoService.addContactService(contactData);
            const updatedContacts = await messInfoService.getMessInfoService();
            thunkAPI.dispatch(setContacts(updatedContacts));
            return updatedContacts;
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const addMessInfo = createAsyncThunk(
    'messInfo/addMess',
    async (info, thunkAPI) => {
        try {
            return await messInfoService.addInfo(info);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const updateMessInfo = createAsyncThunk(
    'messInfo/update',
    async ({ id, updatedInfo }, thunkAPI) => {
        try {
            return await messInfoService.updateInfo(id, updatedInfo);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const messInfoSlice = createSlice({
    name: 'messInfo',
    initialState,
    reducers: {
        reset: (state) => initialState,
        setContacts: (state, action) => {
            state.messInfo.contacts = action.payload.data.contacts;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessInfo.pending, (state) => {
                state.isLoadingMess = true;
            })
            .addCase(getMessInfo.fulfilled, (state, action) => {
                state.messInfo = action.payload.data;
                state.isLoadingMess = false;
                state.isErrorMess = false;
                state.messMessage = action.payload.message;
            })
            .addCase(getMessInfo.rejected, (state, action) => {
                state.isLoadingMess = false;
                state.isErrorMess = true;
                state.messMessage = action.payload;
            })
            .addCase(addContact.pending, (state) => {
                state.isLoadingMess = true;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.messInfo.contacts = action.payload.data.contacts;
                state.isLoadingMess = false;
                state.isErrorMess = false;
                state.messMessage = 'Contact added successfully';
            })
            .addCase(addContact.rejected, (state, action) => {
                state.isLoadingMess = false;
                state.isErrorMess = true;
                state.messMessage = action.payload;
            })
            .addCase(addMessInfo.pending, (state) => {
                state.isLoadingMess = true;
            })
            .addCase(addMessInfo.fulfilled, (state, action) => {
                state.messInfo = action.payload.data
                state.isLoadingMess = false;
                state.isErrorMess = false;
                state.messMessage = 'Information added successfully';
            })
            .addCase(addMessInfo.rejected, (state, action) => {
                state.isLoadingMess = false;
                state.isErrorMess = true;
                state.messMessage = action.payload;
            })
            .addCase(updateMessInfo.pending, (state) => {
                state.isLoadingMess = true;
            })
            .addCase(updateMessInfo.fulfilled, (state, action) => {
                state.messInfo = action.payload.data
                state.isLoadingMess = false;
                state.isErrorMess = false;
                state.messMessage = 'Information Updated successfully';
            })
            .addCase(updateMessInfo.rejected, (state, action) => {
                state.isLoadingMess = false;
                state.isErrorMess = true;
                state.messMessage = action.payload;
            })
            // .addCase(updateContact.pending, (state) => {
            //     state.isLoadingMess = true;
            // })
            // .addCase(updateContact.fulfilled, (state, action) => {
            //     const index = state.messInfo.contacts.findIndex(contact => contact._id === action.payload.data._id);
            //     if (index !== -1) {
            //         state.messInfo.contacts[index] = action.payload.data;
            //     }
            //     state.isLoadingMess = false;
            //     state.isErrorMess = false;
            //     state.messMessage = action.payload.message;
            // })
            // .addCase(updateContact.rejected, (state, action) => {
            //     state.isLoadingMess = false;
            //     state.isErrorMess = true;
            //     state.messMessage = action.payload;
            // })
    }
})

export const { reset, setContacts } = messInfoSlice.actions;
export default messInfoSlice.reducer;
