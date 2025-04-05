import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password || !confirmPassword) {
            setError("Bitte fülle alle Felder aus.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Die Passwörter stimmen nicht überein.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/register", {
                method: "POST",
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.detail || "Registrierung fehlgeschlagen.");
                return;
            }

            // Erfolgreich registriert
            navigate("/start");
        } catch (err) {
            setError("Server nicht erreichbar.");
        }
    };

    return (
        <form onSubmit={handleRegister} className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Registrieren</h2>

            <input
                type="text"
                placeholder="Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
                required
            />

            <input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
                required
            />

            <input
                type="password"
                placeholder="Passwort bestätigen"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
            />

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
                Registrieren
            </button>
        </form>
    );
}
