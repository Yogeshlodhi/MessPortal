import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import menuService from './menuService';

const initialState = {
    menu: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

export const getMenu = createAsyncThunk(
    'mess/menu',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            return await menuService.getMenu({ token, adminType });
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const updateMenu = createAsyncThunk(
    'menu/update',
    async ({ month, updatedMenu }, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.admin.token;
            const adminType = state.auth.admin.adminType;
            return await menuService.updateMenuService(month, updatedMenu, token, adminType);
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
            })
            .addCase(getMenu.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getMenu.rejected, (state, action) => {
                state.isLoading = false,
                    state.isError = true,
                    state.message = action.payload.message
            })
            .addCase(updateMenu.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateMenu.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedMenuIndex = state.menu.findIndex(
                    (menu) => menu.monthOfMenu === action.payload.monthOfMenu
                );
                if (updatedMenuIndex !== -1) {
                    state.menu[updatedMenuIndex] = action.payload;
                }
            })
            .addCase(updateMenu.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload || 'Failed to update menu';
            });
    }
})

export const { reset } = menuSlice.actions;
export default menuSlice.reducer;