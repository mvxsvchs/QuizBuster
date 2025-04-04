import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

interface UserScore {
    id: number;
    username: string;
    score: number;
}

const mockScores: UserScore[] = [
    { id: 1, username: 'Alice', score: 15 },
    { id: 2, username: 'Bob', score: 12 },
    { id: 3, username: 'Charlie', score: 10 },
    { id: 4, username: 'David', score: 8 },
    { id: 5, username: 'Eva', score: 5 },
];

const Leaderboard: React.FC = () => {
    const [scores, setScores] = useState<UserScore[]>([]);

    useEffect(() => {
        // Sortiere die Ergebnisse nach absteigender Punktzahl
        const sortedScores = [...mockScores].sort((a, b) => b.score - a.score);
        setScores(sortedScores);
    }, []);

    return (
        <div className="leaderboard">
            <h1>Rangliste</h1>
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
        </div>
    );
};

export default Leaderboard;
