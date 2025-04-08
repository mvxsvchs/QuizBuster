import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

// Navigationsleiste für die gesamte Anwendung
const NavBar: React.FC = () => {
    const navigate = useNavigate();

    // Token & Username aus dem localStorage holen (falls eingeloggt)
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const isLoggedIn = !!token; // Login-Zustand ermitteln (true wenn Token vorhanden)

    // Logout-Funktion: Token & Username löschen und zurück zum Login leiten
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Spielname oben links – verlinkt je nach Login-Zustand zur richtigen Startseite */}
                <Link
                    to={isLoggedIn ? "/start" : "/"}
                    className="navbar-logo"
                >
                    BrainBusters
                </Link>

                {/* Menü rechts neben dem Logo */}
                <ul className="navbar-menu">
                    {/* Link zur Startseite abhängig vom Login */}
                    <li>
                        <Link to={isLoggedIn ? "/start" : "/"}>Startseite</Link>
                    </li>

                    {/* Rangliste ist für alle sichtbar */}
                    <li><Link to="/leaderboard">Rangliste</Link></li>

                    {/* Menü für eingeloggte Benutzer */}
                    {isLoggedIn ? (
                        <>
                            <li><Link to="/quiz">Spielen</Link></li>

                            {/* Benutzername anzeigen */}
                            <li className="navbar-username">
                                <Link to="/profil">{username}</Link>
                            </li>


                            {/* Logout-Knopf */}
                            <li>
                                <button onClick={handleLogout} className="logout-button">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        // Menü für nicht eingeloggte Benutzer
                        <>
                            <li><Link to="/login">Einloggen</Link></li>
                            <li><Link to="/register">Registrieren</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
