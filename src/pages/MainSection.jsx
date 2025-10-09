import React, { useEffect, useState } from "react";  
import axios from "axios";
import { Link } from "react-router-dom";


export default function MainSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "inr"); 
  

  useEffect(() => {
    fetchProducts();
  }, []);

  //  Listen for currency change event from Header
  useEffect(() => {
    const handleChange = () => setCurrency(localStorage.getItem("currency") || "inr");
    window.addEventListener("currencyChange", handleChange);
    return () => window.removeEventListener("currencyChange", handleChange);
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const productRes = await axios.get("https://fakestoreapi.com/products");
    const rateRes = await axios.get(
      "https://api.exchangerate.host/latest?base=USD&symbols=INR"
    );
    const rate = rateRes.data?.rates?.INR || 88;

    const convertedProducts = productRes.data.map((item) => ({
      ...item,
      priceINR: (item.price * rate).toFixed(2),
    }));

    setProducts(convertedProducts);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="text-center min-h-screen p-10 text-xl font-semibold text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <main className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">
          Products
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((obj) => (
            <Link to={"/product/" + obj.id} key={obj.id}>
              <div className="h-full bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center">
                <img
                  src={obj.image}
                  alt={obj.title}
                  className="w-full h-56 object-contain rounded-lg mb-4 bg-gray-100"
                />
                <h3 className="text-base font-medium text-gray-700 mb-2 text-center line-clamp-2">
                  {obj.title}
                </h3>

                {/* Show price according to selected currency */}
                <p className="text-lg font-semibold text-amber-500">
                  {currency === "inr"
                    ? "₹" + obj.priceINR
           : "$" + obj.price}
                </p>
               
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

