import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login-register.css";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password || !confirmPassword) {
            setError("Bitte fülle alle Felder aus.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Die Passwörter stimmen nicht überein.");
            return;
        }

        // 🔐 Hier könnte später ein echter API-Call hin
        console.log("Registrierung erfolgreich:", username);

        // Weiterleiten
        navigate("/start");
    };

    return (
        <div className="auth-container">
        <h2>Registrieren</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Benutzername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Passwort wiederholen"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Registrieren</button>
                <p>Schon registriert? <a href="/login">Zum Login</a></p>
            </form>
        </div>
    );
};

export default Register;
