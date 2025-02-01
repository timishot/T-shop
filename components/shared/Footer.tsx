import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="mt-10 py-5 bg-gray-900 text-white text-center">
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center px-5">
                <p className="text-yellow-500 font-bold text-2xl">T-shop</p>
                <nav>
                    <ul className="flex gap-5 mt-3 md:mt-0">
                        <li>
                            <Link href="/New" className="text-yellow-400 font-semibold">New</Link>
                        </li>
                        <li>
                            <Link href="/Popular" className="text-yellow-400 font-semibold">Popular</Link>
                        </li>
                        <li>
                            <Link href="/About-us" className="text-yellow-400 font-semibold">About Us</Link>
                        </li>
                        <li>
                            <Link href="/Contact" className="text-yellow-400 font-semibold">Contact</Link>
                        </li>
                    </ul>
                </nav>
                <p className="mt-3 md:mt-0 text-sm">&copy; {new Date().getFullYear()} T-shop. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;