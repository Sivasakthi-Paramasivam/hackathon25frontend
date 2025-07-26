import { configureStore } from '@reduxjs/toolkit';
import productDetailReducer from './slices/productDetailSlice';

export const store = configureStore({
  reducer: {
    productDetail: productDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 