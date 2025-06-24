import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import '../assets/styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.get('http://localhost:3003/users');
            const users = response.data;

            const foundUser = users.find(
                (user) => user.email === email && user.password === password
            );

            if (foundUser) {
                login(foundUser);
                navigate('/');
            } else {
                setError('Email ou senha inválidos.');
            }
        } catch (err) {
            setError('Falha ao conectar com o servidor. Tente novamente mais tarde.');
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Acessar o Sistema</h1>
                {error && <p className="error-message" style={{ marginBottom: '1rem' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="login-form-group">
                        <label htmlFor="email" className="login-label">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="login-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu.email@exemplo.com"
                            required
                        />
                    </div>
                    <div className="login-form-group">
                        <label htmlFor="password" className="login-label">
                            Senha:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="******************"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className="login-button">
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login; 