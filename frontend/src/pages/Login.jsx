import { useState } from "react";

import DEMO_USERS from "../config/demoUsers";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        setError("");

        const user = DEMO_USERS.find(
            (item) =>
                item.username === username.trim() &&
                item.password === password,
        );

        if (!user) {
            setError("Invalid username or password.");
            return;
        }

        onLogin({
            username: user.username,
            role: user.role,
        });
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-brand">
                    <h1>AI-Enabled Top Management Decision Support Platform</h1>
                    <p>Insights from External Sources</p>
                </div>

                <form onSubmit={handleSubmit}>
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
                            placeholder="Enter username"
                            autoComplete="username"
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
                            placeholder="Enter password"
                            autoComplete="current-password"
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
                    >
                        Login
                    </button>
                </form>

                {/* <div className="demo-credentials">
                    <strong>Demo credentials</strong>
                    <span>admin / admin123</span>
                    <span>user / user123</span>
                </div> */}
            </div>
        </div>
    );
}

export default Login;