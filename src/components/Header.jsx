import React from "react";

const Header = ({ clinicName, userName, systemName }) => {
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
                        Welcome, <strong>{userName || "User"}</strong>
                    </span>
                    <span className="text-sm md:text-base font-medium">
                        <strong>{clinicName || "Clinic Name"}</strong>
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;