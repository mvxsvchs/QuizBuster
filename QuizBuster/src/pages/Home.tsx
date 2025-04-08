import { Link } from 'react-router-dom'; // Link-Komponente für Navigation ohne Seiten-Neuladen
import './Home.css'; // CSS-Datei mit dem Design für die Startseite

// Die öffentliche Startseite, die angezeigt wird, wenn der Benutzer nicht eingeloggt ist
const Home: React.FC = () => {
    return (
        <div className="home">
            {/* Hauptüberschrift der Seite */}
            <h1>Willkommen zu BrainBusters!</h1>

            {/* Kurze Erklärung, was zu tun ist */}
            <p>
                Wenn du spielen möchtest, musst du dich in dein Konto einloggen
                oder ein Konto erstellen.
            </p>

            {/* Bereich mit zwei Buttons zur Auswahl: Login oder Registrierung */}
            <div className="button-group">

                {/* Button führt zur Login-Seite ("/login") */}
                <Link to="/login">
                    <button className="login-button">Einloggen</button>
                </Link>

                {/* Button führt zur Registrierungs-Seite ("/register") */}
                <Link to="/register">
                    <button className="register-button">Registrieren</button>
                </Link>

            </div>
        </div>
    );
};

export default Home;
