import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/Navbar.css';

const Navbar = () => {
    return (
        <header className="navbar-header">
            <nav className="navbar-nav">
                <div>
                    <NavLink to="/" className="navbar-brand">GestorApp</NavLink>
                </div>
                <div className="navbar-links-container">
                    <NavLink to="/" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Home</NavLink>
                    <NavLink to="/services" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Serviços</NavLink>
                    <NavLink to="/users" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Usuários</NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Navbar; 