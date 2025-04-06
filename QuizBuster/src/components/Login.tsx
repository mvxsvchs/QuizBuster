import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", password);

        try {
            const response = await axios.post("http://localhost:8000/token", formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            if (response.status === 200) {
                // 🟢 Token & Username speichern
                localStorage.setItem("token", response.data.access_token);
                localStorage.setItem("username", username); // Username zusätzlich speichern
                navigate("/start");
            }
        } catch (err: any) {
            if (err.response && err.response.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError("Login fehlgeschlagen. Bitte versuch es erneut.");
            }
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>

                {error && <p className="login-error">{error}</p>}

                <input
                    type="text"
                    placeholder="Benutzername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                    required
                />

                <input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    required
                />

                <button type="submit" className="login-button">
                    Einloggen
                </button>

                <p className="login-link">
                    Noch kein Konto?{" "}
                    <span onClick={() => navigate("/register")}>Registrieren</span>
                </p>
            </form>
        </div>
    );
};

export default Login;
