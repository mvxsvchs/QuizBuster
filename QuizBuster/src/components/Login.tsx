import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login-register.css";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Bitte fülle alle Felder aus.");
            return;
        }

        // 🔒 Hier könnte ein echter API-Call hin
        console.log("Login erfolgreich:", username);

        // Weiterleiten
        navigate("/start");
    };

    return (
        <div className="auth-container">
        <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                {error && <p className="error">{error}</p>}
                <button type="submit">Einloggen</button>
                <p>Noch kein Konto? <a href="/register">Jetzt registrieren</a></p>
            </form>
        </div>
    );
};


export default Login;
