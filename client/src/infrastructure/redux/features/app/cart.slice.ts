import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
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
  total: number;
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  total:0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => 
          item.product_slug === action.payload.product_slug &&
          item.product_color === action.payload.product_color &&
          item.product_size === action.payload.product_size
      );
      if (existingItem) {
        state.total +=  action.payload.quantity * existingItem.product_price;
        existingItem.quantity += action.payload.quantity;
        state.totalQuantity += action.payload.quantity;
      } else {
        state.total += action.payload.quantity * action.payload.product_price;
        state.items.push(action.payload);
        state.totalQuantity += action.payload.quantity;
      }
    },
    decreaseItemFromCart: (state, action: PayloadAction<CartItem>) => {
      const itemToRemove = state.items.find(
        item => 
          item.product_slug === action.payload.product_slug &&
          item.product_color === action.payload.product_color &&
          item.product_size === action.payload.product_size
      );
      if (itemToRemove) {
        if (itemToRemove.quantity > 1) {
          itemToRemove.quantity -= 1;
          state.total -= itemToRemove.product_price;
          state.totalQuantity -= 1;
        } else {
          state.items = state.items.filter(item => 
            !(
              item.product_slug === action.payload.product_slug &&
              item.product_color === action.payload.product_color &&
              item.product_size === action.payload.product_size
            )
          );
          state.total -= itemToRemove.product_price;
          state.totalQuantity -= 1;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.totalQuantity = 0; 
    },
  },
});

export const { addItemToCart, decreaseItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;