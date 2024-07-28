const getTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return {minutes, seconds};
};

const getFormattedTime = (milliseconds: number) => {
    const {minutes, seconds} = getTime(milliseconds);

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
};

const getFormattedTimeFromMinutes = (milliseconds: number) => {
    const {minutes, seconds} = getTime(milliseconds);

    const formattedMinutes = minutes < 1 ? "" : `${minutes} мин`;
    const formattedSeconds = seconds === 0 ? "" : `${seconds} с`;

    return `${formattedMinutes} ${formattedSeconds}`;
};

export {getTime, getFormattedTime, getFormattedTimeFromMinutes};