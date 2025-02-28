import React, { useState } from "react";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import avatarImg from "../assets/avatar.png";
import { useAuth } from "../context/AuthContext";

const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
]
const Navbar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const cartItems = useSelector(state => state.cart.cartItems);

    const { currentUser, logout } = useAuth();

    const handleLogOut = () => {
        logout();
    }


    return (
        <header className="max-w-screen-2xl mx-auto px-4 py-6">
            <nav className="flex justify-between items-center">
                {/* Left side */}
                <div className="flex items-center md:gap-16 gap-4">
                    <Link to="/">
                        <HiMiniBars3CenterLeft className="size-6" />
                    </Link>

                    {/* Search Input */}

                    <div className="relative sm:w-72 w-40 space-x-2">

                        <IoSearchOutline className="absolute inline-block left-2 inset-y-2" />

                        <input type="text" placeholder="Search here"
                            className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
                        />
                    </div>
                </div>

                {/* right side */}
                <div className="relative flex items-center md:space-x-3 space-x-2">
                    <div>
                        {
                            currentUser ?
                                <>
                                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                        <img src={avatarImg} alt="" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                                    </button>

                                    {/* Show Dropdowns */}
                                    {
                                        isDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-[0_5px_15px_rgba(0,0,0,0.2)] rounded-lg z-40 transform transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-105">
                                                <ul className="py-2">
                                                    {navigation.map((item) => (
                                                        <li key={item.name}>
                                                            <Link
                                                                to={item.href}
                                                                className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-200 transition-all duration-300 rounded-md"
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                    <li>
                                                        <button
                                                            onClick={handleLogOut}
                                                            className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-100 transition-all duration-300 rounded-md"
                                                        >
                                                            Logout
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>

                                        )
                                    }
                                </>
                                : <Link to="/login"><HiOutlineUser className="size-6" /></Link>
                        }
                    </div>
                    <button className="hidden sm:block">
                        <HiOutlineHeart className="size-6" />
                    </button>

                    <Link to="/cart" className="bg-[#FFCE1A] p-1 sm:px-6 px-2 flex items-center rounded-sm">
                        <HiOutlineShoppingCart className='' />
                        {
                            cartItems.length > 0 ? <span className="text-sm font-semibold sm:ml-1">{cartItems.length}</span>
                                : <span className="text-sm font-semibold sm:ml-1">0</span>
                        }

                    </Link>
                </div>
            </nav>

        </header>
    )
};

export default Navbar;
