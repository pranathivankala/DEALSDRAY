// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CreateEmployee from './components/CreateEmployee';
import EmployeeList from './components/EmployeeList';
import Navbar from './components/Navbar'; 
import EditEmployee from './components/EditEmployee';
import Dashboard from './components/Dashboard'; // Import Dashboard
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Protect the following routes */}
                <Route 
                    path="/create-employee" 
                    element={
                        <ProtectedRoute>
                            <CreateEmployee />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/employee-list" 
                    element={
                        <ProtectedRoute>
                            <EmployeeList />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/edit-employee/:name" 
                    element={
                        <ProtectedRoute>
                            <EditEmployee />
                        </ProtectedRoute>
                    } 
                />
                
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
