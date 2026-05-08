// lib
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// custom hooks
import { useAuth } from "../hooks/useAuth";

// components
import SignupInput from "../components/SignupInput";
import ErrorBox from "../components/ErrorBox";

// icons
import logo from "../assets/logo.svg";
import email_icon from "../assets/mail_icon.svg";
import password_icon from "../assets/lock_icon.svg";

// css
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated, loading } = useAuth();

    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate("/dashboard");
        }
    }, [loading, isAuthenticated, navigate]);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setError("");
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        // validation
        if (!formData.email || !formData.password) {
            return setError("Please fill in all fields");
        }

        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();
            console.log(response, data);
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            console.log("Login successful:", data);

            // save token
            login(data.token, data.user);

            // redirect
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="loginpage_container">
            <div className="loginpage_wrapper">
                <img src={logo} alt="Logo" className="logo" />

                <form onSubmit={handleSubmit}>
                    <p className="greeting">Welcome back</p>

                    <p className="sub_greeting">
                        Access your management dashboard.
                    </p>

                    <SignupInput
                        label="EMAIL"
                        icon={email_icon}
                        alt="Email Icon"
                        type="email"
                        name="email"
                        placeholder="john.doe@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <SignupInput
                        label="PASSWORD"
                        icon={password_icon}
                        alt="Password Icon"
                        type="password"
                        name="password"
                        placeholder="********"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <a href="/fpw" className="forgot_password">
                        Forgot password?
                    </a>

                    {error && <ErrorBox message={error} />}

                    <button type="submit" className="login_btn">
                        Login to Dashboard
                    </button>
                </form>

                <div className="signup_link_wrapper">
                    Don't have an account yet? &nbsp;
                    <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
