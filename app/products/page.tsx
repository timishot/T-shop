"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/type";
import ProductCard from "@/components/ProductCard";

type Category =
    | "All"
    | "Electronics"
    | "Accessories"
    | "Wearables"
    | "Smart Home"
    | "Furniture"
    | "Personal Care"
    | "Storage";

const categories: Category[] = [
    "All",
    "Electronics",
    "Accessories",
    "Wearables",
    "Smart Home",
    "Furniture",
    "Personal Care",
    "Storage",
];

const PRODUCTS_PER_PAGE = 10; // Items per page

const Page = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category>("All");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products"); // Adjust API route if necessary
                if (!res.ok) throw new Error("Failed to fetch products");

                const data: Product[] = await res.json();
                setProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products by selected category
    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter((product) => product.category === selectedCategory);

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <>
            <section className="product_background">
                <h1 className="ml-20 w-[500px]">15% off every $500 product for the Valentine period</h1>
            </section>

            <section className="mx-auto max-w-7xl my-12">
                <div className="w-full mx-auto">
                    <h2 className="font-semibold text-4xl mb-5 text-yellow-400">Explore Products Available</h2>
                    <div className="flex items-center justify-start gap-4 overflow-x-scroll scroll-smooth hide-scrollbar w-full max-w-[90vw]">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setCurrentPage(1); // Reset to page 1 on category change
                                }}
                                className={`${
                                    selectedCategory === category
                                        ? "bg-yellow-400 text-white border-[0] hover:bg-yellow-600"
                                        : "bg-[#fff] text-yellow-400 border border-yellow-400"
                                } rounded-xl py-[12px] px-[28px] font-semibold text-[1rem] hover:text-white-50`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Loading State */}
            {loading ? (
                <p className="text-center text-yellow-400">Loading products...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto max-w-7xl">
                    {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => <ProductCard key={product.id} product={product} />)
                    ) : (
                        <p className="text-center col-span-full">No products found.</p>
                    )}
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && !loading && (
                <div className="flex justify-center items-center space-x-4 mt-6 mb-6">
                    <Button onClick={goToPrevPage} disabled={currentPage === 1} className="bg-amber-400 text-white hover:bg-yellow-500">
                        Previous
                    </Button>
                    <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
                    <Button onClick={goToNextPage} disabled={currentPage === totalPages} className="bg-amber-400 text-white hover:bg-yellow-500">
                        Next
                    </Button>
                </div>
            )}
        </>
    );
};

export default Page;
