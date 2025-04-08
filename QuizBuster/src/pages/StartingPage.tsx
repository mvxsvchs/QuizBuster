import { Link } from 'react-router-dom'; // React Router: Link-Komponente für Navigation ohne Neuladen
import './StartingPage.css';             // Externe CSS-Datei für das Styling der Startseite

// Komponente für die Startseite nach dem Login
const Startseite: React.FC = () => {
    return (
        <div className="Startseite">
            {/* Hauptüberschrift */}
            <h1>Willkommen zu BrainBusters!</h1>

            {/* Kurze Beschreibung unter dem Titel */}
            <p>Teste dein Wissen mit unserem spannenden Quiz.</p>

            {/* Start-Button: führt zur Quiz-Seite (/quiz) */}
            <Link to="/quiz">
                <button className="start-button">Quiz starten</button>
            </Link>
        </div>
    );
};

export default Startseite;
