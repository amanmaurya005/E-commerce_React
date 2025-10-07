import React from "react";
import { Link } from "react-router-dom";

export default function FoundNot() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 px-6 text-center">
      <h1 className="text-[120px] font-bold text-amber-600 leading-none">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
