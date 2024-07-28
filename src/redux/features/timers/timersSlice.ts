import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";

interface ITimers {
    id: string;
    time: number;
    status?: "start" | "pause" | "resume" | "restart";
}

export interface CounterState {
    timers: ITimers[];
}

const initialState: CounterState = {
    timers: [
        {id: "1", time: 10, status: "start"},
        {id: "2", time: 20, status: "start"},
        {id: "3", time: 70, status: "start"},
        {id: "4", time: 80, status: "start"},
        {id: "5", time: 80, status: "start"},
    ],
};

export const timersSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        addTimer: (state, action: PayloadAction<number>) => {
            state.timers.push({id: uuidv4(), time: action.payload});
        },
        removeTimer: (state, action: PayloadAction<string>) => {
            state.timers = state.timers.filter(timer => timer.id !== action.payload);
        },
    },
});

export const {addTimer, removeTimer} = timersSlice.actions;

export default timersSlice.reducer;
