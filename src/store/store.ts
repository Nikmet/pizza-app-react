import { configureStore } from "@reduxjs/toolkit";
import userSlice, { KEY } from "./user.slice";
import { saveState } from "./storage";

export const store = configureStore({
    reducer: {
        user: userSlice
    }
});

store.subscribe(() => {
    saveState({ jwt: store.getState().user.jwt }, KEY);
});

export type RootState = ReturnType<typeof store.getState>;
export type typeAppDispatch = typeof store.dispatch;