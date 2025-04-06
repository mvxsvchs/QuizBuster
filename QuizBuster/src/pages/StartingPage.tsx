import { Link } from 'react-router-dom'; // React Router Link für Navigation
import './StartingPage.css'; // CSS für das Layout und Styling der Startseite

// Startseite-Komponente des Quiz-Spiels
const Startseite: React.FC = () => {
    return (
        <div className="Startseite">
            {/* Überschrift des Spiels */}
            <h1>Willkommen zu QuizBuster!</h1>

            {/* Kurze Beschreibung */}
            <p>Teste dein Wissen mit unserem spannenden Quiz.</p>

            {/* Navigations-Link zum Quiz (führt zur /quiz Route) */}
            <Link to="/quiz">
                <button className="start-button">Quiz starten</button>
            </Link>
        </div>
    );
};

export default Startseite;
