import {useState} from "react";
import {useTimer} from "react-timer-hook";
import Button from "../Button/Button.tsx";
import PauseIcon from "../../assets/icons/pause.svg?react";
import StartIcon from "../../assets/icons/start.svg?react";
import RetryIcon from "../../assets/icons/retry.svg?react";
import {CustomTimerProps} from "./CustomTimer.props.ts";
import s from "./CustomTimer.module.scss";
import {toast} from "react-toastify";
import Notification from "../Notification/Notification.tsx";


const CustomTimer = ({expiryTimestamp, secondsTime}: CustomTimerProps) => {
    const [showStart, setShowStart] = useState(true);
    const [showPause, setShowPause] = useState(false);
    const [showResume, setShowResume] = useState(false);
    const [showRestart, setShowRestart] = useState(false);
    const totalMinutes = Math.floor(secondsTime / 60);
    const totalSeconds = secondsTime % 60;
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
            setShowRestart(true);
            setShowPause(false);
        }, autoStart: false
    });

    const handleStart = () => {
        start();
        setShowStart(false);
        setShowPause(true);
    };

    const handlePause = () => {
        pause();
        setShowPause(false);
        setShowResume(true);
    };

    const handleResume = () => {
        resume();
        setShowResume(false);
        setShowPause(true);
    };

    const handleRestart = () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + secondsTime); // 5 minutes timer
        restart(time);
        setShowPause(true);
        setShowResume(false);
        setShowRestart(false);
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
                {showStart && <Button className={s.buttonStart} onClick={handleStart}> <StartIcon/> </Button>}
                {showPause && <Button className={s.buttonPause} onClick={handlePause}> <PauseIcon/> </Button>}
                {showResume && <Button className={s.buttonResume} onClick={handleResume}> <StartIcon/> </Button>}
                {showRestart && <Button className={s.buttonRestart} onClick={handleRestart}> <RetryIcon/> </Button>}
            </div>
        </div>
    );
};

export default CustomTimer;
