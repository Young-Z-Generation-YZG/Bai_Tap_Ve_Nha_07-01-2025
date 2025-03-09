import { createSlice } from '@reduxjs/toolkit';

export type CartItemPayloadType = {
   product_id: string;
   product_name: string;
   product_img: string;
   product_size: string;
   product_color: string;
   product_price: number;
   quantity: number;
};

const cartSlice = createSlice({
   name: 'cart',
   initialState: {
      cart: [] as CartItemPayloadType[],
   },
   reducers: {
      setAddProduct: (state, { payload }: { payload: CartItemPayloadType }) => {
         const existingItemIndex = state.cart.findIndex(
            (item) => item.product_id === payload.product_id,
         );

         if (existingItemIndex !== -1) {
            state.cart[existingItemIndex].quantity = Math.max(
               1,
               state.cart[existingItemIndex].quantity + payload.quantity,
            );
         } else {
            state.cart.push({
               ...payload,
               quantity: Math.max(1, payload.quantity),
            });
         }
      },
      setRemoveProduct: (state, { payload }: { payload: string }) => {
         state.cart = state.cart.filter((item) => item.product_id !== payload);
      },
      setUpdateQuantity: (
         state,
         { payload }: { payload: { product_id: string; quantity: number } },
      ) => {
         const itemIndex = state.cart.findIndex(
            (item) => item.product_id === payload.product_id,
         );
         if (itemIndex !== -1) {
            state.cart[itemIndex].quantity = Math.max(1, payload.quantity);
         }
      },
      clearCart: (state) => {
         state.cart = [];
      },
   },
});

export const { setAddProduct, setRemoveProduct, setUpdateQuantity, clearCart } =
   cartSlice.actions;

export default cartSlice.reducer;
