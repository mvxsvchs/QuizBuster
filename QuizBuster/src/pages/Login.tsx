import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface Props {
    onLogin: () => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const storedEmail = localStorage.getItem('user');
        const storedPassword = localStorage.getItem('password');

        if (email === storedEmail && password === storedPassword) {
            onLogin();
            navigate('/game');
        } else {
            setError('Falsche E-Mail oder Passwort.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <input placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} /><br />
            <input type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} /><br />
            <button onClick={handleLogin}>Login</button>
            {error && <p className="error">{error}</p>}
            <p><Link to="/forgot-password">Passwort vergessen?</Link></p>
        </div>
    );
};

export default Login;
