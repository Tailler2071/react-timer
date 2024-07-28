import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTimer } from "../../redux/features/timers/timersSlice";
import WheelPicker from "../../components/WheelPicker/WheelPicker";
import BigTimer from "../../components/BigTimer/BigTimer";
import s from "./NewTimer.module.scss";

const NewTimer = () => {
    const [selectedMinute, setSelectedMinute] = useState(0);
    const [selectedSecond, setSelectedSecond] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [expiryTimestamp, setExpiryTimestamp] = useState<Date>(new Date);
    const dispatch = useDispatch();
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));
    const seconds = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));
    const totalSeconds = selectedMinute * 60 + selectedSecond;


    const startTimer = () => {
        setIsStarted(true);
        dispatch(addTimer(totalSeconds));

        const now = new Date();
        setExpiryTimestamp(new Date(now.getTime() + totalSeconds * 1000));
    };

    return (
        <div className={s.root}>
            <div className={s.top}>
                <Link to="/" className={s.buttonCancel}>
                    {isStarted ? "Таймеры" : "Отменить"}
                </Link>
                {!isStarted && <h1 className={s.title}>Таймер</h1>}
            </div>

            {!isStarted ? (
                <>
                    <div className={s.container}>
                        <WheelPicker
                            data={minutes}
                            selectedID={selectedMinute}
                            onChange={setSelectedMinute}
                            height={195}
                            itemHeight={60}
                        />
                        <WheelPicker
                            data={seconds}
                            selectedID={selectedSecond}
                            onChange={setSelectedSecond}
                            height={195}
                            itemHeight={60}
                        />
                    </div>

                    <button className={s.button} onClick={startTimer}>
                        Старт
                    </button>
                </>
            ) : (
                <BigTimer expiryTimestamp={expiryTimestamp} secondsTime={totalSeconds}/>
            )}
        </div>
    );
};

export default NewTimer;
