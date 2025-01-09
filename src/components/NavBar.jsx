import React from "react";
import Button from "./Button";
import { Navigation } from "../apis/context/navigateContext";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          <a href="#">
            <img src="/logo.png" alt="logo" className="h-28" />
          </a>
        </div>

        {/* Menu Items */}
        <div className="flex items-center space-x-8">
          <a
            href="#home"
            className="hidden md:inline text-white hover:text-green-300 transition duration-200"
          >
            Home
          </a>
          <a
            href="#about"
            className="hidden md:inline text-white hover:text-green-300 transition duration-200"
          >
            About
          </a>
          <a
            href="#team"
            className="hidden md:inline text-white hover:text-green-300 transition duration-200"
          >
            Team
          </a>
          <Button onClick={()=>{Navigation('/signin')}} variant="filled" color="primary" size="md">
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
