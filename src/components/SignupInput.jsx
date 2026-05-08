// css
import "./SignupInput.css";

const SignupInput = ({ label, icon, alt, type, value, onChange, placeholder, name }) => {
    return (
        <div className='input_container'>
            <label htmlFor={name}>{label}</label>
            <div className="input_wrapper">
                <img className='input_icon' src={icon} alt={alt} />
                <input type={type} id={name} value={value} onChange={onChange} placeholder={placeholder} name={name} />
            </div>
        </div>
    );
}

export default SignupInput;