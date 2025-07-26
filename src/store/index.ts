import { configureStore } from '@reduxjs/toolkit';
// import productReducer from './slices/productSlice';
// import cartReducer from './slices/cartSlice';
// import categoryReducer from './slices/categorySlice';
// import uiReducer from './slices/uiSlice';
import productDetailReducer from './slices/productDetailSlice';

export const store = configureStore({
  reducer: {
    // products: productReducer,
    // cart: cartReducer,
    // categories: categoryReducer,
    // ui: uiReducer,
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