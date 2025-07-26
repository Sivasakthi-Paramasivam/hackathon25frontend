// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { Product, SearchFilters } from '../../types';
// import ApiService from '../../services/api';

// const apiService = new ApiService();

// interface ProductState {
//   products: Product[];
//   currentProduct: Product | null;
//   loading: boolean;
//   error: string | null;
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
//   filters: SearchFilters;
//   searchQuery: string;
// }

// const initialState: ProductState = {
//   products: [],
//   currentProduct: null,
//   loading: false,
//   error: null,
//   total: 0,
//   page: 1,
//   limit: 12,
//   totalPages: 0,
//   filters: {},
//   searchQuery: '',
// };

// // export const fetchProducts = createAsyncThunk(
// //   'products/fetchProducts',
// //   async ({ page, limit, filters }: { page: number; limit: number; filters?: SearchFilters }) => {
// //     console.log('fetching products');
// //     const response = await apiService.getProducts(page, limit, filters);
// //     return response;
// //   }
// // );

// export const fetchProduct = createAsyncThunk(
//   'products/fetchProduct',
//   async (id: string) => {
//     const response = await apiService.getProduct(id);
//     return response;
//   }
// );

// export const searchProducts = createAsyncThunk(
//   'products/searchProducts',
//   async ({ query, page, limit }: { query: string; page: number; limit: number }) => {
//     const response = await apiService.searchProducts(query, page, limit);
//     return { ...response, query };
//   }
// );

// const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     setFilters: (state, action: PayloadAction<SearchFilters>) => {
//       state.filters = action.payload;
//       state.page = 1;
//     },
//     setPage: (state, action: PayloadAction<number>) => {
//       state.page = action.payload;
//     },
//     setSearchQuery: (state, action: PayloadAction<string>) => {
//       state.searchQuery = action.payload;
//       state.page = 1;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // .addCase(fetchProducts.pending, (state) => {
//       //   state.loading = true;
//       //   state.error = null;
//       // })
//       // .addCase(fetchProducts.fulfilled, (state, action) => {
//       //   state.loading = false;
//       //   state.products = action.payload.data;
//       //   state.total = action.payload.total;
//       //   state.page = action.payload.page;
//       //   state.limit = action.payload.limit;
//       //   state.totalPages = action.payload.totalPages;
//       // })
//       // .addCase(fetchProducts.rejected, (state, action) => {
//       //   state.loading = false;
//       //   state.error = action.error.message || 'Failed to fetch products';
//       // })
//       .addCase(fetchProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentProduct = action.payload;
//       })
//       .addCase(fetchProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch product';
//       })
//       .addCase(searchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(searchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = action.payload.data;
//         state.total = action.payload.total;
//         state.page = action.payload.page;
//         state.limit = action.payload.limit;
//         state.totalPages = action.payload.totalPages;
//         state.searchQuery = action.payload.query;
//       })
//       .addCase(searchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to search products';
//       });
//   },
// });

// export const { setFilters, setPage, setSearchQuery, clearError } = productSlice.actions;
// export default productSlice.reducer; 