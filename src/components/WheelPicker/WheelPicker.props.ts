export interface WheelPickerProps {
    data: string[];
    selectedID: number;
    onChange: (index: number) => void;
    height: number;
    itemHeight: number;
}
