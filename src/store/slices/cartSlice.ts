// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { CartItem, Product } from '../../types';

// interface CartState {
//   items: CartItem[];
//   total: number;
//   itemCount: number;
// }

// const initialState: CartState = {
//   items: [],
//   total: 0,
//   itemCount: 0,
// };

// const calculateTotals = (items: CartItem[]) => {
//   const total = items.reduce((sum, item) => sum + (item.product['Product Price'] * item.quantity), 0);
//   const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
//   return { total, itemCount };
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number }>) => {
//       const { product, quantity = 1 } = action.payload;
//       const existingItem = state.items.find(item => item.product['Internal ID'] === product['Internal ID']);
      
//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         state.items.push({ product, quantity });
//       }
      
//       const { total, itemCount } = calculateTotals(state.items);
//       state.total = total;
//       state.itemCount = itemCount;
//     },
    
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       const productId = action.payload;
//       state.items = state.items.filter(item => item.product['Internal ID'] !== productId);
      
//       const { total, itemCount } = calculateTotals(state.items);
//       state.total = total;
//       state.itemCount = itemCount;
//     },
    
//     updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
//       const { productId, quantity } = action.payload;
//       const item = state.items.find(item => item.product['Internal ID'] === productId);
      
//       if (item) {
//         if (quantity <= 0) {
//           state.items = state.items.filter(item => item.product['Internal ID'] !== productId);
//         } else {
//           item.quantity = quantity;
//         }
        
//         const { total, itemCount } = calculateTotals(state.items);
//         state.total = total;
//         state.itemCount = itemCount;
//       }
//     },
    
//     clearCart: (state) => {
//       state.items = [];
//       state.total = 0;
//       state.itemCount = 0;
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer; 