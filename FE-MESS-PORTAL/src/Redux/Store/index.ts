import { configureStore, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [
    'SetPastExpMode',
    'SetApplicationFeedback',
    'GetInternBatchDetails',
    'partnerDetails',
    'batchDetails',
  ],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
    //   .concat(InternApplicationApi.middleware),

//   devTools: configs.VITE_ENV !== 'prod',
});

export const waitForStoreUpdate = (dispatch) => {
  return new Promise((resolve) => {
    const unsubscribe = reduxStore.subscribe(() => {
      const state = reduxStore.getState();
      if (
        state.SetApplicationNextLoader.status === 'start' &&
        state.SetApplicationNextLoader.unsubscribe !== null
      ) {
        state.SetApplicationNextLoader.unsubscribe();
        resolve(null);
      }
    });
    dispatch(setUnsubscribe(unsubscribe));
  });
};

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export const useAppDispatch = () => useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();
