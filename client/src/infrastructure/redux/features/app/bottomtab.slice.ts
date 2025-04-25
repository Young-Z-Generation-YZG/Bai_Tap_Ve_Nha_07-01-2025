import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BottomTabState {
   name: string,
   color: string,
}

const initialState: BottomTabState = {
    name: "home",
    color: "#A6D6D6"
};

const bottomtabSlice = createSlice({
    name: 'bottomtab',
    initialState,
    reducers: {
        changeTabBar: (state, action: PayloadAction<string>) => {
            if (action.payload === 'cart'){
                state.color = "#F1BA88"
                state.name = action.payload
            } else if (action.payload === 'home'){
                state.color = "#A6D6D6"
                state.name = action.payload
            } else if (action.payload === 'products'){
                state.color = "#90C67C"
                state.name = action.payload
            } else if (action.payload === 'profile'){
                state.color = "#FF9A9A"
                state.name = action.payload
            }

        }
    }
})

export const {
   changeTabBar
} = bottomtabSlice.actions;
export default bottomtabSlice.reducer;
