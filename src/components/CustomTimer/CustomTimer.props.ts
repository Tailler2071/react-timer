import {ITimers} from "../../redux/features/timers/timersSlice.ts";

export interface CustomTimerProps {
    expiryTimestamp: Date;
    secondsTime: number;
    status: ITimers["status"];
    id: ITimers["id"]
}