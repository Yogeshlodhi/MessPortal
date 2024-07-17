
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
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const addContact = createAsyncThunk(
    'messInfo/addContact',
    async (contact, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            await messInfoService.addContactService({ contact, token });
            const updatedContacts = await messInfoService.getMessInfoService({ token, adminType: state.auth.admin.adminType });
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
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            return await messInfoService.addInfo({ info, token });
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const updateContact = createAsyncThunk(
    'messInfo/updateContact',
    async ({ messId, contactId, updatedContact }, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            return await messInfoService.updateContactService({ messId, contactId, updatedContact, token });
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
            .addCase(updateContact.pending, (state) => {
                state.isLoadingMess = true;
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                const index = state.messInfo.contacts.findIndex(contact => contact._id === action.payload.data._id);
                if (index !== -1) {
                    state.messInfo.contacts[index] = action.payload.data;
                }
                state.isLoadingMess = false;
                state.isErrorMess = false;
                state.messMessage = action.payload.message;
            })
            .addCase(updateContact.rejected, (state, action) => {
                state.isLoadingMess = false;
                state.isErrorMess = true;
                state.messMessage = action.payload;
            })
    }
})

export const { reset, setContacts } = messInfoSlice.actions;
export default messInfoSlice.reducer;
