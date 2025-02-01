"use client"
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {Product} from "@/type";
import {removeFromCart, updateCartQuantity} from "@/redux/features/cartSlice";
import {persistCart} from "@/redux/features/cartThunks";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import Image from "next/image";

const CartTable = ({ cartItems } : any ) => {
    const dispatch = useAppDispatch();
    // Access the cart state function from Redux
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page

    // Calculate the current items to display on the page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(cartItems.length / itemsPerPage);

    const handleRemoveFromCart = (product: string) => {
        dispatch(removeFromCart(product));
        // After removing, persist the updated cart
        const updatedCart = cartItems.filter((item: Product) => item.id !== product);
        dispatch(persistCart(updatedCart));
    };

    const handleQuantityChange = (product, quantity) => {
        const parsedQuantity = parseInt(quantity, 10);
        if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
            dispatch(updateCartQuantity({ id: product.id, quantity: parsedQuantity }));
            // Persist the updated cart after changing quantity
            const updatedCart = cartItems.map((item) =>
                item.id === product.id ? { ...item, quantity: parsedQuantity } : item
            );
            dispatch(persistCart(updatedCart));
        }
    };

    const handleChangePage = (page:any) => {
        setCurrentPage(page);
    };

    return (
        <>
            {cartItems.length > 0 ? (
                <>
                    <section id="cart" className="p-16">
                        <table className="w-full border-collapse table-fixed">
                            <thead>
                            <tr>
                                <td className="text-center font-semibold text-xs py-4 uppercase">Remove</td>
                                <td className="text-center font-semibold text-xs py-4 uppercase">Image</td>
                                <td className="text-center font-semibold text-xs py-4 uppercase">Product</td>
                                <td className="text-center font-semibold text-xs py-4 uppercase">Price</td>
                                <td className="text-center font-semibold text-xs py-4 uppercase">Quantity</td>
                                <td className="text-center font-semibold text-xs py-4 uppercase">Subtotal</td>
                            </tr>
                            </thead>
                            <tbody>
                            {currentItems.map((item: any) => (
                                <tr key={item.id}>
                                    <td className="text-center py-3"><button onClick={() => handleRemoveFromCart(item.id)}><Image src="/icons/remove.svg" alt="remove" width={40} height={40} /></button></td>
                                    <td className="flex items-center justify-center py-3"><Image src={item.image} alt="image" width={50} height={50} className="w-16 object-fill" /></td>
                                    <td className="text-left py-3">{item.description}</td>
                                    <td className="text-center py-3">${item.price}</td>
                                    <td className="text-center py-3">
                                        <input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(item, e.target.value)} className="w-4/6 p-2" />
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
                                disabled={currentPage === 1}
                                className="bg-yellow-500 text-white py-2 px-4 mr-4 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="self-center text-lg">Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => handleChangePage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="bg-yellow-500 text-white py-2 px-4 ml-4 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </section>
                    <section id="cart-add" className=" mt-12 ">
                        <div id="subtotal" className="w-full mb-8 border border-gray-300 p-8">
                            <h3 className="pb-4">Cart Totals</h3>
                            <table className="w-full border-collapse">
                                <tbody>
                                <tr>
                                    <td className="p-4">Cart Subtotal</td>
                                    <td className="p-4">${cartItems.reduce((total: number, item:any) => total + item.price * item.quantity, 0).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="p-4">Shipping</td>
                                    <td className="p-4">Free</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold">Total</td>
                                    <td className="p-4 font-bold">${cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0).toFixed(2)}</td>
                                </tr>
                                </tbody>
                            </table>
                            <button className="bg-yellow-500 text-white py-3 px-6 mt-4">Proceed to checkout</button>
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

export  default CartTable;





