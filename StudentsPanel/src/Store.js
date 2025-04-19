import {configureStore} from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice.js'
import { apiSlice } from './Slices/apiSlice.js';

const Store = configureStore({
    reducer: {
        // auth ===> name of this part of the state, will be visible in redux dev tools
        auth: authReducer,
        [apiSlice.reducerPath] : apiSlice.reducer,
    },
    // function to get the default middleware
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default Store;