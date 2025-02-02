"use client"
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCart } from "@/redux/features/cartThunks";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
    const dispatch = useAppDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const cart = useAppSelector((state) => state.cart);

    return (
        <header className="my-10 flex justify-between items-center mx-auto max-w-7xl px-4">
            <Link href="/" className="text-yellow-500 font-bold text-4xl">T-shop</Link>

            <nav className="hidden md:flex gap-5">
                <ul className="flex gap-5">
                    <li><Link href="/New" className="text-yellow-400 font-semibold">New</Link></li>
                    <li><Link href="/Popular" className="text-yellow-400 font-semibold">Popular</Link></li>
                    <li><Link href="/About-us" className="text-yellow-400 font-semibold">About Us</Link></li>
                    <li><Link href="/Contact" className="text-yellow-400 font-semibold">Contact</Link></li>
                </ul>
            </nav>

            <div className="flex items-center gap-4">
                <Link href="/cart" className="relative">
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full px-2 text-xs">{cart.length}</span>
                    )}
                    <Image src="/icons/cart.svg" alt="cart" width={30} height={30} />
                </Link>

                {/* Dashboard icon only on larger screens */}
                <div className="hidden md:block">
                    <Link href="/dashboard">
                        <Image src="/icons/dashboard.svg" alt="dashboard" width={40} height={40} />
                    </Link>
                </div>

                {/* Hamburger Menu */}
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="md:hidden">
                            <Image src="/icons/menu.svg" alt="menu" width={30} height={30} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="bg-white">
                        <ul className="flex flex-col gap-4 p-4">
                            {/* Dashboard icon inside Sheet for small screens */}
                            <li className="block md:hidden">
                                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                                    <div className="flex items-center gap-2">
                                        <Image src="/icons/dashboard.svg" alt="dashboard" width={30} height={30} />
                                        <span>Dashboard</span>
                                    </div>
                                </Link>
                            </li>
                            <li><Link href="/New" onClick={() => setIsMenuOpen(false)}>New</Link></li>
                            <li><Link href="/Popular" onClick={() => setIsMenuOpen(false)}>Popular</Link></li>
                            <li><Link href="/About-us" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
                            <li><Link href="/Contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>

                        </ul>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};

export default Header;
