import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ systemName }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear stored authentication data
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("group");

        // Redirect to the landing page
        navigate("/");
    };

    // Retrieve user info from localStorage
    const userName = localStorage.getItem("username") || "User";
    const clinicName = localStorage.getItem("group") || "Clinic Name";
 
    return (
        <header className="top-0 left-0 w-full bg-gradient-to-r from-black via-transparent to-black shadow-md z-50" >
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-4">
                <div className="text-2xl font-bold text-white text-center mb-2 md:mb-0">
                    <a href="/" aria-label="Navigate to home">
                        <span>{systemName || "CuraNet"}</span>
                    </a>
                </div>
                <div className="text-white flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                    <span className="text-sm md:text-base font-medium">
                        Welcome, <strong>{userName}</strong>
                    </span>
                    <span className="text-sm md:text-base font-medium">
                        <strong>{clinicName}</strong>
                    </span>
                    <button
                        onClick={handleLogout}
                        className="text-sm md:text-base bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md"
                        aria-label="Logout"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;