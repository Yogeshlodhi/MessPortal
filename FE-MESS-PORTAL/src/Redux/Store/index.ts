import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from 'Redux/Slices/Common/AuthSlice';
import snackbarReducer from 'Redux/Slices/Common/SnackbarSlice';
import { AuthApi } from 'Redux/Slices/Common/AuthApi';
import { MenuApi } from 'Redux/Slices/Common/MenuApi';
import { AnnouncementApi } from 'Redux/Slices/Common/AnnouncementApi';
import { MessInfoApi } from 'Redux/Slices/Common/MessInfoApi';
import { LeaveApi } from 'Redux/Slices/Common/LeaveApi';
import { ComplaintApi } from 'Redux/Slices/Common/ComplaintApi';
import { FeedbackApi } from 'Redux/Slices/Common/FeedbackApi';
import { StudentApi } from 'Redux/Slices/Common/StudentApi';

const rootReducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
  [MenuApi.reducerPath]: MenuApi.reducer,
  [AnnouncementApi.reducerPath]: AnnouncementApi.reducer,
  [MessInfoApi.reducerPath]: MessInfoApi.reducer,
  [LeaveApi.reducerPath]: LeaveApi.reducer,
  [ComplaintApi.reducerPath]: ComplaintApi.reducer,
  [FeedbackApi.reducerPath]: FeedbackApi.reducer,
  [StudentApi.reducerPath]: StudentApi.reducer,
});

const persistConfig = {
  key: 'mp_root',
  version: 1,
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      AuthApi.middleware,
      MenuApi.middleware,
      AnnouncementApi.middleware,
      MessInfoApi.middleware,
      LeaveApi.middleware,
      ComplaintApi.middleware,
      FeedbackApi.middleware,
      StudentApi.middleware,
    ),
});

export const persistor = persistStore(reduxStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof reduxStore.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
