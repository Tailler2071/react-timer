import {useState} from "react";
import {useTimer} from "react-timer-hook";
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {Link} from "react-router-dom";
import {BigTimerProps} from "./BigTimer.props.ts";
import s from "./BigTimer.module.scss";

const BigTimer = ({expiryTimestamp, secondsTime}: BigTimerProps) => {
    const [showPause, setShowPause] = useState(true);
    const [showResume, setShowResume] = useState(false);

    const {seconds, minutes, pause, resume} = useTimer({
        expiryTimestamp, onExpire: () => {
            console.log("Готово");
        },
        autoStart: true
    });

    const totalMinutes = Math.floor(secondsTime / 60);
    const totalSeconds = secondsTime % 60;
    const stillTimeLeft = seconds + minutes * 60;
    const totalTime = totalSeconds + totalMinutes * 60;
    const percent = Math.round(stillTimeLeft / totalTime * 100);

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

    return (
        <div className={s.root}>
            <div className={s.timerBox}>
                <CircularProgressbar
                    className={s.timer}
                    value={percent}
                    text={`${minutes.toString().padStart(2, "0")}: ${seconds.toString().padStart(2, "0")}`}
                    strokeWidth={3}
                    styles={buildStyles({
                        textColor: "white",
                        pathColor: "#29A354",
                        trailColor: "#1A1F23",
                        strokeLinecap: "butt"
                    })}
                />
            </div>

            <div className={s.buttons}>
                {showPause && (
                    <button className={s.pauseButton} onClick={handlePause}>
                        Пауза
                    </button>
                )}

                {showResume && (
                    <button className={s.pauseButton} onClick={handleResume}>
                        Продолжить
                    </button>
                )}

                <Link to={"/"}>
                    <button className={s.cancelButton}>
                        Отмена
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BigTimer;
