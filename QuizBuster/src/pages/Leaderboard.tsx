import React, { useState, useEffect } from "react";
import axios from "axios";               // Zum Abrufen der Daten vom Backend
import "./Leaderboard.css";             // Styling der Rangliste

// Typdefinition für einen Eintrag in der Rangliste
interface UserScore {
    id: number;
    username: string;
    score: number;
}

// Komponente für die Anzeige der Rangliste
const Leaderboard: React.FC = () => {
    // Zustand für die geladenen Punktestände
    const [scores, setScores] = useState<UserScore[]>([]);

    // Zustand für Ladeanzeige und Fehlerbehandlung
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // useEffect wird beim ersten Laden der Seite einmal ausgeführt
    useEffect(() => {
        // Funktion zum Abrufen der Score-Daten von der API
        const fetchScores = async () => {
            try {
                // API-Aufruf an den FastAPI-Backend-Endpunkt
                const response = await axios.get("http://localhost:8000/score");

                // Sortieren der Daten nach Score (absteigend)
                const sorted = response.data.sort((a: UserScore, b: UserScore) => b.score - a.score);

                // Zustand mit sortierten Daten aktualisieren
                setScores(sorted);
            } catch (err) {
                // Falls ein Fehler beim Abrufen auftritt
                setError("Fehler beim Laden der Rangliste.");
            } finally {
                // Ladeanzeige beenden
                setLoading(false);
            }
        };

        fetchScores();
    }, []); // Leeres Array bedeutet: nur einmal beim ersten Laden ausführen

    return (
        <div className="leaderboard">
            <h1>Rangliste</h1>

            {/* Ladeanzeige */}
            {loading && <p>Lade Rangliste...</p>}

            {/* Fehleranzeige */}
            {error && <p className="error">{error}</p>}

            {/* Tabelle nur anzeigen, wenn Daten erfolgreich geladen wurden */}
            {!loading && !error && (
                <table>
                    <thead>
                    <tr>
                        <th>Platz</th>
                        <th>Spieler</th>
                        <th>Punkte</th>
                    </tr>
                    </thead>
                    <tbody>
                    {scores.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>         {/* Platz (1-basiert) */}
                            <td>{user.username}</td>     {/* Benutzername */}
                            <td>{user.score}</td>        {/* Punktzahl */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Leaderboard;
