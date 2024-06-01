import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import menuService from './menuService';

const initialState = {
    menu: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

export const getMenu = createAsyncThunk(
    'mess/menu',
    async (_, thunkAPI) => {
        try {
            // const token = thunkAPI.getState().auth.student.token;
            return await menuService.getMenu();
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
            return await menuService.updateMenuService(month, updatedMenu);
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
                state.menu = action.payload
            })
            .addCase(getMenu.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getMenu.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.message = action.payload
            })
    }
})

export const {reset} = menuSlice.actions;
export default menuSlice.reducer;