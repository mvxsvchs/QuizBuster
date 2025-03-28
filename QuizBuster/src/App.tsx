import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import quizBusterLogo from './assets/QuizBuster.png';
import './App.css';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Game from './pages/Game';
import Login from './pages/Login';
import Register from './pages/Register';
import Leaderboard from './pages/Leaderboard';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        document.title = 'QuizBuster';
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
            setUserEmail(user);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUserEmail(null);
        window.location.href = '/home';
    };

    return (
        <div className="App">
            <Router>
                <header className="header">
                    <div className="nav-container">
                        <div className="logo-container">
                            <Link to="/home">
                                <img src={quizBusterLogo} className="logo quizBuster" alt="Quiz Buster Logo" />
                            </Link>
                            <h1>Quiz Buster</h1>
                        </div>

                        <nav className="nav">
                            <ul className="nav-links">
                                <li><Link to="/home"><button className="nav-button">Startseite</button></Link></li>
                                <li><Link to="/leaderboard"><button className="nav-button">Rangliste</button></Link></li>
                                {!isLoggedIn && (
                                    <>
                                        <li><Link to="/login"><button className="nav-button">Login</button></Link></li>
                                        <li><Link to="/register"><button className="nav-button">Registrieren</button></Link></li>
                                    </>
                                )}
                                <li><Link to="/about"><button className="nav-button">Über uns</button></Link></li>
                                {isLoggedIn && (
                                    <>
                                        <li><Link to="/game"><button className="nav-button">Spielen</button></Link></li>
                                        <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
                                    </>
                                )}
                            </ul>
                        </nav>
                    </div>
                </header>

                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/login" element={<Login onLogin={() => {
                        setIsLoggedIn(true);
                        setUserEmail(localStorage.getItem('user'));
                    }} />} />
                    <Route path="/register" element={<Register onRegister={() => {
                        setIsLoggedIn(true);
                        setUserEmail(localStorage.getItem('user'));
                    }} />} />
                    <Route path="/game" element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <Game />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
