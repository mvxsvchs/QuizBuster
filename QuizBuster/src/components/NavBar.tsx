import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">Quizzer</Link>
                <ul className="navbar-menu">
                    <li><Link to="/">Startseite</Link></li>
                    <li><Link to="/quiz">Spielen</Link></li>
                    <li><Link to="/leaderboard">Rangliste</Link></li>
                    <li><Link to="/login">Einloggen</Link></li>
                    <li><Link to="/register">Registrieren</Link></li>


                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
