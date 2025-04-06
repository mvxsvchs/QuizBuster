import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const isLoggedIn = !!token;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link
                    to={isLoggedIn ? "/start" : "/"}
                    className="navbar-logo"
                >
                    QuizBuster
                </Link>

                <ul className="navbar-menu">
                    <li>
                        <Link to={isLoggedIn ? "/start" : "/"}>Startseite</Link>
                    </li>
                    <li><Link to="/leaderboard">Rangliste</Link></li>

                    {isLoggedIn ? (
                        <>
                            <li><Link to="/quiz">Spielen</Link></li>
                            <li className="navbar-username">👤 {username}</li>
                            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                        </>
                    ) : (
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
