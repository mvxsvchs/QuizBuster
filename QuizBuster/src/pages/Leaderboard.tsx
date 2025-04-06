import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Leaderboard.css";

interface UserScore {
    id: number;
    username: string;
    score: number;
}

const Leaderboard: React.FC = () => {
    const [scores, setScores] = useState<UserScore[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await axios.get("http://localhost:8000/score");
                const sorted = response.data.sort((a: UserScore, b: UserScore) => b.score - a.score);
                setScores(sorted);
            } catch (err) {
                setError("Fehler beim Laden der Rangliste.");
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    return (
        <div className="leaderboard">
            <h1>Rangliste</h1>

            {loading && <p>Lade Rangliste...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <table>
                    <thead>
                    <tr>
                        <th>Platz</th>
                        <th>Benutzer</th>
                        <th>Punkte</th>
                    </tr>
                    </thead>
                    <tbody>
                    {scores.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.score}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Leaderboard;
