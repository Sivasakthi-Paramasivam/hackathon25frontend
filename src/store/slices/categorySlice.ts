// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// // import { productApi } from '../../services/api';
// import ApiService from '../../services/api';

// const apiService = new ApiService();


// interface CategoryState {
//   categories: string[];
//   loading: boolean;
//   error: string | null;
//   selectedCategory: string | null;
// }

// const initialState: CategoryState = {
//   categories: [],
//   loading: false,
//   error: null,
//   selectedCategory: null,
// };

// export const fetchCategories = createAsyncThunk(
//   'categories/fetchCategories',
//   async () => {
//     const response = await apiService.getCategories();
//     return response;
//   }
// );

// const categorySlice = createSlice({
//   name: 'categories',
//   initialState,
//   reducers: {
//     setSelectedCategory: (state, action: PayloadAction<string | null>) => {
//       state.selectedCategory = action.payload;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.categories = action.payload;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch categories';
//       });
//   },
// });

// export const { setSelectedCategory, clearError } = categorySlice.actions;
// export default categorySlice.reducer; 