import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HistoryItem {
  id: string,
  product_img: string,
  product_name: string,
  product_slug: string,
}

interface HistoryState {
  items: HistoryItem[],
}

const initialState: HistoryState = {
  items: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory(state, action: PayloadAction<HistoryItem>) {
      const existingItem = state.items.find(
        item =>
          item.id === action.payload.id
      );
      if (existingItem){
        console.log('HISTORY::EXISTED::',existingItem);
      } else {
        console.log('HISTORY::ADD::',action.payload);
        state.items.push(action.payload);
      }
    },
    removeHistory(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearHistory(state) {
      state.items = [];
    },
  },
});

export const { addHistory, removeHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
