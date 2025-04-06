// React Router wird genutzt, um verschiedene Seiten in der App aufzurufen
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import der selbst erstellten Komponenten und Seiten
import NavBar from './components/NavBar';         // Die Navigationsleiste oben
import Register from './components/Register';     // Seite zur Registrierung neuer Nutzer
import Login from './components/Login';           // Seite zum Einloggen bestehender Nutzer
import Home from './pages/Home';                  // Öffentliche Startseite
import QuizGame from './pages/QuizGame';          // Die Seite mit dem Quiz-Spiel
import Leaderboard from './pages/Leaderboard';    // Rangliste mit Punkteständen
import Startseite from './pages/StartingPage';    // Eigene Startseite für eingeloggte Nutzer
import './App.css';                               // Globale CSS-Datei für das Layout und Styling

// Hauptkomponente der App
function App() {
    return (
        // Router umschließt die gesamte Anwendung und verwaltet die Navigation
        <Router>
            {/* Die Navigationsleiste wird auf allen Seiten angezeigt */}
            <NavBar />

            {/* Der Hauptbereich, in dem die Seiteninhalte abhängig von der URL angezeigt werden */}
            <div className="main-content">
                <Routes>
                    {/* Öffentliche Startseite (wenn man nicht eingeloggt ist) */}
                    <Route path="/" element={<Home />} />

                    {/* Seite mit dem Quiz-Spiel */}
                    <Route path="/quiz" element={<QuizGame />} />

                    {/* Rangliste mit allen Punkteständen */}
                    <Route path="/leaderboard" element={<Leaderboard />} />

                    {/* Seite zur Registrierung eines neuen Kontos */}
                    <Route path="/register" element={<Register />} />

                    {/* Seite zum Einloggen */}
                    <Route path="/login" element={<Login />} />

                    {/* Eigene Startseite nach erfolgreichem Login */}
                    <Route path="/start" element={<Startseite />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
