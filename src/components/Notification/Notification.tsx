import {NotificationProps} from "./Notification.props.ts";
import s from "./Notification.module.scss";

const Notification = ({ myToast, text}: NotificationProps) => {
    return (
        <div className={s.box}>
            <div>
                Таймер на {text}
            </div>
            <div className={s.message}>
                Дзынь Дзынь
            </div>

            <button
                className={s.button}
                type="button"
                onClick={myToast}>
                Остановить
            </button>
        </div>
    );
};

export default Notification;