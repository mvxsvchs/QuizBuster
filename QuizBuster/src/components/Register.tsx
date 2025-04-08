import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./register.css";

const RegisterPage: React.FC = () => {
        const navigate = useNavigate();

        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [error, setError] = useState("");

        const passwordsMatch = confirmPassword === "" || password === confirmPassword;

        const handleRegister = async (e: React.FormEvent) => {
            e.preventDefault();
            setError("");

            if (!passwordsMatch) {
                setError("Die Passwörter stimmen nicht überein.");
                return;
            }

            try {
                // Registrierung durchführen
                const registerResponse = await axios.post("http://localhost:8000/register", {
                    username,
                    password,
                });

                if (registerResponse.status === 200 || registerResponse.status === 201) {
                    localStorage.setItem("token", registerResponse.data.access_token);
                    localStorage.setItem("username", username);
                    navigate("/start");
                }
            } catch
                (err: any) {
                if (err.response && err.response.data?.detail) {
                    setError(err.response.data.detail);
                } else {
                    setError("Registrierung fehlgeschlagen. Bitte versuch es erneut.");
                }
            }
        };

        return (
            <div className="register-container">
                <form onSubmit={handleRegister} className="register-form">
                    <h2>Registrieren</h2>

                    {error && <p className="register-error">{error}</p>}

                    <input
                        type="text"
                        placeholder="Benutzername"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="register-input"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Passwort"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="register-input"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Passwort bestätigen"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`register-input ${
                            confirmPassword.length === 0
                                ? ""
                                : passwordsMatch
                                    ? "green"
                                    : "red"
                        }`}
                        required
                    />

                    {confirmPassword.length > 0 && (
                        <p className={`register-confirm-msg ${passwordsMatch ? "green" : "red"}`}>
                            {passwordsMatch
                                ? "✅ Passwörter stimmen überein"
                                : "❌ Passwörter stimmen nicht überein"}
                        </p>
                    )}

                    <button type="submit" className="register-button">
                        Registrieren
                    </button>

                    <p className="register-link">
                        Schon ein Konto?{" "}
                        <span onClick={() => navigate("/login")}>Zum Login</span>
                    </p>
                </form>
            </div>
        );
    }
;

export default RegisterPage;
