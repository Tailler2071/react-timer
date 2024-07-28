import {ButtonProps} from "./Button.props.ts";


const Button = ({children, className, ...props}: ButtonProps) => {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

export default Button;