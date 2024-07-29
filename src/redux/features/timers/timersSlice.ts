import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";

export interface ITimers {
    id: string;
    time: number;
    status: "start" | "pause" | "resume" | "restart" | "stop";
}

export interface CounterState {
    timers: ITimers[];
}

const initialState: CounterState = {
    timers: [
        {id: "1", time: 10, status: "stop"},
        {id: "2", time: 20, status: "stop"},
        {id: "3", time: 70, status: "stop"},
        {id: "4", time: 80, status: "stop"},
        {id: "5", time: 80, status: "stop"},
    ],
};

export const timersSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        addTimer: (state, action: PayloadAction<number>) => {
            state.timers.push({id: uuidv4(), time: action.payload, status: "start"});
        },
        removeTimer: (state, action: PayloadAction<string>) => {
            state.timers = state.timers.filter(timer => timer.id !== action.payload);
        },
        removeAllTimers: (state) => {
            state.timers = [];
        },
        stopAllTimers: (state) => {
            state.timers.forEach(timer => {
                timer.status = "stop";
            });
        },
        updateTimerStatus: (state, action: PayloadAction<{ id: string, status: ITimers["status"] }>) => {
            const {id, status} = action.payload;
            const timer = state.timers.find(timer => timer.id === id);

            if (timer) {
                timer.status = status;
            }
        },
    },
});

export const {
    addTimer,
    removeTimer,
    removeAllTimers,
    updateTimerStatus
} = timersSlice.actions;

export default timersSlice.reducer;
