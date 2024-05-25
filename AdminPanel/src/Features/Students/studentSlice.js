import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import studentService from './studentService';

const initialState = {
    studentsList: [],
    singleStudent: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const getStudentsList = createAsyncThunk(
    'students/getAll',
    async (_, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.admin;
            // console.log(token);
            return await studentService.getStudList();
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message); 
        }
    }
)

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStudentsList.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getStudentsList.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.studentsList = action.payload.StudentsList,
                state.message = action.payload.message
            })
            .addCase(getStudentsList.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.message = action.payload
            })
    }
})

export const {reset} = studentSlice.actions
export default studentSlice.reducer