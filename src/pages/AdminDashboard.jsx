import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ManageUsers from '../pages/auth/ManageUsers';
import PatientRegister from './PatientRegister';
import PharmacistDashboard from './PharmacistDashboard';
import PrescriberDashboard from './PrescriberDashboard';


const AdminDashboard = () => {
    return (
        <Router>
        <div className="flex h-screen">
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
                Dashboard Home
            </NavLink>
            <NavLink
                to="/users"
                className={({ isActive }) =>
                `block px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                }
            >
                Manage Users
            </NavLink>
            <NavLink
                to="/triage"
                className={({ isActive }) =>
                `block px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
            }
            >
                Patients
            </NavLink>
            <NavLink
                to="/prescriptions"
                className={({ isActive }) =>
                `block px-4 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                }
            >
                Prescriptions
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
                <Route path="/" element={<ManagerUser />} />
                <Route path="/users" element={<ManageUsers />} />
                <Route path="/triage" element={<PatientRegister />} />
                <Route path="/prescriber" element={<PrescriberDashboard />} />
                <Route path="/pharmacy" element={<PharmacistDashboard />} />
            </Routes>
        </div>
        </div>
        </Router>
    );
};

export default AdminDashboard;