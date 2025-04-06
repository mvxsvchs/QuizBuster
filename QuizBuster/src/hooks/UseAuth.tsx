// Eigener React-Hook zur Authentifizierung (Login-Status prüfen)
export const useAuth = () => {
    // Hole gespeicherten Token und Username aus dem Browser-Speicher
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    // Prüfe, ob ein Token existiert → Benutzer ist eingeloggt
    const isLoggedIn = !!token;

    // Logout-Funktion: löscht Daten aus localStorage und leitet zum Login weiter
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/login"; // Browserweiterleitung
    };

    // Rückgabe des Status und der Funktionen
    return { token, username, isLoggedIn, logout };
};
