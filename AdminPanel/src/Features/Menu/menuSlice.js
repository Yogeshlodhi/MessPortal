import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import menuService from './menuService';

const initialState = {
    menu: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

export const addNewMenu = createAsyncThunk(
    'menu/addnew',
    async (menuData, thunkAPI) => {
        try {
            return await menuService.addMenu(menuData);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getMenu = createAsyncThunk(
    'mess/menu',
    async (_, thunkAPI) => {
        try {
            return await menuService.getMenu();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const updateMenu = createAsyncThunk(
    'menu/update',
    async ({ id, updatedMenu }, thunkAPI) => {
        try {
            return await menuService.updateMenuService(id, updatedMenu);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMenu.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isSuccess = true,
                    state.menu = action.payload.data
                state.message = action.payload.message;
                state.isError = false;
            })
            .addCase(getMenu.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getMenu.rejected, (state, action) => {
                state.isLoading = false,
                    state.isError = true,
                    state.message = action.payload
            })
            .addCase(updateMenu.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateMenu.fulfilled, (state, action) => {
                state.isLoading = false;
                state.menu = action.payload.data;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.isError = false;
            })
            .addCase(updateMenu.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(addNewMenu.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addNewMenu.fulfilled, (state, action) => {
                state.isLoading = false;
                state.menu = action.payload.data;
                state.isSuccess = true;
                state.message = action.payload.message;
                state.isError = false;
            })
            .addCase(addNewMenu.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
})

export const { reset } = menuSlice.actions;
export default menuSlice.reducer;