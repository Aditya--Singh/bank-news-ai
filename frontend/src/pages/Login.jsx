import { useState } from "react";

import pnbLogo from "../assets/pnb_logo.png";
import { login } from "../api/auth";


function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        const trimmedUsername = username.trim();

        if (!trimmedUsername || !password) {
            setError("Please enter your username and password.");
            return;
        }

        setIsLoading(true);

        try {
            const data = await login(
                trimmedUsername,
                password,
            );

            onLogin({
                username: data.username,
                role: data.role,
                accessToken: data.access_token,
            });
        } catch (error) {
            console.error("Login failed:", error);

            if (error.response?.status === 401) {
                setError("Invalid username or password.");
            } else {
                setError(
                    "Unable to connect to the authentication service.",
                );
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="login-page">
            <div className="login-background-pattern" />

            <div className="login-card">
                <div className="login-accent" />

                <div className="login-brand">
                    <div className="login-brand-mark">
                        <div className="login-brand-mark">
                            <img
                                src={pnbLogo}
                                alt="Punjab National Bank"
                            />
                        </div>
                    </div>

                    <div className="login-brand-text">
                        <strong>
                            PUNJAB NATIONAL BANK
                        </strong>

                        <span>
                            ...the name you can BANK upon!
                        </span>
                    </div>
                </div>

                <div className="login-heading">
                    <h1>
                        AI-Enabled Top Management
                        Decision Support Platform
                    </h1>

                    <p>
                        Insights from External Sources
                    </p>
                </div>

                <div className="login-divider" />

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            placeholder="Enter your username"
                            autoComplete="username"
                            autoFocus
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            disabled={isLoading}
                        />
                    </div>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? "Signing In..."
                            : "Sign In"}
                    </button>
                </form>

                <div className="login-footer">
                    <span>
                        Business &amp; Banking Intelligence
                    </span>

                    <span className="login-footer-dot">
                        •
                    </span>

                    <span>
                        AI Powered
                    </span>
                </div>
            </div>
        </div>
    );
}


export default Login;