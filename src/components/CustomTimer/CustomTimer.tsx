import {useTimer} from "react-timer-hook";
import Button from "../Button/Button.tsx";
import PauseIcon from "../../assets/icons/pause.svg?react";
import StartIcon from "../../assets/icons/start.svg?react";
import RetryIcon from "../../assets/icons/retry.svg?react";
import {CustomTimerProps} from "./CustomTimer.props.ts";
import s from "./CustomTimer.module.scss";
import {toast} from "react-toastify";
import Notification from "../Notification/Notification.tsx";
import {useDispatch} from "react-redux";
import {updateTimerStatus} from "../../redux/features/timers/timersSlice.ts";


const CustomTimer = ({expiryTimestamp, secondsTime, status, id}: CustomTimerProps) => {
    const totalMinutes = Math.floor(secondsTime / 60);
    const totalSeconds = secondsTime % 60;
    const dispatch = useDispatch();

    const notify = () =>
        toast(<Notification text={`${totalMinutes} мин ${totalSeconds} c`} myToast={() => toast.dismiss()}/>);
    const {
        seconds,
        minutes,
        start,
        pause,
        resume,
        restart
    } = useTimer({
        expiryTimestamp, onExpire: () => {
            notify();
            dispatch(updateTimerStatus({id, status: "restart"}));
        }, autoStart: false
    });

    const handleStart = () => {
        start();
        dispatch(updateTimerStatus({id, status: "start"}));
    };

    const handlePause = () => {
        pause();
        dispatch(updateTimerStatus({id, status: "pause"}));
    };

    const handleResume = () => {
        resume();
        dispatch(updateTimerStatus({id, status: "resume"}));
    };

    const handleRestart = () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + secondsTime);
        restart(time);
        dispatch(updateTimerStatus({id, status: "restart"}));
    };

    return (
        <div className={s.item}>
            <div className={s.view}>
                <div className={s.timer}>
                    <span>{minutes.toString().padStart(2, "0")}</span>:
                    <span>{seconds.toString().padStart(2, "0")}</span>
                </div>
                <div className={s.total}>
                    {totalMinutes < 1 ? "" : `${totalMinutes} мин`} {totalSeconds === 0 ? "" : `${totalSeconds} с`}
                </div>
            </div>
            <div className={s.buttons}>
                {status === "stop" &&
                    <Button className={s.buttonStart} onClick={handleStart}> <StartIcon/> </Button>}
                {status === "start" &&
                    <Button className={s.buttonPause} onClick={handlePause}> <PauseIcon/> </Button>}
                {status === "pause" &&
                    <Button className={s.buttonResume} onClick={handleResume}> <StartIcon/> </Button>}
                {status === "restart" &&
                    <Button className={s.buttonRestart} onClick={handleRestart}> <RetryIcon/> </Button>}
            </div>
        </div>
    );
};

export default CustomTimer;
