import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  cartDrawerOpen: boolean;
  searchDrawerOpen: boolean;
  loading: boolean;
  theme: 'light' | 'dark';
}

const initialState: UIState = {
  cartDrawerOpen: false,
  searchDrawerOpen: false,
  loading: false,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCartDrawer: (state) => {
      state.cartDrawerOpen = !state.cartDrawerOpen;
    },
    setCartDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.cartDrawerOpen = action.payload;
    },
    toggleSearchDrawer: (state) => {
      state.searchDrawerOpen = !state.searchDrawerOpen;
    },
    setSearchDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.searchDrawerOpen = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const {
  toggleCartDrawer,
  setCartDrawerOpen,
  toggleSearchDrawer,
  setSearchDrawerOpen,
  setLoading,
  toggleTheme,
  setTheme,
} = uiSlice.actions;

export default uiSlice.reducer; 