import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
   name: 'search',
   initialState: {
      query: '',
      isOpened: false,
   },
   reducers: {
      setOpened: (state, action) => {
         state.isOpened = action.payload;
      },
      setSearchQuery: (state, action) => {
         state.query = action.payload;
      },
   },
});

export const { setSearchQuery, setOpened } = searchSlice.actions;

export default searchSlice.reducer;
