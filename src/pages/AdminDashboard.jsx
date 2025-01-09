import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ManageUsers from '../pages/auth/ManageUsers';
import PatientRegister from './PatientRegister';
import PharmacistDashboard from './PharmacistDashboard';
import PrescriberDashboard from './PrescriberDashboard';
import LoginPage from './LoginPage';
import Header from "../components/Header";
import Footer from "../components/Footer";



const AdminDashboard = () => {
    return (
        <div className="flex h-screen">
            {/* Header */}
            <Header />

            <div className="flex flex-1">
            {/* Sidebar */}
                <div className="w-1/4 bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold mb-6">CuraNet Admin</h2>
                <nav className="space-y-4">
                    <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                    }
                >
                    Users
                </NavLink>
                <NavLink
                    to="/users"
                    className={({ isActive }) =>
                    `block px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                    }
                >
                    Login
                </NavLink>
                <NavLink
                    to="/triage"
                    className={({ isActive }) =>
                    `block px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                }
                >
                    Triage
                </NavLink>
                <NavLink
                    to="/prescriber"
                    className={({ isActive }) =>
                    `block px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                    }
                >
                    Prescriber
                </NavLink>
                <NavLink
                    to="/pharmacy"
                    className={({ isActive }) =>
                    `block px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                    }
                >
                    Pharmacy
                </NavLink>
                </nav>
            </div>

            {/* Main */}
            <div className="flex-1 p-6">
                <Routes>
                    <Route path="/" element={<ManageUsers />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/triage" element={<PatientRegister />} />
                    <Route path="/prescriber" element={<PrescriberDashboard />} />
                    <Route path="/pharmacy" element={<PharmacistDashboard />} />
                </Routes>
            </div>
            </div>
        {/* Footer */}
        <Footer />
        </div>
    );
};

export default AdminDashboard;