import  {useState, useEffect, useRef} from "react";
import {WheelPickerProps} from "./WheelPicker.props.ts"; // Создайте CSS файл для стилизации
import s from "./WheelPicker.module.scss";

const WheelPicker = ({data, selectedID, onChange, height, itemHeight}: WheelPickerProps) => {
    const [currentIndex, setCurrentIndex] = useState(selectedID);
    const wheelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (wheelRef.current) {
            wheelRef.current.scrollTop = currentIndex * itemHeight;
        }
    }, [currentIndex, itemHeight]);

    const handleScroll = () => {
        if (wheelRef.current) {
            const newIndex = Math.round(wheelRef.current.scrollTop / itemHeight);

            if (newIndex !== currentIndex) {
                setCurrentIndex(newIndex);
                onChange(newIndex);
            }
        }
    };

    return (
        <div className={s.box}>
            <div
                className={s.wheelPicker}
                style={{height: `${height}px`, paddingTop: itemHeight, paddingBottom: itemHeight}}
                ref={wheelRef}
                onScroll={handleScroll}
            >
                <div>
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className={`${s.item} ${index === currentIndex ? `${s.item} ${s.active}` : ""}`}
                            style={{height: `${itemHeight}px`}}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WheelPicker;
