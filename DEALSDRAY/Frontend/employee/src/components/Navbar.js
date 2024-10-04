import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun, FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            setDarkMode(true);
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        setDarkMode(prevMode => !prevMode);
        const newTheme = !darkMode ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        document.body.classList.toggle('dark', !darkMode);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src="/path/to/logo.png" alt="Logo" className="logo" /> 
            </div>
            <div className="navbar-right">
                <Link to="/create-employee">Create Employee</Link>
                <Link to="/employee-list">Employee List</Link>
                <Link to="/login">
                    <FaUser />
                </Link>
                <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
