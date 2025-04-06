import { useEffect, useState } from "react";
import "./Profil.css";

interface Achievement {
    id: number;
    name: string;
    description: string;
}

const Profile = () => {
    const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
    const [unlockedIds, setUnlockedIds] = useState<number[]>([]);
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");


    useEffect(() => {
        if (!token) return;

        // Alle Achievements laden
        fetch("http://localhost:8000/achievement")
            .then((res) => res.json())
            .then((data) => setAllAchievements(data));

        // Freigeschaltete Achievements des Users
        fetch("http://localhost:8000/user/achievement", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setUnlockedIds(data.map((a: any) => a.id)));
    }, [token]);

    return (
        <div className="profile-page">
            <h2>Hallo {username}</h2>
            <h3>Erfolge</h3>

            <div className="achievement-list">
                {allAchievements.map((a) => {
                    const unlocked = unlockedIds.includes(a.id);
                    return (
                        <div
                            key={a.id}
                            className={`achievement-card ${unlocked ? "unlocked" : "locked"}`}
                        >
                            <span role="img" aria-label="trophy">
                                {unlocked ? "🏆" : "🔒"}
                            </span>
                            <div>
                                <strong>{a.name}</strong>
                                <p>{unlocked ? a.description : "Noch nicht freigeschaltet"}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Profile;
