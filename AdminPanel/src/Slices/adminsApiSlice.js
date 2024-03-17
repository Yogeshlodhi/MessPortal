import { apiSlice } from "./apiSlice";

const ADMINS_URL = '/api/admin';

export const adminsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${ADMINS_URL}/login`,
                method: 'POST',
                body: data
            })
        })
    })
});

export const {useLoginMutation} = adminsApiSlice;