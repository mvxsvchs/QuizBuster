import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Für die Weiterleitung nach erfolgreichem Login
import axios from "axios";                      // Für den API-Aufruf
import "./login.css";                           // CSS für das Layout des Login-Formulars

// Login-Komponente
const Login: React.FC = () => {
    const navigate = useNavigate();             // ermöglicht Navigation per Code

    // Zustände für Eingabefelder & Fehlermeldung
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Wird beim Absenden des Formulars aufgerufen
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Verhindert Seiten-Neuladen
        setError("");       // Fehlermeldung zurücksetzen

        // Formulardaten vorbereiten (für OAuth2-kompatibles Backend)
        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", password);

        try {
            // Anfrage an /token-Endpunkt schicken
            const response = await axios.post("http://localhost:8000/token", formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            if (response.status === 200) {
                // 🟢 Token und Benutzername im localStorage speichern
                localStorage.setItem("token", response.data.access_token);
                localStorage.setItem("username", username);

                // Weiterleitung zur Startseite für eingeloggte Nutzer
                navigate("/start");
            }
        } catch (err: any) {
            // Fehlerbehandlung bei falschen Logindaten oder Serverfehlern
            if (err.response && err.response.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError("Login fehlgeschlagen. Bitte versuch es erneut.");
            }
        }
    };

    // === JSX-Ausgabe ===
    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>

                {/* Fehlermeldung (falls vorhanden) */}
                {error && <p className="login-error">{error}</p>}

                {/* Benutzername-Eingabe */}
                <input
                    type="text"
                    placeholder="Benutzername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                    required
                />

                {/* Passwort-Eingabe */}
                <input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    required
                />

                {/* Login-Button */}
                <button type="submit" className="login-button">
                    Einloggen
                </button>

                {/* Link zur Registrierung */}
                <p className="login-link">
                    Noch kein Konto?{" "}
                    <span onClick={() => navigate("/register")}>Registrieren</span>
                </p>
            </form>
        </div>
    );
};

export default Login;
