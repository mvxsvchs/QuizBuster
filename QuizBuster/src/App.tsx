import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import quizBusterLogo from './assets/QuizBuster.png';
import './App.css';

// Importiere deine Seiten
import Home from './pages/Home';
import About from './pages/About';
import Game from './pages/Game';

function App() {
    useEffect(() => {
        document.title = 'QuizBuster';
    }, []);

    return (
        <Router>
            {/* Sticky Header */}
            <header className="header">
                <div className="nav-container">
                    {/* Logo-Bereich links */}
                    <div className="logo-container">
                        <Link to="/home">  {/* Hier wird der Link zur Home-Seite gesetzt */}
                            <img src={quizBusterLogo} className="logo quizBuster" alt="Quiz Buster Logo" />
                        </Link>
                        <h1>Quiz Buster</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="nav">
                        <ul className="nav-links">
                            <li>
                                <Link to="/home">
                                    <button className="nav-button">Startseite</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/game">
                                    <button className="nav-button">Spielen</button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/about">
                                    <button className="nav-button">Über uns</button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Routing für die Seiten */}
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/game" element={<Game />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;
