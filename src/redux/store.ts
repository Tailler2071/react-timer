import {configureStore} from "@reduxjs/toolkit";
import timerReducer from "./features/timers/timersSlice.ts";

export const store = configureStore({
    reducer: {
        counter: timerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
