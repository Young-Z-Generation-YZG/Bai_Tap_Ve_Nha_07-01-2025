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
  subTotal: number;
}

const initialState: CartState = {
  items: [],
  subTotal:0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.product_slug === action.payload.product_slug);
      if (existingItem) {
        state.subTotal += (existingItem.quantity + action.payload.quantity ) * existingItem.product_price;
        existingItem.quantity += action.payload.quantity;
      } else {
        state.subTotal += action.payload.quantity * action.payload.product_price;
        state.items.push(action.payload);
      }
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const itemRomove = state.items.find(item => item.product_slug === action.payload);
      if (itemRomove){
        state.subTotal -= itemRomove.quantity * itemRomove.product_price;
      }
      state.items = state.items.filter(item => item.product_slug !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.subTotal = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;