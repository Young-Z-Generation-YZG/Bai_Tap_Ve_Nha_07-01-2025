import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  product_slug: string;
  product_img: string;
  product_name: string;
  product_color:string;
  product_size: string;
  product_price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.product_slug === action.payload.product_slug);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product_slug !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;