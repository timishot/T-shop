"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { fetchCart } from "@/redux/features/cartThunks";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    ArcElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, ArcElement, PointElement, Title, Tooltip, Legend);

const page = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart);
    const loading = useAppSelector((state) => state.loading);

    const [metrics, setMetrics] = useState({
        totalSales: 12450, // Mock sales data
        totalProducts: cart.length,
        topSellingProduct: cart[0] || "No Data",
        salesTrend: [500, 700, 1000, 1500, 2000, 2500, 3000], // Mock sales trend
        categorySales: { Electronics: 40, Clothing: 25, Furniture: 35 }, // Mock category-wise sales
    });

    useEffect(() => {
        dispatch(fetchCart()); // Fetch cart data on mount
    }, [dispatch]);

    useEffect(() => {
        setMetrics((prev) => ({
            ...prev,
            totalProducts: cart.length,
            topSellingProduct: cart[0] || "No Data",
        }));
    }, [cart]);

    // Bar Chart - Monthly Sales
    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
            {
                label: "Monthly Sales ($)",
                data: metrics.salesTrend,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
            },
        ],
    };

    // Line Chart - Product Growth
    const productData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
            {
                label: "Products Added",
                data: [5, 15, 30, 45], // Mock product growth
                fill: false,
                borderColor: "rgba(255, 99, 132, 1)",
                tension: 0.4,
                pointBackgroundColor: "rgba(255, 99, 132, 1)",
                pointHoverRadius: 7,
            },
        ],
    };

    // Pie Chart - Category-wise Sales
    const pieData = {
        labels: Object.keys(metrics.categorySales),
        datasets: [
            {
                data: Object.values(metrics.categorySales),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF4365", "#2492EB", "#FFBE46"],
            },
        ],
    };

    // Chart.js Options (for tooltips & animations)
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                enabled: true,
                mode: "index",
                intersect: false,
            },
        },
        animation: {
            duration: 2000,
            easing: "easeInOutQuart",
        },
    };

    return (
        <div className="p-8 mx-auto max-w-7xl mb-20 ">
            <h1 className="text-2xl font-bold mb-6">📊 Product Management Dashboard</h1>

            {loading && <p>Loading data...</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Sales */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h3 className="text-xl font-semibold">💰 Total Sales</h3>
                    <p className="text-3xl font-bold text-green-600">${metrics.totalSales}</p>
                </div>

                {/* Total Products */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h3 className="text-xl font-semibold">📦 Total Products</h3>
                    <p className="text-3xl font-bold">{metrics.totalProducts}</p>
                </div>

                {/* Top-Selling Product */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h3 className="text-xl font-semibold">🔥 Top Product</h3>
                    <p className="text-lg">{metrics.topSellingProduct?.description || "No Data"}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {/* Bar Chart */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">📈 Monthly Sales Trend</h3>
                    <Bar data={salesData} options={chartOptions} />
                </div>

                {/* Line Chart */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">📊 Products Added Over Time</h3>
                    <Line data={productData} options={chartOptions} />
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">🛒 Category Sales Distribution</h3>
                    <Pie data={pieData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default page;
