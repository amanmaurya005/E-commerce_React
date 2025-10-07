import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-200">
        <p className="text-gray-600 text-xl animate-pulse">Loading product...</p>
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Image Section */}
        <div className="flex items-center justify-center bg-gray-50 p-10">
          <img
            src={product.image}
            alt={product.title}
            className="h-80 md:h-96 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Right Details Section */}
        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>
          <p className="text-emerald-600 text-2xl font-semibold mb-6">
            ${product.price}
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Category Badge */}
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium mb-6 capitalize">
            {product.category}
          </span>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all duration-300">
              Add to Cart
            </button>
            <Link
              to="/"
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold shadow-sm hover:bg-gray-300 transition-all duration-300"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
