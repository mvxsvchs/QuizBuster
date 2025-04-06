import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Navigation nach erfolgreichem Registrieren
import axios from "axios";
import "./register.css"; // Styling der Registrierungsseite

// Komponente für das Registrierungsformular
const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    // Eingabefelder und Fehlerzustand
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // Live-Validierung: Stimmen beide Passwörter überein?
    const passwordsMatch = confirmPassword === "" || password === confirmPassword;

    // Funktion wird beim Abschicken des Formulars aufgerufen
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault(); // Verhindert Seitenneuladen
        setError("");       // Fehler zurücksetzen

        // Prüfen, ob Passwörter gleich sind
        if (!passwordsMatch) {
            setError("Die Passwörter stimmen nicht überein.");
            return;
        }

        try {
            // API-Aufruf zur Registrierung
            const response = await axios.post("http://localhost:8000/register", {
                username,
                password,
            });

            // Weiterleitung bei erfolgreicher Registrierung
            if (response.status === 200 || response.status === 201) {
                navigate("/start");
            }
        } catch (err: any) {
            // Fehlerbehandlung (z. B. Username existiert schon)
            if (err.response && err.response.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError("Registrierung fehlgeschlagen. Bitte versuch es später erneut.");
            }
        }
    };

    // === JSX-Ausgabe ===
    return (
        <div className="register-container">
            <form onSubmit={handleRegister} className="register-form">
                <h2>Registrieren</h2>

                {/* Fehlermeldung (falls vorhanden) */}
                {error && <p className="register-error">{error}</p>}

                {/* Benutzername-Eingabe */}
                <input
                    type="text"
                    placeholder="Benutzername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="register-input"
                    required
                />

                {/* Passwort-Eingabe */}
                <input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="register-input"
                    required
                />

                {/* Passwort-Bestätigung mit Live-Validierung */}
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

                {/* Live-Nachricht, ob die Passwörter übereinstimmen */}
                {confirmPassword.length > 0 && (
                    <p className={`register-confirm-msg ${passwordsMatch ? "green" : "red"}`}>
                        {passwordsMatch
                            ? "✅ Passwörter stimmen überein"
                            : "❌ Passwörter stimmen nicht überein"}
                    </p>
                )}

                {/* Registrieren-Button */}
                <button type="submit" className="register-button">
                    Registrieren
                </button>

                {/* Link zum Login */}
                <p className="register-link">
                    Schon ein Konto?{" "}
                    <span onClick={() => navigate("/login")}>Zum Login</span>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;
