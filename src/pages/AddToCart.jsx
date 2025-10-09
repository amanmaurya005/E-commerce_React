import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    const [currency, setCurrency] = useState(localStorage.getItem("currency") || "inr");
    const [total, setTotal] = useState(0);

    // Listen for currency changes (like in SingleProduct)
    useEffect(() => {
        const handleChange = () => setCurrency(localStorage.getItem("currency") || "inr");
        window.addEventListener("currencyChange", handleChange);
        return () => window.removeEventListener("currencyChange", handleChange);
    }, []);

    // Calculate total whenever cart or currency changes
    useEffect(() => {
        let totalAmount = 0;
        cart.forEach((item) => {
            const price = currency === "inr" ? parseFloat(item.priceInr) : parseFloat(item.priceUsd);
            totalAmount += price * item.quantity;
        });
        setTotal(totalAmount.toFixed(2));
    }, [cart, currency]);

    // Save to localStorage whenever cart updates
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Increase quantity
    function increaseQty(id) {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }

    // Decrease quantity
    function decreaseQty(id) {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                    : item
            )
        );
    }

    // Remove item
    function removeItem(id) {
        setCart((prev) => prev.filter((item) => item.id !== id));
    }

    // Empty cart
    function clearCart() {
        setCart([]);
        localStorage.removeItem("cart");
    }

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-200 text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Cart is Empty 🛍️</h2>
                <Link
                    to="/"
                    className="bg-amber-500 text-amber-900 px-6 py-3 rounded-full font-semibold shadow-sm hover:bg-amber-400 transition-all duration-300"
                >
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">🛒 Your Cart</h1>

                <div className="space-y-6">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col md:flex-row items-center justify-between border-b pb-6"
                        >
                            <div className="flex items-center gap-6 mb-4 md:mb-0">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-24 w-24 object-contain rounded-xl bg-gray-50 p-3"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                                    <p className="text-amber-600 font-medium mt-1">
                                        {currency === "inr"
                                            ? "₹" + item.priceInr
                                            : "$" + item.priceUsd}

                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* quantity control  */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => decreaseQty(item.id)}
                                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-lg font-bold hover:bg-gray-300 transition"
                                    >
                                        -
                                    </button>
                                    <span className="text-lg font-semibold">{item.quantity}</span>
                                    <button
                                        onClick={() => increaseQty(item.id)}
                                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-lg font-bold hover:bg-gray-300 transition"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Remove */}
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-400 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total section */}
                <div className="flex flex-col md:flex-row items-center justify-between mt-10">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Total:{" "}
                        <span className="text-amber-600">
                            {currency === "inr" ? "₹" + total : "$" + total}
                        </span>
                    </h2>

                    <div className="flex flex-wrap items-center gap-4 mt-6 md:mt-0">
                        <button
                            onClick={clearCart}
                            className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-sm hover:bg-red-400 transition-all duration-300"
                        >
                            Clear Cart
                        </button>

                        <Link
                            to="/"
                            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold shadow-sm hover:bg-gray-300 transition-all duration-300"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
