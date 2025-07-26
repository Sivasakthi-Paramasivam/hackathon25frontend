import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface ProductDetailState {
  product: Product | null;
}

const initialState: ProductDetailState = {
  product: null,
};

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    setProductDetail(state, action: PayloadAction<Product>) {
      state.product = action.payload;
    },
    clearProductDetail(state) {
      state.product = null;
    },
  },
});

export const { setProductDetail, clearProductDetail } = productDetailSlice.actions;
export default productDetailSlice.reducer; 