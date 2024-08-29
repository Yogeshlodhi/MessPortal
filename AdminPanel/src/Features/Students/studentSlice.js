import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import studentService from './studentService';

const initialState = {
    students: [],
    isLoadingStudents: false,
    isSuccess: false,
    isError: false,
    studentsMessage: ''
}

export const getdata = createAsyncThunk(
    'students/getAll',
    async (_, thunkAPI) => {
        try{
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
            .addCase(getdata.pending, (state, action) => {
                state.isLoadingStudents = true
            })
            .addCase(getdata.fulfilled, (state, action) => {
                state.isLoadingStudents = false,
                state.isSuccess = true,
                state.students = action.payload.data,
                state.studentsMessage = action.payload.message
            })
            .addCase(getdata.rejected, (state, action) => {
                state.isLoadingStudents = false,
                state.isError = true,
                state.studentsMessage = action.payload.message
            })
    }
})

export const {reset} = studentSlice.actions
export default studentSlice.reducer