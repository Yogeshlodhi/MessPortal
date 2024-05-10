import {apiSlice} from './apiSlice';
const STUDENTS_URL = '/api/student';

// injectEndPoints ==> create own endpoints in this file and it will
// inject them into the apiSlice endpoints: (builder) => ({})
export const studentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
        // login: builder.query({ ==> for get method
            query: (data) => ({
                url: `${STUDENTS_URL}/login`,
                method: 'POST',
                body: data,
            })
        })
    })
})

export const { useLoginMutation } = studentsApiSlice
// export const { useLoginQuery } = studentsApiSlice ==> for GET Method