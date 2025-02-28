import React from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import footerLogo from "../assets/footer-logo.png";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 px-6">
            {/* Top Section */}
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Left Side - Logo and Navigation */}
                <div className="md:w-1/3 w-full text-center md:text-left">
                    <img src={footerLogo} alt="Logo" className="mb-5 w-40 mx-auto md:mx-0" />
                    <ul className="flex flex-col md:flex-row gap-4 text-sm font-light">
                        <li><a href="#home" className="hover:text-[#FFCE1A] transition-all">Home</a></li>
                        <li><a href="#services" className="hover:text-[#FFCE1A] transition-all">Services</a></li>
                        <li><a href="#about" className="hover:text-[#FFCE1A] transition-all">About Us</a></li>
                        <li><a href="#contact" className="hover:text-[#FFCE1A] transition-all">Contact</a></li>
                    </ul>
                </div>

                {/* Center - Newsletter */}
                <div className="md:w-1/3 w-full text-center">
                    <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
                    <p className="text-sm text-gray-300 mb-4">
                        Subscribe to our newsletter for the latest news and offers!
                    </p>
                    <div className="flex items-center border border-gray-500 rounded-lg overflow-hidden">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 bg-white text-black outline-none"
                        />
                        <button className="bg-[#FFCE1A] text-black px-6 py-2 font-bold hover:bg-[#E5B800] transition-all">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Right Side - Social Icons */}
                <div className="md:w-1/3 w-full flex justify-center md:justify-end">
                    <div className="flex gap-6">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFCE1A] transition-all">
                            <FaFacebook size={28} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFCE1A] transition-all">
                            <FaTwitter size={28} />
                        </a>
                        <a href="https://www.linkedin.com/in/subham-saha-131117322/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFCE1A] transition-all">
                            <FaLinkedin size={28} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="container mx-auto mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
                <p className="text-center md:text-left">
                    &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                </p>
                <ul className="flex gap-6 mt-4 md:mt-0">
                    <li><a href="#privacy" className="hover:text-[#FFCE1A] transition-all">Privacy Policy</a></li>
                    <li><a href="#terms" className="hover:text-[#FFCE1A] transition-all">Terms of Service</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
