import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../assets/styles/Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="navbar-header">
            <nav className="navbar-nav">
                <div>
                    <NavLink to="/" className="navbar-brand">GestorOne</NavLink>
                </div>
                {user ? (
                    <div className="navbar-links-container">
                        <span>Olá, {user.name}!</span>
                        <NavLink to="/" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Home</NavLink>
                        <NavLink to="/services" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Serviços</NavLink>
                        <NavLink to="/users" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Usuários</NavLink>
                        <button onClick={handleLogout} className="navbar-logout-button">Sair</button>
                    </div>
                ) : (
                    <div className="navbar-links-container">
                        {/* Se não estiver logado, pode mostrar um link para o login */}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar; 