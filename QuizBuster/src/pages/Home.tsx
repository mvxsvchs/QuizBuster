import { Link } from 'react-router-dom'; // Link-Komponente für Seitenwechsel ohne Neuladen
import './Home.css'; // CSS für die Startseite

// Startseite mit Login/Registrierungsauswahl
const Home: React.FC = () => {
    return (
        <div className="home">
            {/* Überschrift */}
            <h1>Willkommen zu QuizBuster!</h1>
            {/* Beschreibungstext */}
            <p>Wenn du spielen möchtest, musst du dich in dein Konto einloggen oder ein Konto erstellen.</p>
            {/* Button-Gruppe für Navigation zu Login und Registrierung */}
            <div className="button-group">
                {/* Link zur Login-Seite */}
                <Link to="/login">
                    <button className="login-button">Einloggen</button>
                </Link>

                {/* Link zur Registrierungs-Seite */}
                <Link to="/register">
                    <button className="register-button">Registrieren</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
