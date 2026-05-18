// icons
import error_icon from "../assets/error_icon.svg";

// css
import "./ErrorBox.css";

const ErrorBox = ({ message }) => {
    return (
        <div className="error_box">
            <img src={error_icon} alt="Error Icon" className="error_icon" />
            <p className="error_msg">{message}</p>
        </div>
    );
};

export default ErrorBox;
