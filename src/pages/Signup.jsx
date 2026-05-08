// lib
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// custon hooks
import { useAuth } from "../hooks/useAuth";

// logo
import visual_anchor from "../assets/visual_anchor.svg";
import person_icon from "../assets/person_icon.svg";
import email_icon from "../assets/mail_icon.svg";
import password_icon from "../assets/lock_icon.svg";
import confirm_icon from "../assets/confirm_icon.svg";

// components
import SignupInput from "../components/SignupInput";
import ErrorBox from "../components/ErrorBox";

// css
import "./SignUp.css";

const SignUp = () => {
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAuth();

        useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate("/dashboard");
        }
    }, [loading, isAuthenticated, navigate]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAgreed: false,
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setError("");
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        // validation
        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            return setError("Please fill in all fields");
        }

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        if (!formData.termsAgreed) {
            return setError("Please agree to the terms");
        }

        try {
            const response = await fetch("http://localhost:3000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            console.log("Signup successful:", data);
            // save token
            localStorage.setItem("token", data.token);

            // redirect
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signup_page">
            <div className="signup_container">
                <div className="left_panel">
                    <img src={visual_anchor} alt="Visual Anchor" />
                </div>

                <div className="right_panel">
                    <form onSubmit={handleSubmit}>
                        <p className="title">Join the club</p>

                        <p className="subtitle">
                            Step on the court. Manage, play and win.
                        </p>

                        <SignupInput
                            label="FULL NAME"
                            icon={person_icon}
                            alt="Person Icon"
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                        />

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

                        <div className="password_wrapper">
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

                            <SignupInput
                                label="CONFIRM PASSWORD"
                                icon={confirm_icon}
                                alt="Confirm Password Icon"
                                type="password"
                                name="confirmPassword"
                                placeholder="********"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="checkbox_wrapper">
                            <input
                                type="checkbox"
                                id="terms"
                                name="termsAgreed"
                                checked={formData.termsAgreed}
                                onChange={handleChange}
                            />

                            <label htmlFor="terms">
                                I agree to the <span>Term of Service</span> and{" "}
                                <span>Privacy Policy</span>
                            </label>
                        </div>

                        {error && <ErrorBox message={error} />}

                        <button type="submit" className="signup_button">
                            Create account
                        </button>
                    </form>

                    <div className="login_wrapper">
                        Already have an account? &nbsp;
                        <Link to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
