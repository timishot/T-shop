"use client"
import React, {useEffect} from 'react'
import Link from "next/link";
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {fetchCart} from "@/redux/features/cartThunks";

const Header = () => {
    const dispatch = useAppDispatch();
    // Access the cart state function from Redux
    useEffect(() => {
        dispatch(fetchCart()); // Sync Redux state with persisted JSON cart
    }, [dispatch]);
    const cart = useAppSelector((state) => state.cartReducer);

    return (
        <header className="my-10 flex justify-between gap-5 align-center mx-auto max-w-7xl">
            <Link href="/" className="text-yellow-500 font-bold text-4xl">T-shop </Link>
            <nav>
                <ul className=" flex gap-5">
                    <li>
                        <Link href="/New">
                            <p className="text-yellow-400 font-semibold">New</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/Popular">
                            <p className="text-yellow-400 font-semibold">Popular</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/About-us">
                            <p className="text-yellow-400 font-semibold">About Us</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/Contact">
                            <p className="text-yellow-400 font-semibold">Contact</p>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div>
                <Link href="/cart" className="relative">
                    {cart.length > 0 && <span className="absolute -top-4 -right-3 bg-yellow-500 text-white rounded-full px-2">{cart.length}</span>}
                    <Image src="/icons/cart.svg" alt="cart" width={30} height={30} />
                </Link>
            </div>
        </header>
    )
}
export default Header
