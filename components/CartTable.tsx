"use client"
import React, { useState } from 'react';
import { Product } from "@/type";
import { removeFromCart, updateCartQuantity } from "@/redux/features/cartSlice";
import { persistCart } from "@/redux/features/cartThunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";

const CartTable = ({ cartItems }: { cartItems: Product[] }) => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.loading); // Get loading state
    const error = useAppSelector((state) => state.error);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(cartItems.length / itemsPerPage);

    const handleRemoveFromCart = (productId: string) => {
        dispatch(removeFromCart(productId));
        const updatedCart = cartItems.filter((item) => item.id !== productId);
        dispatch(persistCart(updatedCart));
    };

    const handleQuantityChange = (product: Product, quantity: string) => {
        const parsedQuantity = parseInt(quantity, 10);
        if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
            dispatch(updateCartQuantity({ id: product.id, quantity: parsedQuantity }));
            const updatedCart = cartItems.map((item) =>
                item.id === product.id ? { ...item, quantity: parsedQuantity } : item
            );
            dispatch(persistCart(updatedCart));
        }
    };

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <>
            {loading ? ( // 🔥 Show loading indicator when fetching data
                <div className="flex items-center justify-center w-full h-64">
                    <h1 className="text-xl text-yellow-500">Loading...</h1>
                </div>
            ) : cartItems.length > 0 ? (
                <>
                    <section id="cart" className="overflow-x-auto w-full">
                        <table className="w-full border-collapse table-fixed">
                            <thead className="border-t border-b border-gray-200">
                            <tr>
                                <td className="font-semibold text-xs py-4 text-center uppercase w-[100px]">Remove</td>
                                <td className="font-semibold text-xs py-4 text-center uppercase w-[150px]">Image</td>
                                <td className="font-semibold text-xs py-4 text-center uppercase w-[250px]">Product</td>
                                <td className="font-semibold text-xs py-4 text-center uppercase w-[150px]">Price</td>
                                <td className="font-semibold text-xs py-4 text-center uppercase w-[150px]">Quantity</td>
                                <td className="font-semibold text-xs py-4 text-center uppercase w-[150px]">Subtotal</td>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="text-center py-3">
                                        <button onClick={() => handleRemoveFromCart(item.id)} disabled={loading}>
                                            <Image src="/icons/remove.svg" alt="remove" width={40} height={40}/>
                                        </button>
                                    </td>
                                    <td className="flex items-center justify-center py-3">
                                        <Image src={item.image} alt="image" width={50} height={50}
                                               className="w-[70px] object-fill"/>
                                    </td>
                                    <td className="text-left py-3">{item.description}</td>
                                    <td className="text-center py-3">${item.price}</td>
                                    <td className="text-center py-3">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item, e.target.value)}
                                            className="w-[70%] p-2 pl-4"
                                            disabled={loading}
                                        />
                                    </td>
                                    <td className="text-center py-3">${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </section>


                    {/* Pagination Controls */}
                    <section id="pagination" className="mt-12">
                        <div className="flex justify-center">
                            <button
                                onClick={() => handleChangePage(currentPage - 1)}
                                disabled={currentPage === 1 || loading}
                                className="bg-yellow-500 text-white py-2 px-4 mr-4 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="self-center text-lg">Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => handleChangePage(currentPage + 1)}
                                disabled={currentPage === totalPages || loading}
                                className="bg-yellow-500 text-white py-2 px-4 ml-4 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </section>

                    {/* Cart Totals */}
                    <section id="cart-add" className="mt-12 mx-auto max-w-7xl">
                        <div id="subtotal" className="w-full mb-8 border border-gray-300 p-8">
                            <h3 className="pb-4">Cart Totals</h3>
                            <table className="w-full border-collapse">
                                <tbody>
                                <tr>
                                    <td className="p-4">Cart Subtotal</td>
                                    <td className="p-4">
                                        ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4">Shipping</td>
                                    <td className="p-4">Free</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold">Total</td>
                                    <td className="p-4 font-bold">
                                        ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <button className="bg-yellow-500 text-white py-3 px-6 mt-4" disabled={loading}>
                                Proceed to checkout
                            </button>
                        </div>
                    </section>
                </>
            ) : (
                <div className="flex items-center justify-center w-full h-64">
                    <h1 className="border-dotted border-4 p-8 text-xl text-yellow-500">No items in Cart</h1>
                </div>
            )}
        </>
    );
};

export default CartTable;
