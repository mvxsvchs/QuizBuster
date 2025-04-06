// Importiere notwendige Komponenten und Routen-Funktionalität
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout & Seitenkomponenten
import NavBar from './components/NavBar';         // Navigationsleiste
import Register from './components/Register';     // Registrierungsformular
import Login from './components/Login';           // Loginformular


// Seiten
import Home from './pages/Home';                  // Startseite mit Login/Registrieren-Hinweis
import QuizGame from './pages/QuizGame';          // Das eigentliche Quiz
import Leaderboard from './pages/Leaderboard';    // Rangliste
import Startseite from './pages/StartingPage';    // Alternative Startseite

import './App.css'; // Globales Styling

// Hauptkomponente der App
function App() {
    return (
        <Router>
            {/* Navigationsleiste wird immer angezeigt */}
            <NavBar />
            {/* Hauptinhalt der Seite, je nach Route */}
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />                   {/* Startseite */}
                    <Route path="/quiz" element={<QuizGame />} />           {/* Quiz-Spiel */}
                    <Route path="/leaderboard" element={<Leaderboard />} /> {/* Rangliste */}
                    <Route path="/register" element={<Register />} />       {/* Registrierung */}
                    <Route path="/login" element={<Login />} />       {/* Registrierung */}
                    <Route path="/start" element={<Startseite />} />        {/* Startseite vor dem Quiz */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
