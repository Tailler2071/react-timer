import {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {removeAllTimers, stopAllTimers} from "../../redux/features/timers/timersSlice.ts";
import CustomTimer from "../../components/CustomTimer/CustomTimer.tsx";
import AddIcon from "../../assets/icons/add.svg?react";
import s from "./main.module.scss";
import {getTimeForTimer} from "../../utils/convertTime.ts";

const Home = () => {
    const timers = useSelector((state: RootState) => state.counter.timers);
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const isEmpty = timers.length === 0;
    const isActiveTimers = timers.some(timer => timer.status === "start" || timer.status === "resume" || timer.status === "pause" || timer.status === "restart");


    const toggleEditing = () => {
        setIsEdit(!isEdit);
    };

    const handleRemoveAllTimers = () => {
        dispatch(removeAllTimers());
    };

    const handleStoppingAllTimers = () => {
        dispatch(stopAllTimers());
    };

    return (
        <div className={s.root}>
            <div className={s.management}>
                <div>
                    {!isEmpty && (
                        <button className={s.editButton} type="button" onClick={toggleEditing}>
                            {isEdit ? "Готово" : "Править"}
                        </button>
                    )}
                </div>
                <Link to={"new"} className={s.addButton}> <AddIcon/> </Link>
            </div>

            <h1 className={s.title}>Таймеры</h1>

            {isEmpty ? (
                <p className={s.noTimersMessage}>Добавьте новый таймер</p>
            ) : (
                <>
                    <ul className={s.listOfTimers}>
                        {timers.map(({id, time, status}) =>
                            (<CustomTimer
                                isEdit={isEdit}
                                expiryTimestamp={getTimeForTimer(time)}
                                key={id}
                                secondsTime={time}
                                status={status}
                                id={id}
                            />)
                        )}
                    </ul>

                    {isEdit &&
                        <button className={s.deleteAllButton} onClick={handleRemoveAllTimers}>
                            Удалить все таймеры
                        </button>
                    }
                </>
            )}

            {isActiveTimers &&
                <button type="button" className={s.resetAll} onClick={handleStoppingAllTimers}>
                    Сбросить все таймеры
                </button>
            }
        </div>
    );
};

export default Home;
