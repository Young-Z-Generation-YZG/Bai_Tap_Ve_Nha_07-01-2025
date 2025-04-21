import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItemType {
   product_id: string;
   product_slug: string;
   product_img: string;
   product_name: string;
   product_color: string;
   product_size: string;
   product_price: number;
   quantity: number;
}

interface DiscountType {
   totalDiscount: number;
   voucherCode: string;
}

interface CartState {
   items: CartItemType[];
   total: number;
   discount: DiscountType;
   totalQuantity: number;
}

const initialState: CartState = {
   items: [],
   total: 0,
   discount: {
      totalDiscount: 0,
      voucherCode: '',
   },
   totalQuantity: 0,
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItemToCart: (state, action: PayloadAction<CartItemType>) => {
         const existingItem = state.items.find(
            (item) =>
               item.product_id === action.payload.product_id &&
               item.product_color === action.payload.product_color &&
               item.product_size === action.payload.product_size,
         );
         if (existingItem) {
            state.total += action.payload.quantity * existingItem.product_price;
            state.discount.totalDiscount = state.total;
            existingItem.quantity += action.payload.quantity;
            state.totalQuantity += action.payload.quantity;
         } else {
            state.total +=
               action.payload.quantity * action.payload.product_price;
            state.discount.totalDiscount = state.total;
            state.items.push(action.payload);
            state.totalQuantity += action.payload.quantity;
         }
      },
      decreaseItemFromCart: (state, action: PayloadAction<CartItemType>) => {
         const itemToRemove = state.items.find(
            (item) =>
               item.product_id === action.payload.product_id &&
               item.product_color === action.payload.product_color &&
               item.product_size === action.payload.product_size,
         );
         if (itemToRemove) {
            if (itemToRemove.quantity > 1) {
               itemToRemove.quantity -= 1;
               state.total -= itemToRemove.product_price;
               state.discount.totalDiscount = state.total;
               state.totalQuantity -= 1;
            } else {
               state.items = state.items.filter(
                  (item) =>
                     !(
                        item.product_id === action.payload.product_id &&
                        item.product_color === action.payload.product_color &&
                        item.product_size === action.payload.product_size
                     ),
               );
               state.total -= itemToRemove.product_price;
               state.discount.totalDiscount = state.total;
               state.totalQuantity -= 1;
            }
         }
      },
      clearCart: (state) => {
         state.items = [];
         state.total = 0;
         state.totalQuantity = 0;
         state.discount.totalDiscount = 0;
         state.discount.voucherCode = '';
      },
      setTotalDiscount: (state, action: PayloadAction<DiscountType>) => {
         state.discount = action.payload;
      },
      clearTotalDiscount: (state) => {
         state.discount = {
            totalDiscount: state.total,
            voucherCode: '',
         };
      },
   },
});

export const {
   addItemToCart,
   decreaseItemFromCart,
   clearCart,
   setTotalDiscount,
   clearTotalDiscount,
} = cartSlice.actions;
export default cartSlice.reducer;
