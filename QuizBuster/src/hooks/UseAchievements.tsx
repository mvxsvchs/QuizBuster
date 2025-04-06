import { useState, useEffect } from "react";

// Achievement-ID zu Namen
const achievementNames: Record<number, string> = {
    1: "Quiz-Neuling",
    3: "Schnell wie der Blitz",
    4: "Wissensjäger",
    5: "Perfektionist",
};

export const useAchievements = (
    token: string,
    score: number,
    correctStreak: number,
    answerTime: number,
    onUnlock?: (title: string) => void // 👈 Neuer Callback
) => {
    const [achievements, setAchievements] = useState<number[]>([]);

    useEffect(() => {
        if (!token) return;

        fetch("http://localhost:8000/user/achievement", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                const ids = data.map((a: any) => a.id);
                setAchievements(ids);
            });
    }, [token]);

    const unlockAchievement = (id: number) => {
        if (!token || achievements.includes(id)) return;

        fetch("http://localhost:8000/user/achievement", {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        }).then((res) => {
            if (!res.ok) throw new Error("Fehler beim Unlock");
            setAchievements((prev) => [...prev, id]);

            const name = achievementNames[id] || "Unbekanntes Achievement";
            if (onUnlock) onUnlock(name); //
        });
    };

    const checkAchievements = () => {
        if (score > 0 && !achievements.includes(1)) unlockAchievement(1);
        if (answerTime <= 5 && !achievements.includes(3)) unlockAchievement(3);
        if (score >= 100 && !achievements.includes(4)) unlockAchievement(4);
        if (correctStreak >= 6 && !achievements.includes(5)) unlockAchievement(5);
    };

    return { achievements, checkAchievements };
};
