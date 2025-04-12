import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WishListItem {
  id: string,
  product_img: string,
  product_name: string,
  product_slug: string,
  product_price: number,
  product_brand: string,
  category_name: string,
}

interface WishListState {
  items: WishListItem[],
}

const initialState: WishListState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addWishList(state, action: PayloadAction<WishListItem>) {
      const existingItem = state.items.find(
        item =>
          item.id === action.payload.id
      );
      if (existingItem){
        console.log('EXISTED:::',existingItem);
      } else {
        console.log('ADDWISHLIST:::',action.payload);
        state.items.push(action.payload);
      }
    },
    removeWishList(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearWishList(state) {
      state.items = [];
    },
  },
});

export const { addWishList, removeWishList, clearWishList } = wishlistSlice.actions;
export default wishlistSlice.reducer;
