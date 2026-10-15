import React, { useState } from "react";
import { User, LogIn, UserPlus, Logs, House } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const handleLinkClick = () => {
        setShowDropdown(false);
    };
    return (
        <>
            <div className="flex justify-between bg-gray-300">
                <div className="p-2">Navbar</div>
                <div className="relative">
                    <button
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-400"
                        onClick={() => setShowDropdown(!showDropdown)}>
                        <User size={20} />
                        Account
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border z-50">
                            <Link to="/" className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
                                <House size={18} />
                                Home
                            </Link>

                            <Link to="/Login" className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
                                <LogIn size={18} />
                                Login
                            </Link>

                            <Link to="/Registration" className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
                                <UserPlus size={18} />
                                Register
                            </Link>

                            <Link to="/TaskManagement" className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100" onClick={handleLinkClick}>
                                <Logs size={18} />
                                Tasks
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar;