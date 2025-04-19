import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import studentService from './studentService';

const initialState = {
    student: null,
    isLoadingStudent: false,
    isSuccessStudent: false,
    isErrorStudent: false,
    messageStudent: ''
}

export const getSingleStudent = createAsyncThunk(
    'studentProfile/single_student',
    async(emailId, thunkAPI) => {
        try{
            return await studentService.singleStudent(emailId);
        }catch(error){
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message); 
        }
    }
)


const studentProfileSlice = createSlice({
    name: 'studentProfile',
    initialState,
    reducers: {
        reset: (state) => initialState,
        clearStudent : (state) => {
            state.student = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSingleStudent.pending, (state, action) => {
                state.isLoadingStudent = true
            })
            .addCase(getSingleStudent.fulfilled, (state, action) => {
                state.isLoadingStudent = false,
                state.isSuccessStudent = true,
                state.student = action.payload,
                state.messageStudent = action.payload
            })
            .addCase(getSingleStudent.rejected, (state, action) => {
                state.isLoadingStudent = false,
                state.isErrorStudent = true,
                state.messageStudent = action.payload
            })
    }
})

export const {reset, clearStudent} = studentProfileSlice.actions
export default studentProfileSlice.reducer