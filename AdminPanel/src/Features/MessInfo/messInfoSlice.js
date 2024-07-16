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

export const addContact = createAsyncThunk(
    'messInfo/addContact',
    async ({ messId, contact }, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            return await messInfoService.addContactService({ messId, contact, token });
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// export const addContact = createAsyncThunk(
//     'messInfo/addContact',
//     async ({ messId, contact }, thunkAPI) => {
//         try {
//             const state = thunkAPI.getState();
//             const token = state.auth.admin.token;
//             return await messInfoService.addContactService(token, messId, contact);
//         } catch (error) {
//             const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//             return thunkAPI.rejectWithValue(message);
//         }
//     }
// )

export const updateContact = createAsyncThunk(
    'messInfo/updateContact',
    async ({ messId, contactId, updatedContact }, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            return await messInfoService.updateContactService({ messId, contactId, updatedContact, token });
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
            .addCase(addContact.pending, (state) => {
                state.isLoadingMess = true
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.messInfo.contacts.push(action.payload.data);
                state.isLoadingMess = false;
                state.isErrorMess = false;
                state.messMessage = action.payload.message;
            })
            .addCase(addContact.rejected, (state, action) => {
                state.isLoadingMess = false;
                state.isErrorMess = true;
                state.messMessage = action.payload;
            })

            .addCase(updateContact.pending, (state) => {
                state.isLoadingMess = true
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

export const { reset } = messInfoSlice.actions;
export default messInfoSlice.reducer;