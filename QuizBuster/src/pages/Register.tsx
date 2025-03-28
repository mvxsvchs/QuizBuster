import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    onRegister: () => void;
}

const Register: React.FC<Props> = ({ onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        if (!email || !password) return alert('Bitte fülle alle Felder aus.');

        localStorage.setItem('user', email);
        localStorage.setItem('password', password);
        onRegister();
        navigate('/game');
    };

    return (
        <div className="auth-container">
            <h2>Registrieren</h2>
            <input placeholder="E-Mail" value={email} onChange={e => setEmail(e.target.value)} /><br />
            <input type="password" placeholder="Passwort" value={password} onChange={e => setPassword(e.target.value)} /><br />
            <button onClick={handleRegister}>Registrieren</button>
        </div>
    );
};

export default Register;
