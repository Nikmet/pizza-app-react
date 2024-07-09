import { configureStore } from "@reduxjs/toolkit";
import userSlice, { KEY } from "./user.slice";
import { saveState } from "./storage";
import cartSlice, { CART_PERSISTENT_STATE } from "./cart.slice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice
    }
});

store.subscribe(() => {
    saveState({ jwt: store.getState().user.jwt }, KEY);
    saveState(store.getState().cart, CART_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type typeAppDispatch = typeof store.dispatch;
