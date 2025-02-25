"use client"
import React, {useEffect, useState} from 'react'

import CartTable from "@/components/CartTable";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {fetchCart} from "@/redux/features/cartThunks";

const Page = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart);
    const [loadingPersist, setLoadingPersist] = useState(false);
    const loading = useAppSelector((state) => state.loading);

    useEffect(() => {
        dispatch(fetchCart()); // Sync Redux state with persisted JSON cart
    }, [dispatch]);
    return (
        <>
            <div className="mt-28">
                <CartTable cartItems={cart}/>
            </div>

        </>
    )
}
export default Page
