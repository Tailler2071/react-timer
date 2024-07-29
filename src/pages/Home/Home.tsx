import {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {removeAllTimers, removeTimer} from "../../redux/features/timers/timersSlice.ts";
import CustomTimer from "../../components/CustomTimer/CustomTimer.tsx";
import AddIcon from "../../assets/icons/add.svg?react";
import MinusIcon from "../../assets/icons/minus.svg?react";
import s from "./main.module.scss";


const Home = () => {
    const timers = useSelector((state: RootState) => state.counter.timers);
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const isEmpty = timers.length === 0;

    const toggleEditing = () => {
        setIsEdit(!isEdit);
    };

    const handleRemoveTimer = (id: string) => {
        dispatch(removeTimer(id));
    };

    const handleRemoveAllTimers = () => {
        dispatch(removeAllTimers());
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
                        {timers.map(({id, time, status}) => {
                            const timeD = new Date();
                            timeD.setSeconds(timeD.getSeconds() + time);

                            return (
                                <li key={id} className={s.item}>
                                    <div>
                                        {isEdit &&
                                            <button type="button" className={s.delete} onClick={() => handleRemoveTimer(id)}>
                                                <MinusIcon/>
                                            </button>}
                                    </div>
                                    <CustomTimer expiryTimestamp={timeD} secondsTime={time} status={status} id={id}/>
                                </li>
                            );
                        })}
                    </ul>

                    {isEdit && <button className={s.deleteAllButton} onClick={handleRemoveAllTimers}>
                        Удалить все таймеры
                    </button>}
                </>
            )}
        </div>
    );
};

export default Home;
